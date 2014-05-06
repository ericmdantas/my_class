"use strict";

var assert = require('assert');
var BookController = require('../../../controllers/BookController');
var mongoose = require('mongoose');
var db = require('../config/db.json');
var BookModel = require('../../../models/Book');

describe('BookController being tested', function()
{
    before(function()
    {
        mongoose.connect(db.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    describe('checks elements creation', function()
    {
        describe('checks if BookController was created', function()
        {
            assert.strictEqual(typeof BookController, "object");
        })
    })

    describe('getBooksInfo', function()
    {
        var _req, _res;

        beforeEach(function(done)
        {
            _req = {session: {passport: {user: "eric3"}}};

            BookModel.create({name: "Livro1", quantity: "1", usersAllowed: ["eric3"]}, done);
        })

        afterEach(function(done)
        {
            BookModel.remove(done);
        })

        it('should do something', function(done)
        {
            var _res = {json: function(obj)
            {
                assert.strictEqual(obj.books[0].name, "Livro1");
                assert.strictEqual(obj.books[0].quantity, "1");
                assert.strictEqual(obj.books[0].usersAllowed, undefined);
                done();
            }};

            BookController.getBooksInfo(_req, _res);
        })

        //TODO: ADD MORE TESTS?
        //TODO: CHECK HOW TO TEST REQUEST THAT DON'T RETURN ANYTHING (POST, PULL AND DELETE)
    })
})