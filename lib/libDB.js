"use strict";

(function(mongoose)
{
    function init()
    {
        var _urlBanco = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL :
                                                                  'mongodb://localhost/my_class';

        mongoose.connect(_urlBanco);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
    }

    exports.init = init;

}(require('mongoose')))