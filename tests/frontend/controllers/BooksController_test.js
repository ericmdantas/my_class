"use strict";

describe('BOOKSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock, _Book, _ModalHelper;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _Book = $injector.get('Book');
        _ModalHelper = $injector.get('ModalHelper');

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

        it('check if $scope.cfg is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('should initialize the _scope.livro correctly', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            expect(_scope.livro instanceof _Book).toBeTruthy();
        }))

        it('should set the livro correctly', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            var _obj = {a: 1};
            _scope.setBook(_obj);

            expect(_scope.livro.a).toEqual(_obj.a);
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('resetBook', function()
    {
        it('should reset the properties of Book', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
        }))
    })

    describe('GET /api/protected/books', function()
    {
        it('_scope.livros should be an empty array', inject(function($controller)
        {
            spyOn(_ModalHelper, 'open').andCallThrough();

            $controller('BooksController', {$scope: _scope});
            _httpMock.expectGET('/api/protected/books').respond([]);

            _httpMock.flush();

            expect(_scope.livros.length).toEqual(0);
            expect(_ModalHelper.open).toHaveBeenCalledWith('#modal-book');
        }))

        it('should get what\'s being returned', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/books').respond([{name: 'A', quantity: 5}]);
            $controller('BooksController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.livros[0].name).toBe('A');
            expect(_scope.livros[0].quantity).toBe(5);
            expect(_scope.livros[1]).not.toBeDefined();
        }))

        it('should return an empty string', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/books').respond([{name: 'A', quantity: 5}]);
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

            var _invalidObjects = helper.invalidObjects();

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                expect(function()
                {
                    _scope.registerBook(_invalidObjects[i]);
                }).not.toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
            }
        }))

        it('registering books should work', inject(function($controller)
        {
            var _book = {name: 'A', quantity: 10};
            $controller('BooksController', {$scope: _scope});

            _scope.registerBook(_book);
            _httpMock.flush();
            var quantidadeDeLivrosDepoisDoCadastro = _scope.livros.length;
            expect(quantidadeDeLivrosDepoisDoCadastro).toBeGreaterThan(0);
        }))
    })

    describe('PUT /api/protected/books/:id', function()
    {
        it('should throw an exception when trying to edit a non existed book', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            var _wrongParams = helper.invalidObjects();

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editBook(_wrongParams[i])
                }).not.toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            }
        }))

        it('should change the book name', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/books').respond([{name: 'A', quantity: 5}]);
            $controller('BooksController', {$scope: _scope});
            var livroEditado = {_id: "123", name: 'outro nome', quantity: 7};
            _scope.editBook(livroEditado);

            _httpMock.flush();

            expect(_scope.livros[0].name).toBe('A');
            expect(_scope.livros[0].quantity).toBe(5);
        }))
    })

    describe('DELETE /api/protected/books/:id', function()
    {
        it('trying to delete book without _id', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});
            var _id = 0;

            expect(function()
            {
                _scope.deleteBook(_id);
            }).not.toThrow(new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.'));
        }))

        it('removing books should work', inject(function($controller)
        {
            $controller('BooksController', {$scope: _scope});

            var _id = 'livro1';
            _scope.deleteBook(_id);
            _httpMock.flush();
        }))
    })
})