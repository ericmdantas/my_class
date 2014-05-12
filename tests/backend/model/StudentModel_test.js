"use strict";

var assert = require('assert');
var StudentModel = require('../../../models/Student');
var mongoose = require('mongoose');
var dburl = require('../config/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('StudentsModel', function()
{
    var _student;

    before(function(done)
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
        done();
    })

    beforeEach(function(done)
    {
        _student = new StudentModel();
        new DBCreator().create('student', done);
    })

    afterEach(function(done)
    {
        StudentModel.remove(done);
    })

    describe('check elements creation', function()
    {
        it('checks if StudentsModel was created', function()
        {
            assert.strictEqual(typeof StudentModel, "function");
        })

        it('checks if StudentsModel findAllStudents was created', function()
        {
            assert.strictEqual(typeof _student.findAllStudentsByUser, "function");
        })

        it('checks if StudentsModel registerStudent was created', function()
        {
            assert.strictEqual(typeof _student.registerStudent, "function");
        })

        it('checks if StudentsModel editStudent was created', function()
        {
            assert.strictEqual(typeof _student.editStudent, "function");
        })

        it('checks if StudentsModel deleteStudent was created', function()
        {
            assert.strictEqual(typeof _student.deleteStudent, "function");
        })

        it('checks if StudentsModel findAllStudentsNames was created', function()
        {
            assert.strictEqual(typeof _student.findAllStudentsNamesByClass, "function");
        })
    })

    describe('findAllStudentsByUser', function()
    {
        it('shouldn\'t return any document - empty user', function(done)
        {
            var _wrongParams = ["", function(){}, true, false, 0, 1, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.findAllStudentsByUser(_wrongParams[i], function(err, payments)
                                                               {
                                                                   assert.notStrictEqual(err, null);
                                                                   assert.strictEqual(err instanceof Error, true);
                                                                   assert.strictEqual(payments, null);
                                                               })
            }

            done();
        })

        it('shouldn\'t return any document - wrong user', function(done)
        {
            var _wrongUser = "Eric3";

            _student.findAllStudentsByUser(_wrongUser , function(err, payments)
                                                        {
                                                            assert.strictEqual(err, null);
                                                            assert.strictEqual(payments.length, 0);
                                                            done();
                                                        })
        })

        it('should return document correctly', function(done)
        {
            var _usuario = "eric3";

            _student.findAllStudentsByUser(_usuario, function(err, payments)
                                                     {
                                                         assert.strictEqual(err, null);
                                                         assert.strictEqual(typeof payments, "object");
                                                         assert.strictEqual(payments.length, 1);
                                                         assert.notStrictEqual(payments[0]._id, undefined);
                                                         assert.strictEqual(payments[0].name, "Aluno1");
                                                         assert.strictEqual(payments[0].birthDate, "26/06/1989");
                                                         assert.strictEqual(payments[0].email, "ericdantas0@hotmail.com");
                                                         assert.strictEqual(payments[0].phone, "27417417");
                                                         assert.strictEqual(payments[0].class, "Turma1");
                                                         assert.strictEqual(payments[0].mobilePhone, "998989898");
                                                         assert.strictEqual(payments[0].availability, "15:00, 18:00");
                                                         assert.strictEqual(payments[0].contract, "monthly");
                                                         assert.strictEqual(payments[0].contractDate, "01/01/2010");
                                                         assert.strictEqual(payments[0].address, "Rua Avenida Estrada km 99");
                                                         assert.strictEqual(payments[0].status, "Matriculado");
                                                         assert.strictEqual(payments[0].lastModified instanceof Date, true);
                                                         assert.strictEqual(payments[0].registered instanceof Date, true);
                                                         assert.strictEqual(payments[0].usersAllowed, undefined);
                                                         assert.strictEqual(payments[0].payments, undefined);
                                                         done();
                                                     })
        })
    })

    describe('findAllStudentsNames', function()
    {
        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _wrongParams = ["", function(){}, true, false, 0, 1, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.findAllStudentsNames(_wrongParams[i], function(err, paymentsNames)
                                                               {
                                                                    assert.notStrictEqual(err, null);
                                                                    assert.strictEqual(err instanceof Error, true);
                                                                    assert.strictEqual(paymentsNames, null);
                                                               })
            }

            done();
        })

        it('shouldn\'t return anything - user doesn\'t exist', function(done)
        {
            var _wrongUser = "NO_ECXISTE";

            _student.findAllStudentsNames(_wrongUser, function(err, paymentsNames)
                                                      {
                                                          assert.strictEqual(err, null);
                                                          assert.strictEqual(paymentsNames.length, 0);
                                                          done();
                                                      })
        })

        it('should return info only about user eric3', function(done)
        {
            var _user = "eric3";

            _student.findAllStudentsNames(_user, function(err, paymentsNames)
                                                 {
                                                     assert.strictEqual(err, null);
                                                     assert.strictEqual(typeof paymentsNames[0]._id, "object");
                                                     assert.strictEqual(paymentsNames[0].name, "Aluno1");
                                                     assert.strictEqual(paymentsNames[1], undefined);
                                                     done();
                                                 })
        })

        it('should return info only about user outro', function(done)
        {
            var _user = "outro";

            _student.findAllStudentsNames(_user, function(err, paymentsNames)
                                                 {
                                                     assert.strictEqual(err, null);
                                                     assert.strictEqual(typeof paymentsNames[0]._id, "object");
                                                     assert.strictEqual(paymentsNames[0].name, "Aluno2");
                                                     assert.strictEqual(typeof paymentsNames[1]._id, "object");
                                                     assert.strictEqual(paymentsNames[1].name, "Aluno3");
                                                     assert.strictEqual(typeof paymentsNames[2]._id, "object");
                                                     assert.strictEqual(paymentsNames[2].name, "Aluno4");
                                                     done();
                                                 })
        })
    })

    describe('findAllStudentsNamesByClass', function()
    {
        it('should not return anything - wrong user param', function(done)
        {
            var _clazz = "Turma1";

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.findAllStudentsNamesByClass(_wrongParams[i], _clazz, function(err, paymentsNamesByClazz)
                                                                             {
                                                                                 assert.notStrictEqual(err, null);
                                                                                 assert.strictEqual(err instanceof Error, true);
                                                                                 assert.strictEqual(paymentsNamesByClazz, null);
                                                                             })
            }

            done();
        })

        it('should not return anything - wrong class param', function(done)
        {
            var _user = "eric3";

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.findAllStudentsNamesByClass(_user, _wrongParams[i], function(err, paymentsNamesByClazz)
                                                                             {
                                                                                 assert.notStrictEqual(err, null);
                                                                                 assert.strictEqual(err instanceof Error, true);
                                                                                 assert.strictEqual(paymentsNamesByClazz, null);
                                                                             })
            }

            done();
        })

        it('should not return anything - non existant user param', function(done)
        {
            var _user = "NON_ECXISTE";
            var _clazz = "Turma1";


            _student.findAllStudentsNamesByClass(_user, _clazz, function(err, paymentsNamesByClazz)
                                                                {
                                                                    assert.strictEqual(err, null);
                                                                    assert.strictEqual(paymentsNamesByClazz.length, 0);
                                                                    done();
                                                                })
        })

        it('should not return anything - non existant class param', function(done)
        {
            var _user = "eric3";
            var _clazz = "NON_ECXISTE";


            _student.findAllStudentsNamesByClass(_user, _clazz, function(err, paymentsNamesByClazz)
                                                                {
                                                                    assert.strictEqual(err, null);
                                                                    assert.strictEqual(paymentsNamesByClazz.length, 0);
                                                                    done();
                                                                })
        })

        it('should return payments names by class correctly - eric3', function(done)
        {
            var _user = "eric3";
            var _clazz = "Turma1";

            _student.findAllStudentsNamesByClass(_user, _clazz, function(err, paymentsNamesByClazz)
                                                                {
                                                                    assert.strictEqual(err, null);
                                                                    assert.strictEqual(paymentsNamesByClazz.length, 1);
                                                                    assert.strictEqual(paymentsNamesByClazz[0].name, "Aluno1");
                                                                    done();
                                                                })
        })

        it('should return payments names by class correctly - eric3', function(done)
        {
            var _user = "outro";
            var _clazz = "Turma2";

            _student.findAllStudentsNamesByClass(_user, _clazz, function(err, paymentsNamesByClazz)
                                                                {
                                                                    assert.strictEqual(err, null);
                                                                    assert.strictEqual(paymentsNamesByClazz.length, 3);
                                                                    assert.strictEqual(paymentsNamesByClazz[0].name, "Aluno2");
                                                                    done();
                                                                })
        })
    })

    describe('registerNewPayment', function()
    {
        afterEach(function(done)
        {
            StudentModel.remove(done);
        })

        it('shouldn\'t register payment - wrong user param', function(done)
        {
            var _pagamento = {name: "Aluno1"};
            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerNewPayment(_wrongParams[i], _pagamento, function(err)
                                                                         {
                                                                             assert.notStrictEqual(err, null);
                                                                             assert.strictEqual(err instanceof Error, true);
                                                                         })
            }

            done();
        })

        it('shouldn\'t register payment - wrong payment param', function(done)
        {
            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];
            var _user = "eric3";

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerNewPayment(_user, _wrongParams[i], function(err)
                                                                    {
                                                                        assert.notStrictEqual(err, null);
                                                                        assert.strictEqual(err instanceof Error, true);
                                                                    })
            }

            done();
        })

        it('shouldn\'t register payment - both user and payment are wrong', function(done)
        {
            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerNewPayment(_wrongParams[i], _wrongParams[i], function(err)
                                                                              {
                                                                                  assert.notStrictEqual(err, null);
                                                                                  assert.strictEqual(err instanceof Error, true);
                                                                              })
            }

            done();
        })

        it('should register payment correctly', function(done)
        {
            var _user = "eric3";
            var _pagamento = {name: "Aluno1"};

            _student.registerNewPayment(_user, _pagamento, function(err)
                                                           {
                                                               assert.strictEqual(err, null);
                                                               done();
                                                           })
        })
    })

    describe('findAllPaymentsByUser', function()
    {
        it('shouldn\'t find all payments - wrong user param', function(done)
        {
            var _wrongParams = ["", null, function(){}, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.findAllPaymentsByUser(_wrongParams[i], function(err, payments)
                                                                {
                                                                    assert.notStrictEqual(err, null);
                                                                    assert.strictEqual(err instanceof Error, true);
                                                                    assert.strictEqual(payments, null);
                                                                })
            }

            done();
        })

        it('should find all payments correctly', function(done)
        {
            var _user = "eric3";

            _student.findAllPaymentsByUser(_user, function(err, payments)
                                                  {
                                                      assert.strictEqual(err, null);
                                                      assert.strictEqual(typeof payments, "object");
                                                      assert.strictEqual(payments.length, 1);
                                                      assert.notStrictEqual(payments[0]._id, undefined);
                                                      assert.strictEqual(payments[0].name, "Aluno1");
                                                      assert.strictEqual(payments[0].birthDate, "26/06/1989");
                                                      assert.strictEqual(payments[0].email, "ericdantas0@hotmail.com");
                                                      assert.strictEqual(payments[0].phone, "27417417");
                                                      assert.strictEqual(payments[0].class, "Turma1");
                                                      assert.strictEqual(payments[0].mobilePhone, "998989898");
                                                      assert.strictEqual(payments[0].availability, "15:00, 18:00");
                                                      assert.strictEqual(payments[0].contract, "monthly");
                                                      assert.strictEqual(payments[0].contractDate, "01/01/2010");
                                                      assert.strictEqual(payments[0].address, "Rua Avenida Estrada km 99");
                                                      assert.strictEqual(payments[0].status, "Matriculado");
                                                      assert.strictEqual(typeof payments[0].lastModified, "object");
                                                      assert.strictEqual(typeof payments[0].registered, "object");
                                                      assert.strictEqual(payments[0].usersAllowed, undefined);
                                                      assert.strictEqual(payments[0].payments[0].paymentMonth, "04/2999");
                                                      assert.strictEqual(payments[0].payments[0].amountPaid, "123");
                                                      assert.strictEqual(payments[0].payments[0].paidWithWhat, "Dinheiro");
                                                      assert.strictEqual(payments[0].payments[0].untilWhen, "Junho");
                                                      assert.strictEqual(typeof payments[0].payments[0].registered, "object");
                                                      assert.strictEqual(typeof payments[0].payments[0].lastModified, "object");
                                                      assert.strictEqual(payments[0].payments[0].observation, "Observation");
                                                      done();
                                                  })
        })
    })

    describe('registerStudent', function()
    {
        afterEach(function(done)
        {
            StudentModel.remove(done);
        })

        it('shouldn\'t register _student - wrong user param', function(done)
        {
            var _aluno = {name: "Aluno3"};
            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerStudent(_wrongParams[i], _aluno, function(err)
                                                                  {
                                                                        assert.notStrictEqual(err, null);
                                                                        assert.strictEqual(err instanceof Error, true);
                                                                  })
            }

            done();
        })

        it('shouldn\'t register _student - wrong _student param', function(done)
        {
            var _user = "eric3";
            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerStudent(_user, _wrongParams[i], function(err)
                                                                 {
                                                                     assert.notStrictEqual(err, null);
                                                                     assert.strictEqual(err instanceof Error, true);
                                                                 })
            }

            done();
        })

        it('shouldn\'t register _student - both _student and user are wrong', function(done)
        {
            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.registerStudent(_wrongParams[i], _wrongParams[i], function(err)
                                                                           {
                                                                               assert.notStrictEqual(err, null);
                                                                               assert.strictEqual(err instanceof Error, true);
                                                                           })
            }

            done();
        })

        it('should register _student correctly', function(done)
        {
            var _aluno = {name: "Aluno1", birthDate: "26/06/1989"};
            var _user = "eric3";

            _student.registerStudent(_user, _aluno, function(err)
                                                    {
                                                        assert.strictEqual(err, null);
                                                        done();
                                                    })

        })
    })

    describe('editStudent', function()
    {
        it('shouldn\'t edit _student - wrong user param', function(done)
        {
            var _id = "534dafae51aaf04b9b8c5b6f";
            var _aluno = {name: "Aluno3"};

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.editStudent(_wrongParams[i], _aluno, _id, function(err)
                                                                   {
                                                                        assert.notStrictEqual(err, null);
                                                                        assert.strictEqual(err instanceof Error, true);
                                                                   })
            }

            done();
        })

        it('shouldn\'t edit _student - wrong _student param', function(done)
        {
            var _id = "534dafae51aaf04b9b8c5b6f";
            var _user = "eric3";

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.editStudent(_user, _wrongParams[i], _id, function(err)
                                                                  {
                                                                      assert.notStrictEqual(err, null);
                                                                      assert.strictEqual(err instanceof Error, true);
                                                                  })
            }

            done();
        })

        it('shouldn\'t edit _student - wrong id param', function(done)
        {
            var _user = "eric3";
            var _aluno = {name: "Aluno1"};

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.editStudent(_user, _aluno, _wrongParams[i], function(err)
                                                                     {
                                                                         assert.notStrictEqual(err, null);
                                                                         assert.strictEqual(err instanceof Error, true);
                                                                     })
            }

            done();
        })

        it('shouldn\'t edit _student - all params are wrong', function(done)
        {
            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.editStudent(_wrongParams[i], _wrongParams[i], _wrongParams[i], function(err)
                                                                                        {
                                                                                            assert.notStrictEqual(err, null);
                                                                                            assert.strictEqual(err instanceof Error, true);
                                                                                        })
            }

            done();
        })

        it('should edit _student correctly', function(done)
        {
            var _user = "eric3";
            var _aluno = {name: "Aluno3"};
            var _id = "534dafae51aaf04b9b8c5b6f";


            _student.editStudent(_user, _aluno, _id, function(err)
            {
                assert.strictEqual(err, null);
                done();
            })
        })
    })

    describe('deleteStudent', function()
    {
        it('shouldn\'t delete _student - wrong user param', function(done)
        {
            var _id = "534dafae51aaf04b9b8c5b6f";

            var _wrongParams = ["", null, undefined, function(){}, {}, [], true, false, 1, 0];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.deleteStudent(_wrongParams[i], _id, function(err)
                                                             {
                                                                assert.notStrictEqual(err, null);
                                                                assert.strictEqual(err instanceof Error, true);
                                                             })
            }

            done();
        })

        it('shouldn\'t delete _student - wrong ID param', function(done)
        {
            var _user = "eric3";

            var _wrongParams = ["", null, undefined, function(){}, {}, [], true, false, 1, 0];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student.deleteStudent(_user, _wrongParams[i], function(err)
                                                               {
                                                                   assert.notStrictEqual(err, null);
                                                                   assert.strictEqual(err instanceof Error, true);
                                                               })
            }

            done();
        })

        it('should delete _student correctly', function(done)
        {
            var _user = "eric3";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _student.deleteStudent(_user, _id, function(err)
                                               {
                                                   assert.strictEqual(err, null);
                                                   done();
                                               })
        })
    })
})