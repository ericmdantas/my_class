"use strict";

var assert = require('assert');
var StatisticModel = require('../../../models/Statistic');
var StudentModel = require('../../../models/Student');
var mongoose = require('mongoose');
var dburl = require('../config/db.json');

describe('Testing StatisticModel', function()
{
    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    describe('check elements creation', function()
    {
        it('checks if StatisticModel was created', function()
        {
            assert.strictEqual(typeof StatisticModel, "object");
        })

        it('checks if StatisticModel.findAllEarningsByTrimester was created', function()
        {
            assert.strictEqual(typeof StatisticModel.findAllEarningsByTrimester, "function");
        })

        it('checks if StatisticModel.findAllInterestedStudentsPerMonth was created', function()
        {
            assert.strictEqual(typeof StatisticModel.findAllInterestedStudentsPerMonth, "function");
        })
    })

    describe('findAllEarningsByTrimester', function()
    {
        beforeEach(function(done)
        {
            StudentModel.create
            ({
                    name: "Aluno1",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma1",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["eric3"],
                    payments: [{
                        paymentMonth: "Dezembro",
                        amountPaid: "123",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },
                {
                    name: "Aluno2",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma2",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["eric3"],
                    payments: [{
                        paymentMonth: "Maio",
                        amountPaid: "1122334455",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },
                {
                    name: "Aluno2",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma2",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["Eric3"],
                    payments: [{
                        paymentMonth: "Maio",
                        amountPaid: "123",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },done);
        })

        afterEach(function(done)
        {
            StudentModel.remove(done);
        })

        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _wrongParams = ["", null, undefined, true, false, 1, 0, function(){}, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                StatisticModel.findAllEarningsByTrimester(_wrongParams[i], function(err, earnings)
                                                                           {
                                                                                assert.notStrictEqual(err, null);
                                                                                assert.strictEqual(err instanceof Error, true);
                                                                                assert.strictEqual(earnings, null);
                                                                           })
            }

            done();
        })

        it('should return earnings correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllEarningsByTrimester(_user, function(err, earnings)
                                                             {
                                                                 assert.strictEqual(err, null);
                                                                 assert.strictEqual(typeof earnings, "object");
                                                                 assert.strictEqual(earnings.valorPrimeiroTrimestre, 0);
                                                                 assert.strictEqual(earnings.valorSegundoTrimestre, 1122334455);
                                                                 assert.strictEqual(earnings.valorTerceiroTrimestre, 0);
                                                                 assert.strictEqual(earnings.valorQuartoTrimestre, 123);
                                                                 done();
                                                             })
        })
    })

    describe('findAllInterestedStudentsPerMonth', function()
    {
        beforeEach(function(done)
        {
            StudentModel.create
            ({
                    name: "Aluno1",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma1",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["eric3"],
                    payments: [{
                        paymentMonth: "Dezembro",
                        amountPaid: "123",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },
                {
                    name: "Aluno2",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma2",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["eric3"],
                    payments: [{
                        paymentMonth: "Maio",
                        amountPaid: "1122334455",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },
                {
                    name: "Aluno2",
                    birthDate: "26/06/1989",
                    email: "ericdantas0@hotmail.com",
                    phone: "27417417",
                    class: "Turma2",
                    mobilePhone: "998989898",
                    availability: "15:00, 18:00",
                    contract: "monthly",
                    contractDate: "01/01/2010",
                    address: "Rua Avenida Estrada km 99",
                    status: "Matriculado",
                    lastModified: new Date(),
                    registered: new Date(),
                    usersAllowed: ["Eric3"],
                    payments: [{
                        paymentMonth: "Maio",
                        amountPaid: "123",
                        paidWithWhat: "Dinheiro",
                        untilWhen: "Junho",
                        registered: new Date(),
                        lastModified: new Date(),
                        observation: "Observation"
                    }]
                },done);
        })

        afterEach(function(done)
        {
            StudentModel.remove(done);
        })

        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _wrongParams = ["", null, undefined, true, false, 1, 0, function(){}, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                StatisticModel.findAllInterestedStudentsPerMonth(_wrongParams[i], function(err, interest)
                                                                                  {
                                                                                        assert.notStrictEqual(err, null);
                                                                                        assert.strictEqual(err instanceof Error, true);
                                                                                        assert.strictEqual(interest, null);
                                                                                  })
            }

            done();
        })

        it('should return interests correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllInterestedStudentsPerMonth(_user, function(err, interest)
                                                                    {
                                                                        assert.strictEqual(err, null);
                                                                        assert.strictEqual(typeof interest, "object");
                                                                        done();
                                                                    })
        })
    })
})