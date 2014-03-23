"use strict";

(function(mongoose, ObjectId, lib, UserModel)
{
    var User = UserModel;

    function init()
    {
        mongoose.connect('mongodb://localhost/myclass');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
    }

    function cadastraNovo(query, updt, done)
    {
        User.update(query, updt, function(err, updated)
        {
            if (err)
                throw err;

            done();
        })
    }

    function encontraTodos(query, projection, done)
    {
        User.findOne(query, projection)
            .exec(function(err, doc)
            {
                if (err || !done)
                    throw err;

                done(doc);
            })
    }

    function atualizaInformacao(query, updt, done)
    {
        User.update(query, updt)
            .exec(function(err, updated)
                  {
                        if (err)
                            throw err;

                        done();
                  })
    }

    function deletaEscolhido(query, projection, id, array, done)
    {
        User.findOne(query, projection)
            .exec(function(err, foundDoc)
            {
                if (err)
                    throw err;

                for (var i = 0; i < foundDoc[array].length; i++)
                {
                    if (id === foundDoc[array][i]._id.toString())
                    {
                        foundDoc[array].splice(i, 1);

                        foundDoc.save(function(err, saved)
                        {
                            if (err)
                                throw err;

                            done();
                        })
                    }
                }
            })
    }

    exports.init = init;

    exports.findAll = encontraTodos;
    exports.registerNew = cadastraNovo;
    exports.editInfo = atualizaInformacao;
    exports.delete = deletaEscolhido;

    exports.User = User;

}(require('mongoose'), require('mongoose').Types.ObjectId, require('../lib/lib'), require('../models/users')))