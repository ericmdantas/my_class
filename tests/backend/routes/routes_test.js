"use strict";

var routes = require('../../../routes/routes');
var assert = require('assert');
var express = require('express')();
var passport = require('passport');
var mongoose = require('mongoose');
var supertest = require('supertest');
var app = require('../../../server');
var api = supertest('http://localhost:7777');
var agent = supertest.agent(app);

describe('routes.js being tested', function()
{
    /*before(function(done)
    {
        mongoose.connect('mongodb://localhost/myclass');
        done();
    })*/

    describe('checks elements creation', function()
    {
        it('checks if routes.js was created', function()
        {
            assert.strictEqual(typeof routes, 'object');
        })

        it('checks if routes.js was created', function()
        {
            assert.strictEqual(typeof routes.init, 'function');
        })
    })

    /*describe('checks if the routes are working', function()
    {
        it('checks if route login is working', function(done)
        {
                api.get('/')
                   .expect('Content-Type', /html/)
                   .expect(200)
                   .end(function(err, res)
                        {
                            if (err)
                              throw err;

                            assert.strictEqual(typeof res, "object");
                            assert.strictEqual(res.text.indexOf('<!doctype html'), 0);
                            done();
                        })
        })

        //TODO IMPLEMENT REAL URL CONSUMING
    })*/
})