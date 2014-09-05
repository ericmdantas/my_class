"use strict";

var ClazzModel = require('../models/Clazz');

function Clazz()
{
    function _getClassesInfo(req, res)
    {
        var _onSuccess = function(clazzes)
        {
            res.json(clazzes);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _clazz = new ClazzModel();

        _clazz
            .findAllClassesByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _getClassesNames(req, res)
    {
        var _onSuccess = function(names)
        {
            res.json(names);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _clazz = new ClazzModel();

        _clazz
            .findAllClassesNamesByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _getClassesDailyInfo(req, res)
    {
        var _onSuccess = function(info)
        {
            res.json(info);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _monthYear = req.params.monthYear;
        var _clazz = new ClazzModel();

        _clazz
            .getClassesDailyInfo(_usuario, _monthYear)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _getClassesDailyInfoByClass(req, res)
    {
        var _onSuccess = function(clazzes)
        {
            res.json(clazzes);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _monthYear = req.params.monthYear;
        var _clazzId = req.params.id;
        var _clazz = new ClazzModel();

        _clazz
            .getClassesDailyInfoByClass(_usuario, _monthYear, _clazzId)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _registerClassMomentInTime(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _moment = req.body;
        var _clazz = new ClazzModel();

        _clazz
            .registerClassMomentInTime(_usuario, _moment)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _registerClass(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _turma = req.body;
        var _clazz = new ClazzModel();

        _clazz
            .registerNewClass(_usuario, _turma)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _editClass(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _turmaID = req.params.id;
        var _turma = req.body;
        var _clazz = new ClazzModel();

        _clazz
            .editClass(_usuario, _turma, _turmaID)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _deleteClass(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _identificacaoTurma = req.params.id;
        var _clazz = new ClazzModel();

        _clazz
            .deleteClass(_usuario, _identificacaoTurma)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    return {
                getClassesInfo: _getClassesInfo,
                getClassesDailyInfo: _getClassesDailyInfo,
                getClassesDailyInfoByClass: _getClassesDailyInfoByClass,
                getClassesNames: _getClassesNames,
                registerClass: _registerClass,
                registerClassMomentInTime: _registerClassMomentInTime,
                editClass: _editClass,
                deleteClass: _deleteClass
           }
}

module.exports = new Clazz();