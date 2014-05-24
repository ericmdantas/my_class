"use strict";

var ClazzModel = require('../models/Clazz');
var ErrorHandler = require('../lib/ErrorHandler');

function Clazz()
{
    function _getClassesInfo(req, res)
    {
        var _usuario = req.session.passport.user;
        var _clazz = new ClazzModel();

        function callback(error, clazzes)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de turmas'));
            }
            else
            {
                clazzes ? res.json({classes: clazzes})
                        : res.json({classes: []})
            }
        }

        _clazz.findAllClassesByUser(_usuario, callback);
    }

    function _getClassesNames(req, res)
    {
        var _usuario = req.session.passport.user;
        var _clazz = new ClazzModel();

        function callback(error, clazzes)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta dos nomes das turmas'));
            }
            else
                clazzes ? res.json({classes: clazzes})
                        : res.json({classes: []})
        }

        _clazz.findAllClassesNamesByUser(_usuario, callback);
    }

    function _getClassesDailyInfo(req, res)
    {
        var _usuario = req.session.passport.user;
        var _monthYear = req.params.monthYear;
        var _clazz = new ClazzModel();

        function callback(error, dailyInfo)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta das informações diárias das turmas'));
            }
            else
                dailyInfo ? res.json({info: dailyInfo})
                          : res.json({info: []});
        }

        _clazz.getClassesDailyInfo(_usuario, _monthYear, callback);
    }

    function _getClassesDailyInfoByClass(req, res)
    {
        var _usuario = req.session.passport.user;
        var _monthYear = req.params.monthYear;
        var _clazzId = req.params.id;
        var _clazz = new ClazzModel();

        function callback(error, dailyInfoByClass)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta das informações diárias da turma'));
            }
            else
                dailyInfoByClass ? res.json({info: dailyInfoByClass})
                                 : res.json({info: []});
        }

        _clazz.getClassesDailyInfoByClass(_usuario, _monthYear, _clazzId, callback);
    }

    function _registerClassMomentInTime(req, res)
    {
        var _usuario = req.session.passport.user;
        var _moment = req.body;
        var _clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(_errorHandler.createSimpleErrorObject(500, 'cadastro do dia a dia da turma'));
            }
            else
                res.end();
        }

        _clazz.registerClassMomentInTime(_usuario, _moment, callback);
    }

    function _registerClass(req, res)
    {
        var _usuario = req.session.passport.user;
        var _turma = req.body;
        var _clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(_errorHandler.createSimpleErrorObject(500, 'cadastro de turma'));
            }
            else
                res.end()
        }

        _clazz.registerNewClass(_usuario, _turma, callback);
    }

    function _editClass(req, res)
    {
        var _usuario = req.session.passport.user;
        var _turmaID = req.params.id;
        var _turma = req.body;
        var _clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(_errorHandler.createSimpleErrorObject(500, 'edição de turma'));
            }
            else
                res.end();
        }

        _clazz.editClass(_usuario, _turma, _turmaID, callback);
    }

    function _deleteClass(req, res)
    {
        var _usuario = req.session.passport.user;
        var _identificacaoTurma = req.params.id;
        var _clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(_errorHandler.createSimpleErrorObject(500, 'deleção de turma'));
            }
            else
                res.end();
        }

        _clazz.deleteClass(_usuario, _identificacaoTurma, callback);
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