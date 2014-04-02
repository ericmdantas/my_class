"use strict";

var ClazzModel = require('../models/Clazz');
var ErrorHandler = require('../lib/ErrorHandler');

function Clazz()
{
    function getClassesInfo(req, res)
    {
        var usuario = req.session.passport.user;
        var clazz = new ClazzModel();

        function callback(error, clazzes)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de turmas'));
            }
            else
            {
                clazzes ? res.json({classes: clazzes})
                        : res.json({classes: []})
            }
        }

        clazz.findAllClassesByUser(usuario, callback);
    }

    function getClassesNames(req, res)
    {
        var usuario = req.session.passport.user;
        var clazz = new ClazzModel();

        function callback(error, clazzes)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta dos nomes das turmas'));
            }
            else
                clazzes ? res.json({classes: clazzes})
                        : res.json({classes: []})
        }

        clazz.findAllClassesNamesByUser(usuario, callback);
    }

    function registerClassMomentInTime(req, res)
    {
        var usuario = req.session.passport.user;
        var moment = req.body;
        var clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(errorHandler.createSimpleErrorObject(500, 'cadastro do dia a dia da turma'));
            }
            else
                res.end();
        }

        clazz.registerClassMomentInTime(usuario, moment, callback);
    }

    function registerClass(req, res)
    {
        var usuario = req.session.passport.user;
        var turma = req.body;
        var clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(errorHandler.createSimpleErrorObject(500, 'cadastro de turma'));
            }
            else
                res.end()
        }

        clazz.registerNewClass(usuario, turma, callback);
    }

    function editClass(req, res)
    {
        var usuario = req.session.passport.user;
        var turma = req.body;
        var clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(errorHandler.createSimpleErrorObject(500, 'edição de turma'));
            }
            else
                res.end();
        }

        clazz.editClass(usuario, turma, callback);
    }

    function deleteClass(req, res)
    {
        var usuario = req.session.passport.user;
        var identificacaoTurma = req.params.id;
        var clazz = new ClazzModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(errorHandler.createSimpleErrorObject(500, 'deleção de turma'));
            }
            else
                res.end();
        }

        clazz.deleteClass(usuario, identificacaoTurma, callback);
    }

    return {
                getClassesInfo: getClassesInfo,
                getClassesNames: getClassesNames,
                registerClass: registerClass,
                registerClassMomentInTime: registerClassMomentInTime,
                editClass: editClass,
                deleteClass: deleteClass
           }
}

module.exports = new Clazz();