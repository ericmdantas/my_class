"use strict";

var libDB = require('../../../lib/libDB');
var assert = require('assert');
var User = require('../../../models/users');
var mongoose = require('mongoose');

describe('db stuff', function()
{
    before(function()
    {
        mongoose.connect('mongodb://localhost/myclass');
    })

	describe('checks if the libDB was created', function()
    {
        it('checks if libDB was created', function()
        {
            assert.strictEqual(typeof libDB, "object");
        })

        it('checks if libDB.init was created', function()
        {
            assert.strictEqual(typeof libDB.init, "function");
        })

        it('checks if libDB.finAll was created', function()
        {
            assert.strictEqual(typeof libDB.findAll, "function");
        })

        it('checks if libDB.delete was created', function()
        {
            assert.strictEqual(typeof libDB.delete, "function");
        })

        it('checks if libDB.editInfo was created', function()
        {
            assert.strictEqual(typeof libDB.editInfo, "function");
        })

        it('checks if libDB.registerNew was created', function()
        {
            assert.strictEqual(typeof libDB.registerNew, "function");
        })
    })

    describe('stuff', function()
    {
        it('does stuff nicely', function(done)
        {
            var query = {username: 'eric3'};
            User.findOne(query, function(err, doc)
            {
                if(err)
                    console.log(err);

                assert.strictEqual(err, null);
                assert.strictEqual(typeof doc, "object");

                done();
            });
        })
    })
})