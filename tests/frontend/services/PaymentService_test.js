"use strict";

describe('PaymentService', function()
{
    var _PaymentService, _httpMock;
    var WEBSERVICE = '/api/protected/students/payments';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _PaymentService = $injector.get('PaymentService');
        _httpMock = $injector.get('$httpBackend');
    }))

    describe('getAll', function()
    {
        it('should try to get all the payments, server returns error - 500', function()
        {
            var _error = {error: 'xyz'};

            _httpMock.expectGET(WEBSERVICE).respond(500, _error);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error).toEqual(_error);
            }

            _PaymentService
                .getAll()
                .then(_onSuccess, _onError);
        })

        it('should to get all the students correctly', function()
        {
            var _response = [{name: 'A', paymentMonth: 'January'}];

            _httpMock.expectGET(WEBSERVICE).respond(_response);

            var _onSuccess = function(students)
            {
                expect(students[0].name).toEqual(_response[0].name);
                expect(students[0].paymentMonth).toEqual(_response[0].paymentMonth);
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _PaymentService
                .getAll()
                .then(_onSuccess, _onError);
        })
    })

    describe('save', function()
    {
        it('should reject, object is not a valid student', function()
        {
            var _invalidObjects = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível realizar o pagamento. Objeto inválido.');
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                _PaymentService
                    .save(_invalidObjects[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should try to save, server returns error', function()
        {
            var _student = {name: 'Student'};
            _httpMock.expectPOST(WEBSERVICE, _student).respond(500, {error: 'someError'});

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(true).toBeTruthy();
            }

            _PaymentService
                .save(_student)
                .then(_onSuccess, _onError);
        })

        it('should save the student correctly', function()
        {
            var _student = {name: 'A', birthDate: '26/06/1989'};
            _httpMock.expectPOST(WEBSERVICE, _student).respond({error: 'someError'});

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(false).toBeTruthy();
            }

            _PaymentService
                .save(_student)
                .then(_onSuccess, _onError);
        })
    })

    describe('remove', function()
    {
        it('should throw an error - object is invalid', function()
        {
            var _invalidPayments = helper.invalidObjects();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível remover o pagamento. Objeto informado é inválido.');
            }

            for (var i = 0; i < _invalidPayments.length; i++)
            {
                _PaymentService
                    .remove(_invalidPayments[i])
                    .then(null, _onError);
            }
        })

        it('should make the request correctly', function()
        {
            _httpMock.expectDELETE(WEBSERVICE + '/aluno1/janeiro/1.99').respond(200);
            var _payment = {studentName: 'aluno1', month: 'janeiro', amount: '1.99'};

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _PaymentService
                .remove(_payment)
                .then(_onSuccess, _onError);
        })
    })
})