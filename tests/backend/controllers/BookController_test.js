"use strict";

var expect = require('chai').expect;
var BookController = require('../../../controllers/BookController');
var mongoose = require('mongoose');
var db = require('../helpers/db.json');
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
            expect(BookController).to.be.defined;
            expect(BookController).to.be.an('object');
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
                expect(obj).to.be.defined;
                expect(obj[0].name).to.equal("Livro1");
                expect(obj[0].quantity).to.equal("1");
                expect(obj[0].usersAllowed).to.not.exist;
                done();
            }};

            BookController.getBooksInfo(_req, _res);
        })

        //TODO: ADD MORE TESTS?
        //TODO: CHECK HOW TO TEST REQUEST THAT DON'T RETURN ANYTHING (POST, PULL AND DELETE)
    })
})