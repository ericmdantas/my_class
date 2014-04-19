describe('BOOKSCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/books').respond({books: [{name: 'A', quantity: 5}]});;
        httpMock.when('POST', '/api/books').respond(200);
        httpMock.when('PUT', '/api/books/123').respond({});
        httpMock.when('DELETE', '/api/books/livro1').respond(200);
        scope = $injector.get('$rootScope').$new();
    }))

    describe('elements creation', function()
    {
        it('books controller should exist', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect('BooksController').toBeDefined();
        }))

        it('checks if $scope.novoLivro is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.novoLivro).toBeDefined();
        }))

        it('check if $scope.livroEscolhido is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.livroEscolhido).toBeDefined();
        }))

        it('check if $scope.cfg is created', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))

        it('check if scope.getBooks was created', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.getBooks).toBeDefined();
            expect(typeof scope.getBooks).toBe('function');
        }))

        it('checks if modals are ready to be opened - openModalToDeleteBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.openModalToDeleteBook).toBeDefined();
            expect(typeof scope.openModalToDeleteBook).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.openModalToRegisterBook).toBeDefined();
            expect(typeof scope.openModalToRegisterBook).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditBook', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(scope.openModalToEditBook).toBeDefined();
            expect(typeof scope.openModalToEditBook).toEqual('function');
        }))
    })

    describe('checks if the modal opening to edit is working properly', function()
    {
        it('checks if an empty object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {};
            scope.openModalToEditBook(livroEditado);
            expect(scope.livroEscolhido).toEqual(livroEditado);
        }))

        it('checks if an filled object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {_id: 'a'};
            scope.openModalToEditBook(livroEditado);
            expect(scope.livroEscolhido).toEqual(livroEditado);
        }))
    })

    describe('checks if modal opening to delete book is working properly', function()
    {
        it('checks if an empty object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {};
            scope.openModalToDeleteBook(livroEditado);
            expect(scope.livroEscolhido).toEqual(livroEditado);
        }))

        it('checks if an filled object is being past correctly ', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {_id: 'a'};
            scope.openModalToDeleteBook(livroEditado);
            expect(scope.livroEscolhido).toEqual(livroEditado);
        }))
    })

    describe('GET /api/books', function()
    {
        it('scope.livros should be an empty array', inject(function($controller)
        {
            httpMock.expectGET('/api/books').respond();
            $controller('BooksController', {$scope: scope});
            expect(scope.livros.length).toEqual(0);
        }))

        it('should get what\'s being returned', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            httpMock.flush();
            expect(scope.livros[0].name).toBe('A');
            expect(scope.livros[0].quantity).toBe(5);
            expect(scope.livros[1]).not.toBeDefined();
        }))

        it('should return an empty string', inject(function($controller)
        {
            httpMock.expectGET('/api/books');
            $controller('BooksController', {$scope: scope});
            httpMock.flush();
            expect(scope.livros).toBeDefined();
        }))
    })

    describe('POST /api/books', function()
    {
        it('should not register a book with empty object', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(function(){scope.registerBook(undefined)}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
            expect(function(){scope.registerBook(null)}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
            expect(function(){scope.registerBook()}).toThrow(new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.'));
        }))

        it('registering books should work', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var obj = {name: 'A', quantity: 10};
            scope.registerBook(obj);
            httpMock.flush();
            var quantidadeDeLivrosDepoisDoCadastro = scope.livros.length;
            expect(quantidadeDeLivrosDepoisDoCadastro).toBeGreaterThan(0);
        }))
    })

    describe('PUT /api/books/:id', function()
    {
        it('should throw an exception when trying to edit a non existed book', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(function(){scope.editBook(undefined)}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            expect(function(){scope.editBook(null)}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            expect(function(){scope.editBook()}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            expect(function(){scope.editBook({name: 'a'})}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
        }))

        it('should change the book name', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {_id: "123", name: 'outro nome', quantity: 7};
            scope.editBook(livroEditado);
            httpMock.flush();
            expect(scope.livros[0].name).toBe('A');
            expect(scope.livros[0].quantity).toBe(5);
        }))
    })

    describe('DELETE /api/books/:id', function()
    {
        it('trying to delete book without _id', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroSemId = {name: 'livro1', quantity: 0};
            expect(function(){scope.deleteBook(livroSemId);}).toThrow(new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.'));
        }))

        it('removing books should work', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});

            scope.livros = [{id: 1, name: "livro 1", quantity: -1, _id: 'livro1'},
                            {id: 2, name: "livro 2", quantity: 2, _id: 'livro2'},
                            {id: 3, name: "livro 3", quantity: 3, _id: 'livro2'}];

            for (var x in scope.livros)
            {
                scope.livros[x].index = x;
            }

            var quantidadeDeLivrosAntesDaDelecaoNaPosicao0 = scope.livros.length;
            scope.deleteBook(scope.livros[0]._id);
            httpMock.flush();
            var quantidadeDeLivrosDepoisDaDelecaoNaPosicao0 = scope.livros.length;

            expect(quantidadeDeLivrosAntesDaDelecaoNaPosicao0).toBeGreaterThan(quantidadeDeLivrosDepoisDaDelecaoNaPosicao0);
        }))
    })
})