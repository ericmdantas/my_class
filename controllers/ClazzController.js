"use strict";

var ClazzModel = require('../models/Clazz');
var ErrorHandler = require('../lib/ErrorHandler');

function Clazz()
{
    function getClassesInfo(req, res)
    {
        var usuario = req.query.u;
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

    function registerClass(req, res)
    {
        var usuario = req.query.u;
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
        var usuario = req.query.u;
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
        var usuario = req.query.u;
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
                registerClass: registerClass,
                editClass: editClass,
                deleteClass: deleteClass
           }
}

module.exports = new Clazz();