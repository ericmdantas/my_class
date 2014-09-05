"use strict";

describe('Student', function()
{
    var _Student, _httpMock;
    var _studentInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _Student = $injector.get('Student');

        _studentInstance = new _Student();
    }))

    describe('creation', function()
    {
        it('should have the right properties when instanciated', function()
        {
            expect(_studentInstance.name).toBeNull();
            expect(_studentInstance.birthDate).toBeNull();
        })
    })

    describe('isNew', function()
    {
        it('should return true', function()
        {
            expect(_studentInstance.isNew()).toBeTruthy();
        })

        it('should return false', function()
        {
            _studentInstance._id = 'a123';
            expect(_studentInstance.isNew()).toBeFalsy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true - object is invalid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                expect(_studentInstance.isInvalid(_invalidObjects[i])).toBeTruthy();
            }
        })

        it('should return true - object doesn\'t have a name', function()
        {
            var _invalidStudent = {name: null, birthDate: '26/06/1989'};

            expect(_studentInstance.isInvalid(_invalidStudent)).toBeTruthy();
        })

        it('should return true - object doesn\'t have a birthDate', function()
        {
            var _invalidStudent = {name: 'eric', birthDate: null};
            expect(_studentInstance.isInvalid(_invalidStudent)).toBeTruthy();
        })

        it('should return false - student is valid', function()
        {
            var _newStudent = new _Student({name: 'eric', birthDate: '26/06/1989'})
            expect(_newStudent.isInvalid()).toBeFalsy();
        })
    })

    describe('normalizeStudent', function()
    {
        it('should throw an error - object is not a valid student', function()
        {
            var _invalidStudents = helper.invalidObjects();

            for (var i = 0; i < _invalidStudents.length; i++)
            {
                expect(function()
                {
                    _studentInstance.normalizeStudent(_invalidStudents[i]);
                }).toThrow(new Error('Não é possível normalizar o aluno passado, pois o mesmo não é válido.'));
            }
        })

        it('should return the student with the object correctly', function()
        {
            var _aluno = {outraProp: '123',
                class: {name: 'a'},
                status: {nome: 'b'},
                contract: {nome: 'c'},
                birthDate: '26/06/1989',
                name: 'eric'};

            var _result = {outraProp: '123',
                class: 'a',
                status: 'b',
                contract: 'c',
                birthDate: '26/06/1989',
                name: 'eric'};

            var _temp = _studentInstance.normalizeStudent(_aluno);

            expect(_temp).toEqual(_result);
        })
    })
})