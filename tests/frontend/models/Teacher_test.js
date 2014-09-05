"use strict";

describe('Teacher', function()
{
    var _Teacher, _httpMock, _lib;
    var _teacherInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _Teacher = $injector.get('Teacher');
        _httpMock = $injector.get('$httpBackend');
        _lib = $injector.get('lib');
        _teacherInstance = new _Teacher();
    }))

    describe('creation', function()
    {
        it('should instance the teacher class correctly', function()
        {
            expect(_teacherInstance instanceof _Teacher).toBeTruthy();
            expect(_teacherInstance.name).toBeNull();
            expect(_teacherInstance.birthDate).toBeNull();
            expect(_teacherInstance.salary).toBe('0');
            expect(_teacherInstance.address).toBeNull();
        })
    })

    describe('isNew', function()
    {
        it('should return true', function()
        {
            expect(_teacherInstance.isNew()).toBeTruthy();
        })

        it('should return false', function()
        {
            _teacherInstance._id = 'a123';
            expect(_teacherInstance.isNew()).toBeFalsy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true - is invalid', function()
        {
            expect(_teacherInstance.isInvalid()).toBeTruthy();
        })

        it('should return false - is valid', function()
        {
            _teacherInstance.name = 'Teacher1';
            _teacherInstance.birthDate = '26/06/1989';
            _teacherInstance.salary = '12345678';

            expect(_teacherInstance.isInvalid()).toBeFalsy();
        })
    })
})