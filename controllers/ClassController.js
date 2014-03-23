"use strict";

var ClazzModel = require('../models/classes');

function Clazz()
{
    function getClassesInfo(req, res)
    {
        var usuario = req.query.u;

        ClazzModel.findAllClassesByUser(usuario, function(doc)
        {
            doc ? res.json({classes: doc.classes})
                : res.json({classes: []})
        })
    }

    function registerClass(req, res)
    {
        var usuario = req.query.u;
        var turma = req.body;

        ClazzModel.registerNewClass(usuario, turma, function(){res.end()});
    }

    function editClass(req, res)
    {
        var usuario = req.query.u;
        var turma = req.body;

        function callback()
        {
            res.end();
        }

        ClazzModel.updateClass(usuario, turma, callback);
    }

    function deleteClass(req, res)
    {
        var usuario = req.query.u;
        var identificacaoTurma = req.query.c;
        ClazzModel.deleteClass(usuario, identificacaoTurma, function(){res.end()});
    }

    return {
                getClassesInfo: getClassesInfo,
                registerClass: registerClass,
                editClass: editClass,
                deleteClass: deleteClass
           }
}

module.exports = new Clazz();