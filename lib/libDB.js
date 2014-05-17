"use strict";

(function(mongoose)
{
    function init()
    {
        mongoose.connect('mongodb://eric:112233@oceanic.mongohq.com:10051/my_class');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
    }

    exports.init = init;

}(require('mongoose')))