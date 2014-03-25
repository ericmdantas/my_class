"use strict";

var ClazzModel = require('../models/Clazz');

function Clazz()
{
    function getClassesInfo(req, res)
    {
        var usuario = req.query.u;
        var clazz = new ClazzModel();

        clazz.findAllClassesByUser(usuario, function(classes)
        {
            classes ? res.json({classes: classes})
                    : res.json({classes: []})
        })
    }

    function registerClass(req, res)
    {
        var usuario = req.query.u;
        var turma = req.body;
        var clazz = new ClazzModel();

        clazz.registerNewClass(usuario, turma, function(){res.end()});
    }

    function editClass(req, res)
    {
        var usuario = req.query.u;
        var turma = req.body;
        var clazz = new ClazzModel();

        function callback()
        {
            res.end();
        }

        clazz.editClass(usuario, turma, callback);
    }

    function deleteClass(req, res)
    {
        var usuario = req.query.u;
        var identificacaoTurma = req.params.id;
        var clazz = new ClazzModel();

        clazz.deleteClass(usuario, identificacaoTurma, function(){res.end()});
    }

    return {
                getClassesInfo: getClassesInfo,
                registerClass: registerClass,
                editClass: editClass,
                deleteClass: deleteClass
           }
}

module.exports = new Clazz();