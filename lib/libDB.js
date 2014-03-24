"use strict";

(function(mongoose)
{
    function init()
    {
        mongoose.connect('mongodb://localhost/myclass');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
    }

    exports.init = init;

}(require('mongoose')))