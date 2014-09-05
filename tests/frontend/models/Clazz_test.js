"use strict";

describe('Clazz', function()
{
    var _Clazz, _httpMock;
    var _clazzInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _Clazz = $injector.get('Clazz');
        _clazzInstance = new _Clazz();
    }))

    describe('creation', function()
    {
        it('should have the clazz object created correctly', function()
        {
            expect(_clazzInstance.name).toBeNull();
            expect(_clazzInstance.time).toBeNull();
        })
    })

    describe('isNew', function()
    {
        it('should return false, it\'s not new', function()
        {
            _clazzInstance._id = 'a123';
            expect(_clazzInstance.isNew()).toBeFalsy();
        })

        it('should return true', function()
        {
            expect(_clazzInstance.isNew()).toBeTruthy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true, object is invalid', function()
        {
            var _invalidObject = helper.invalidObjects();

            for (var i = 0; i < _invalidObject.length; i++)
            {
                expect(_clazzInstance.isInvalid(_invalidObject[i])).toBeTruthy();
            }
        })

        it('should return true, clazz is invalid - missing name', function()
        {
            var _clazz = {name: null, time: '00:00:00'};
            expect(_clazzInstance.isInvalid(_clazz)).toBeTruthy();
        })

        it('should return true, clazz is invalid - missing time', function()
        {
            var _clazz = {name: 'clazz1', time: null};
            expect(_clazzInstance.isInvalid(_clazz)).toBeTruthy();
        })

        it('should return false, object is a valid clazz', function()
        {
            _clazzInstance.name = 'clazz1';
            _clazzInstance.time = '00:00:00';

            expect(_clazzInstance.isInvalid()).toBeFalsy();
        })
    })
})