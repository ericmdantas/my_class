"use strict";

var UserCtrl = function()
{
    function _validateUser(req, res)
    {
        if (!res)
            throw new Error('houve um problema no momento da validação do usuário');

        res.json({user: "ok"});
    }

    function _logout(req, res)
    {
        req.logout();
        res.end();
    }

    return {
                validateUser: _validateUser,
                logout: _logout
           }
}

module.exports = new UserCtrl();