"use strict";

describe('ClazzDay', function()
{
    var _ClazzDay, _httpMock;
    var _clazzdayInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _ClazzDay = $injector.get('ClazzDay');
        _clazzdayInstance = new _ClazzDay();
    }))

    describe('creation', function()
    {
        it('should have the right properties when instanciated', function()
        {
            expect(typeof _clazzdayInstance).toBe('object');
        })
    })

    describe('isInvalid', function()
    {
        it('should return true - object is invalid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                expect(_clazzdayInstance.isInvalid(_invalidObjects[i])).toBeTruthy();
            }
        })

        it('should return true - object doesn\'t have a clazzName', function()
        {
            var _invalidClazzDay = {name: null, birthDate: '26/06/1989'};
            expect(_clazzdayInstance.isInvalid(_invalidClazzDay)).toBeTruthy();
        })

        it('should return true - object doesn\'t have a birthDate', function()
        {
            var _invalidClazzDay = {name: 'eric', birthDate: null};
            expect(_clazzdayInstance.isInvalid(_invalidClazzDay)).toBeTruthy();
        })

        it('should return false - clazz is valid', function()
        {
            _clazzdayInstance.clazzName = 'turma1';
            _clazzdayInstance.dailyInfo.day = '26';
            _clazzdayInstance.dailyInfo.monthYear = '06_2014';
            _clazzdayInstance.dailyInfo.teacherName = 'teacherName';
            _clazzdayInstance.dailyInfo.subject = 'matéria';
            _clazzdayInstance.dailyInfo.studentByDay = [1];

            expect(_clazzdayInstance.isInvalid()).toBeFalsy();
        })
    })
})