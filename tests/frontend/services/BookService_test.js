"use strict";

describe('BookService', function()
{
    var scope, httpMock, BookService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        BookService = $injector.get('BookService');
    }))

    describe('checks elements creation', function()
    {
        it('checks if getBooks was created', function()
        {
            expect(BookService.getBooks).toBeDefined();
            expect(typeof BookService.getBooks).toEqual("function");
        })

        it('checks if editBook was created', function()
        {
            expect(BookService.editBook).toBeDefined();
            expect(typeof BookService.editBook).toEqual("function");
        })

        it('checks if registerBook was created', function()
        {
            expect(BookService.registerBook).toBeDefined();
            expect(typeof BookService.registerBook).toEqual("function");
        })

        it('checks if deleteBook was created', function()
        {
            expect(BookService.deleteBook).toBeDefined();
            expect(typeof BookService.deleteBook).toEqual("function");
        })
    })

    describe('GET /api/books', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/books').respond();
            BookService.getBooks();
            httpMock.flush();
        })
    })

    describe('POST /api/books', function()
    {
        it('should throw exception - wrong book param', function()
        {
            var _wrongParams = ["", {}, [], function(){}, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){BookService.registerBook(_wrongParams[i])})
                                             .toThrow(new Error('Não é possível cadastrar o livro. Parâmetros informados de forma errada.'));
            }
        })

        it('should register the book correctly', function()
        {
            httpMock.expectPOST('/api/books').respond();
            var _livro = {name: "a"};

            BookService.registerBook(_livro);
            httpMock.flush();
        })
    })

    describe('PUT /api/books/a123', function()
    {
        it('should throw exception - wrong book param', function()
        {
            var _wrongParams = ["", {}, [], function(){}, true, false, 1];
            var _id = 'a123';

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){BookService.editBook(_id, _wrongParams[i])})
                                             .toThrow(new Error('Não é possível editar o livro. Livro informado de forma errada.'));
            }
        })

        it('should throw exception - wrong id param', function()
        {
            var _wrongParams = ["", {}, [], function(){}, true, false];
            var _livro = {name: 'livro1'};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){BookService.editBook(_wrongParams[i], _livro)})
                                             .toThrow(new Error('Não é possível editar o livro. Id informado de forma errada.'));
            }
        })

        it('should edit book correctly', function()
        {
            httpMock.expectPUT('/api/books/a123').respond();
            var _livro = {name: "livro1"};
            var _id = 'a123';

            BookService.editBook(_id, _livro);
            httpMock.flush();
        })
    })

    describe('DELETE /api/books/a123', function()
    {
        it('should throw exception - wrong id param', function()
        {
            var _wrongParams = ["", {}, [], function(){}, true, false, 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){BookService.deleteBook(_wrongParams[i])})
                                             .toThrow(new Error('Não é possível deletar o livro. Id informado de forma errada.'));
            }
        })

        it('should delete a book correctly', function()
        {
            httpMock.expectDELETE('/api/books/a123').respond();
            var _id = 'a123';

            BookService.deleteBook(_id);
            httpMock.flush();
        })
    })
})