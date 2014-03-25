describe('BOOKSCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/getBooks?u=eric3').respond({books: [{name: 'A', quantity: 5}]});;
        httpMock.when('POST', '/api/registerBook?u=eric3').respond(200);
        httpMock.when('POST', '/api/editBook?u=eric3').respond({});
        httpMock.when('DELETE', '/api/deleteBook/livro1?u=eric3').respond(200);
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
    })

    describe('checking $http.get on books', function()
    {
        it('scope.livros should be an empty array', inject(function($controller)
        {
            httpMock.expectGET('/api/getBooks?u=eric3').respond();
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
            httpMock.expectGET('/api/getBooks?u=eric3');
            $controller('BooksController', {$scope: scope});
            httpMock.flush();
            expect(scope.livros).toBeDefined();
        }))
    })

    describe('registering books', function()
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

    describe('editting books', function()
    {
        it('should throw an exception when trying to edit a non existed book', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            expect(function(){scope.editBook(undefined)}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            expect(function(){scope.editBook(null)}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
            expect(function(){scope.editBook()}).toThrow(new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.'));
        }))

        it('should change the book name', inject(function($controller)
        {
            $controller('BooksController', {$scope: scope});
            var livroEditado = {name: 'outro nome', quantity: 7};
            scope.editBook(livroEditado);
            httpMock.flush();
            expect(scope.livros[0].name).toBe('A');
            expect(scope.livros[0].quantity).toBe(5);
        }))
    })

    describe('removing books', function()
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