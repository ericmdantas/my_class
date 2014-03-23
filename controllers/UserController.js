"use strict";

var User = require('../models/users');

function UserCtrl()
{
    function validaUsuario(req, res)
    {
        if (!res)
            throw new Error('houve um problema no momento da validação do usuário');

        res.json({user: "ok"});
    }

    function pegaInformacaoPorNomeUsuario(req, res)
    {
        var username = req.params.username;
        var informationCounter = {classes: 0, teachers: 0, students: 0, books: 0};
        var user = new User();

        function callback(doc)
        {
            informationCounter.classes = (doc && doc.classes) ? doc.classes.length : 0;
            informationCounter.teachers = (doc && doc.teachers) ? doc.teachers.length : 0;
            informationCounter.students = (doc && doc.students) ? doc.students.length: 0;
            informationCounter.books = (doc && doc.books) ? doc.books.length : 0;

            res.json({resultado: informationCounter})
        }


        user.findUserByUsername(username, callback);
    }

    function deslogar(req, res)
    {
        req.logout();
        res.end();
    }

    return {
                validateUser: validaUsuario,
                getUserInfoByUsername: pegaInformacaoPorNomeUsuario,
                logout: deslogar
           }
}

module.exports = new UserCtrl();