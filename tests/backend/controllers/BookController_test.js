"use strict";

var assert = require('assert');
var BookController = require('../../../controllers/BookController');
var mongoose = require('mongoose');
var db = require('../config/db.json');

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

    //TODO: ADD TESTS FOR THE CONTROLLERS (BACKEND)

    /*describe('getBooksInfo', function()
    {
        var req, res;

        beforeEach(function()
        {
            req = {"req": {"session": {"passport": {"user": "eric3"}}}};
            res = {json: function(){console.log('MOCKUN\'D!');}};
        })

        it('should do something', function(done)
        {
            BookController.getBooksInfo(req, res);
            done();
        })
    })*/
})