"use strict";

describe('Book', function()
{
    var _Book, _bookInstance, _httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _Book = $injector.get('Book');
        _bookInstance = new _Book();
    }))

    describe('creation', function()
    {
        it('should have the default properties when instanced', function()
        {
            var _newBookInstance = new _Book();

            expect(_newBookInstance instanceof _Book).toBeTruthy();
            expect(_newBookInstance.name).toBeNull();
            expect(_newBookInstance.quantity).toBe(0);
        })
    })

    describe('isNew', function()
    {
        it('should return false, book is not new', function()
        {
            _bookInstance._id = 'a123';
            expect(_bookInstance.isNew()).toBeFalsy();
        })

        it('should return true', function()
        {
            expect(_bookInstance.isNew()).toBeTruthy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true - name is invalid', function()
        {
            var _invalidBooks = helper.invalidStrings();
            _bookInstance.name = _invalidBooks;

            for (var i = 0; i < _bookInstance.name.length; i++)
            {
                expect(_bookInstance.isInvalid()).toBeTruthy();
            }
        })

        it('should return true - quantity is invalid', function()
        {
            var _invalidBooks = helper.invalidStrings();
            _bookInstance.name = 'ABC';
            _bookInstance.quantity = _invalidBooks;

            for (var i = 0; i < _bookInstance.quantity.length; i++)
            {
                expect(_bookInstance.isInvalid()).toBeTruthy();
            }
        })

        it('should return true - object is valid', function()
        {
            _bookInstance.name = 'A';
            _bookInstance.quantity = 10;

            expect(_bookInstance.isInvalid()).toBeFalsy();
        })
    })
})