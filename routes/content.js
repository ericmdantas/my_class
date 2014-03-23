"use strict";

(function(fs)
{
    function enviaHTML(req, res, arquivo)
    {
        fs.readFile(arquivo, function(err, obj)
        {
            res.setHeader('Content-Type', 'text/html');

            if (err)
                throw err;

            res.send(obj);
        })
    }

    function sendLoginPage(req, res)
    {
        enviaHTML(req, res, 'views/login.html');
    }

    function sendMainPage(req, res)
    {
        enviaHTML(req, res, 'views/index.html');
    }

    exports.loginPage = sendLoginPage;
    exports.mainPage = sendMainPage;

}(require('fs')))

