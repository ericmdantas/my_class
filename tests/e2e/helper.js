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
        _clearInputs('user', ['username', 'password']);

        element(by.model('user.username')).sendKeys('eric3');
        element(by.model('user.password')).sendKeys('112233');
        $('#btnLogar').click();
        browser.sleep(333);
    }

    var _goTo = function(where)
    {
        var _where = where.toLowerCase();

        if(_where === "main")
        {
            $('.navbar-brand').click();
            return;
        }

        _router(_where);
    }

    var _clickOnDelete = function(id)
    {
        browser.sleep(1000);

        var _id = id || '#to-be-deleted';

        element
            .all(by.css(_id))
            .get(0)
            .click();
    }

    var _clickToDeleteFirstElement = function(path)
    {
        browser.sleep(1000);

        var _path = path || '.info-card .btn-link';

        return element
                .all(by.css(_path))
                .get(0)
                .click();
    }

    var _clickToEditFirstElement = function(path)
    {
        browser.sleep(1000);

        var _path = path || '.info-card .btn-default';

        return element
                .all(by.css(_path))
                .get(0)
                .click();
    }

    var _clearInputs = function(mainObj, array)
    {
        var _model = mainObj + '.';

        for (var i = 0; i < array.length; i++)
        {
            element(by.model(_model + array[i])).clear();
        }
    }

    exports.login = _login;
    exports.goTo = _goTo;
    exports.clickOnDelete = _clickOnDelete;
    exports.clickToDeleteFirstElement = _clickToDeleteFirstElement;
    exports.clickToEditFirstElement = _clickToEditFirstElement;
    exports.clearInputs = _clearInputs;
}())