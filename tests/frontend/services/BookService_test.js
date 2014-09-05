"use strict";

describe('BookService', function()
{
    var _BookService, _httpMock;
    var WEBSERVICE = '/api/protected/books';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _BookService = $injector.get('BookService');
    }))

    describe('getAll', function()
    {
        it('should make the request correctly to the server - server returns error', function()
        {
            _httpMock.expectGET(WEBSERVICE).respond(500);

            var _onSuccess = function(books)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _BookService
                .getAll()
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should make the request correctly to the server', function()
        {
            var _response = [{name: 'A', quantity: 1}];

            _httpMock.expectGET(WEBSERVICE).respond(_response);

            var _onSuccess = function(books)
            {
                expect(books[0].name).toEqual(_response[0].name);
                expect(books[0].quantity).toEqual(_response[0].quantity);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _BookService
                .getAll()
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })

    describe('get', function()
    {
        it('should try to make the request to the server, but the id is not valid', function()
        {
            var _response = {name: 'a', quantity: 1};
            _httpMock.expectGET(WEBSERVICE).respond(_response);

            var _onSuccess = function(book)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar o livro pelo id, pois o mesmo não é válido.');
            }

            var _invalidIds = helper.invalidStrings();

            for (var i = 0; i < _invalidIds.length; i++)
            {
                expect(function()
                {
                    _BookService
                        .get(_invalidIds[i])
                        .then(_onSuccess, _onError);
                })
            }
        })

        it('should make the request correctly to the server', function()
        {
            var _response = {name: 'a', quantity: 1};
            _httpMock.expectGET(WEBSERVICE + '/a123').respond(_response);

            var _id = 'a123';

            var _onSuccess = function(book)
            {
                expect(book.name).toEqual(_response.name);
                expect(book.quantity).toEqual(_response.quantity);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _BookService
                .get(_id)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })

    describe('save', function()
    {
        it('should throw an error, book is not valid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível cadastrar este livro, pois o mesmo não existe.');
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                _BookService
                    .save(_invalidObjects[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should throw an error, book is not valid - name missing', function()
        {
            var _invalidBook = {name: null, quantity: 10};

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível cadastrar este livro, pois o mesmo não existe.');
            }

            _BookService
                .save(_invalidBook)
                .then(undefined, _onError);
        })

        it('should throw an error, book is not valid - quantity missing', function()
        {
            var _invalidBook = {name: 'name', quantity: null};

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível cadastrar este livro, pois o mesmo não existe.');
            }

            _BookService
                .save(_invalidBook)
                .then(undefined, _onError);
        })

        it('should save the book correctly', function()
        {
            var _validBook = {name: 'name', quantity: 1};
            _httpMock.expectPOST(WEBSERVICE, _validBook).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            _BookService
                .save(_validBook)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })

    describe('update', function()
    {
        it('should throw an error, book\'s id is missing', function()
        {
            var _book = {name: 'book', quantity: 999999, _id: null};

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Ocorreu um erro na edição do livro. Não foi especificado o id do livro.');
            }

            _BookService
                .update(_book)
                .then(undefined, _onError);
        })

        it('should update the book successfully', function()
        {
            var _book = {name: 'book', quantity: 999999, _id: 'abc123'};
            _httpMock.expectPUT(WEBSERVICE + '/abc123', _book).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            _BookService
                .update(_book)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })

    describe('delete', function()
    {
        it('should throw an error - id is not valid', function()
        {
            var _invalidStrings = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Ocorreu um erro na deleção do livro. Não há um id identificado.');
            }

            for (var i = 0; i < _invalidStrings.length; i++)
            {
                _BookService
                    .remove(_invalidStrings[i])
                    .then(undefined, _onError);
            }
        })

        it('should call delete correctly', function()
        {
            _httpMock.expectDELETE(WEBSERVICE + '/a123').respond(200);
            var _id = 'a123';

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            _BookService
                .remove(_id)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })
})