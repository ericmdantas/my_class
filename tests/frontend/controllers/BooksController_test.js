"use strict";

describe('BOOKSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', '/api/protected/books').respond([{name: 'A', quantity: 5}]);
        _httpMock.when('POST', '/api/protected/books').respond(200);
        _httpMock.when('PUT', '/api/protected/books/123').respond({});
        _httpMock.when('DELETE', '/api/protected/books/livro1').respond(200);
    }))

    describe('elements creation', function()
    {
        it('books controller should exist', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect('BooksController').toBeDefined();
        }))

        it('checks if $scope.novoLivro is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.novoLivro).toBeDefined();
        }))

        it('check if $scope.livroEscolhido is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.livroEscolhido).toBeDefined();
        }))

        it('check if $scope.cfg is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('checks if modals are ready to be opened - openModalToDeleteBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.openModalToDeleteBook).toBeDefined();
            expect(typeof _scope.openModalToDeleteBook).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.openModalToRegisterBook).toBeDefined();
            expect(typeof _scope.openModalToRegisterBook).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.openModalToEditBook).toBeDefined();
            expect(typeof _scope.openModalToEditBook).toEqual('function');
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('openModalToRegisterBook', function()
    {
        it('should call openModalToRegisterBook correctly', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            _scope.openModalToRegisterBook();
        }))
    })

    describe('openModalToEditBook', function()
    {
        it('checks if an empty object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {};
            _scope.openModalToEditBook(livroEditado);

            expect(_scope.livroEscolhido).toEqual(livroEditado);
        }))

        it('checks if an filled object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {_id: 'a'};
            _scope.openModalToEditBook(livroEditado);

            expect(_scope.livroEscolhido).toEqual(livroEditado);
        }))
    })

    describe('openModalToDeleteBook', function()
    {
        it('checks if an empty object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {};
            _scope.openModalToDeleteBook(livroEditado);
            expect(_scope.livroEscolhido).toEqual(livroEditado);
        }))

        it('checks if an filled object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {_id: 'a'};
            _scope.openModalToDeleteBook(livroEditado);
            expect(_scope.livroEscolhido).toEqual(livroEditado);
        }))
    })

    describe('GET /api/protected/books', function()
    {
        it('_scope.livros should be an empty array', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/books').respond();
            $controller('BooksController', {$scope: _scope});
            expect(_scope.livros.length).toEqual(0);
        }))

        it('should get what\'s being returned', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.livros[0].name).toBe('A');
            expect(_scope.livros[0].quantity).toBe(5);
            expect(_scope.livros[1]).not.toBeDefined();
        }))

        it('should return an empty string', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/books');
            $controller('BooksController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.livros).toBeDefined();
        }))
    })

    describe('POST /api/protected/books', function()
    {
        it('should not register a book with empty object', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(function(){_scope.registerBook(undefined)}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
            expect(function(){_scope.registerBook(null)}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
            expect(function(){_scope.registerBook()}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
        }))

        it('registering books should work', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var obj = {name: 'A', quantity: 10};
            _scope.registerBook(obj);
            _httpMock.flush();
            var quantidadeDeLivrosDepoisDoCadastro = _scope.livros.length;
            expect(quantidadeDeLivrosDepoisDoCadastro).toBeGreaterThan(0);
            expect(_scope.novoLivro).toEqual({});
        }))
    })

    describe('PUT /api/protected/books/:id', function()
    {
        it('should throw an exception when trying to edit a non existed book', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editBook(_wrongParams[i])
                }).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            }
        }))

        it('should change the book name', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {_id: "123", name: 'outro nome', quantity: 7};
            _scope.editBook(livroEditado);
            _httpMock.flush();
            expect(_scope.livros[0].name).toBe('A');
            expect(_scope.livros[0].quantity).toBe(5);
            expect(_scope.livroEscolhido).toEqual({});
        }))
    })

    describe('DELETE /api/protected/books/:id', function()
    {
        it('trying to delete book without _id', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var livroSemId = {name: 'livro1', quantity: 0};
            expect(function(){_scope.deleteBook(livroSemId);}).toThrow(new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.'));
        }))

        it('removing books should work', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            _scope.livros = [{id: 1, name: "livro 1", quantity: -1, _id: 'livro1'},
                            {id: 2, name: "livro 2", quantity: 2, _id: 'livro2'},
                            {id: 3, name: "livro 3", quantity: 3, _id: 'livro2'}];

            var quantidadeDeLivrosAntesDaDelecaoNaPosicao0 = _scope.livros.length;
            _scope.deleteBook(_scope.livros[0]._id);
            _httpMock.flush();
            var quantidadeDeLivrosDepoisDaDelecaoNaPosicao0 = _scope.livros.length;

            expect(quantidadeDeLivrosAntesDaDelecaoNaPosicao0).toBeGreaterThan(quantidadeDeLivrosDepoisDaDelecaoNaPosicao0);
        }))
    })
})