"use strict";

describe('ClazzDayService', function()
{
    var _ClazzDayService, _httpMock;
    var WEBSERVICE = '/api/protected/classes/dailyInfo';

    var _validClazzDay =
    {
        clazzName: 'turma1',
        dailyInfo:
        {
            day: moment().format("DD"),
            monthYear: '12_2014',
            teacherName: 'Professor1',
            subject: 'matéria1',
            studentByDay: [{nome: 'abc'}]
        }
    }

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _ClazzDayService = $injector.get('ClazzDayService');
    }))

    describe('getDailyInfoByClazz', function()
    {
        it('should make the request - but the server returns an error', function()
        {
            var _monthYear = '12_2014';
            var _id = 'a123';

            _httpMock.expectGET(WEBSERVICE + '/' + _id + '/' + _monthYear).respond(500);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzDayService
                .getDailyInfoByClazz(_monthYear, _id)
                .then(_onSuccess, _onError);
        })

        it('should make the request - but the server returns an error', function()
        {
            var _monthYear = '12_2014';
            var _id = 'a123';
            var _response = [{name: 'name1'}, {name: 'name2'}];

            _httpMock.expectGET(WEBSERVICE + '/' + _id + '/' + _monthYear).respond(_response);

            var _onSuccess = function(dailyInfo)
            {
                expect(dailyInfo).toBeDefined();
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _ClazzDayService
                .getDailyInfoByClazz(_monthYear, _id)
                .then(_onSuccess, _onError);
        })
    })

    describe('save', function()
    {
        it('should reject, object is not a valid clazzday', function()
        {
            var _invalidObjects = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                _ClazzDayService
                    .save(_invalidObjects[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should try to save, server returns error', function()
        {
            _httpMock.expectPOST(WEBSERVICE, _validClazzDay).respond(500, {error: 'someError'});

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(true).toBeTruthy();
            }

            _ClazzDayService
                .save(_validClazzDay)
                .then(_onSuccess, _onError);
        })

        it('should save the clazzDay correctly', function()
        {
            _httpMock.expectPOST(WEBSERVICE, _validClazzDay).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(false).toBeTruthy();
            }

            _ClazzDayService
                .save(_validClazzDay)
                .then(_onSuccess, _onError);
        })
    })

})