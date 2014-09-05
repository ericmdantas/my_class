"use strict";

var helper = (function()
{
    var _router = function(module)
    {
        _goTo('main');
        $('#' + module + '-container').click();
    }

    var _login = function()
    {
        _clearLoginForm();

        element(by.model('user.username')).sendKeys('eric3');
        element(by.model('user.password')).sendKeys('112233');
        $('#btnLogar').click();
        browser.sleep(333);
    }

    var _goTo = function(where)
    {
        var _where = where.toLowerCase();

        switch(_where)
        {
            case "main": $('.navbar-brand').click();
                         break;

            case "livros": _router(where);
                           break;

            default: throw new Error('Destination not found, captain.');
        }
    }

    var _clearLoginForm = function()
    {
        element(by.model('user.username')).clear();
        element(by.model('user.password')).clear();
    }

    exports.clearLoginForm = _clearLoginForm;
    exports.login = _login;
    exports.goTo = _goTo;
}())