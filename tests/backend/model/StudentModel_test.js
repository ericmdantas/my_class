"use strict";

var expect = require('chai').expect;
var StudentModel = require('../../../models/Student');
var mongoose = require('mongoose');
var dburl = require('../helpers/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('StudentsModel', function()
{
    var _student;

    before(function(done)
    {
        mongoose.models = {};
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
            expect(StudentModel).to.be.a("function");
        })
    })

    describe('findAllStudentsByUser', function()
    {
        it('shouldn\'t return any document - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", function(){}, true, false, 0, 1, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .findAllStudentsByUser(_wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any document - wrong user', function(done)
        {
            var _onSuccess = function(payments)
            {
                expect(payments).to.have.length(0);
                done();
            };

            var _wrongUser = "Eric3";

            _student
                .findAllStudentsByUser(_wrongUser)
                .then(_onSuccess);
        })

        it('should return document correctly', function(done)
        {
            var _onSuccess = function(payments)
            {
                expect(typeof payments).to.equal("object");
                expect(payments).to.have.length(1);
                expect(payments[0]._id).to.be.an('object');
                expect(payments[0].name).to.equal("Aluno1");
                expect(payments[0].birthDate).to.equal("26/06/1989");
                expect(payments[0].email).to.equal("ericdantas0@hotmail.com");
                expect(payments[0].phone).to.equal("27417417");
                expect(payments[0].class).to.equal("Turma1");
                expect(payments[0].mobilePhone).to.equal("998989898");
                expect(payments[0].availability).to.equal("15:00, 18:00");
                expect(payments[0].contract).to.equal("monthly");
                expect(payments[0].contractDate).to.equal("01/01/2010");
                expect(payments[0].address).to.equal("Rua Avenida Estrada km 99");
                expect(payments[0].status).to.equal("Matriculado");
                expect(payments[0].lastModified).to.be.an.instanceof(Date);
                expect(payments[0].registered).to.be.an.instanceof(Date);
                expect(payments[0].usersAllowed).to.not.exist;
                expect(payments[0].payments).to.not.exist;
                done();
            }

            var _usuario = "eric3";

            _student
                .findAllStudentsByUser(_usuario)
                .then(_onSuccess);
        })
    })

    describe('findAllStudentsNames', function()
    {
        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", function(){}, true, false, 0, 1, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .findAllStudentsNames(_wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return anything - user doesn\'t exist', function(done)
        {
            var _onSuccess = function(paymentsNames)
            {
                expect(paymentsNames).to.have.length(0);
                done();
            };

            var _wrongUser = "NO_ECXISTE";

            _student
                .findAllStudentsNames(_wrongUser)
                .then(_onSuccess);
        })

        it('should return info only about user eric3', function(done)
        {
            var _onSuccess = function(paymentsNames)
            {
                expect(paymentsNames[0]._id).to.be.an("object");
                expect(paymentsNames[0].name).to.equal("Aluno1");

                done();
            };

            var _user = "eric3";

            _student
                .findAllStudentsNames(_user)
                .then(_onSuccess);
        })

        it('should return info only about user outro', function(done)
        {
            var _onSuccess = function(paymentsNames)
            {
                expect(paymentsNames[0]._id).to.be.an("object");
                expect(paymentsNames[0].name).to.equal("Aluno2");
                expect(paymentsNames[1]._id).to.be.an("object");
                expect(paymentsNames[1].name).to.equal("Aluno3");
                expect(paymentsNames[2]._id).to.be.an("object");
                expect(paymentsNames[2].name).to.equal("Aluno4");
                done();
            };

            var _user = "outro";

            _student
                .findAllStudentsNames(_user)
                .then(_onSuccess);
        })
    })

    describe('findAllStudentsNamesByClass', function()
    {
        it('should not return anything - wrong user param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _clazz = "Turma1";

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .findAllStudentsNamesByClass(_wrongParams[i], _clazz)
                    .then(undefined, _onError);
            }

            done();
        })

        it('should not return anything - wrong class param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _user = "eric3";

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .findAllStudentsNamesByClass(_user, _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should not return anything - non existant user param', function(done)
        {
            var _onSuccess = function(paymentsNamesByClazz)
            {
                expect(paymentsNamesByClazz).to.have.length(0);
                done();
            };

            var _user = "NON_ECXISTE";
            var _clazz = "Turma1";

            _student
                .findAllStudentsNamesByClass(_user, _clazz)
                .then(_onSuccess);
        })

        it('should not return anything - non existant class param', function(done)
        {
            var _onSuccess = function(paymentsNamesByClazz)
            {
                expect(paymentsNamesByClazz).to.have.length(0);
                done();
            };

            var _user = "eric3";
            var _clazz = "NON_ECXISTE";


            _student
                .findAllStudentsNamesByClass(_user, _clazz)
                .then(_onSuccess);
        })

        it('should return payments names by class correctly - eric3', function(done)
        {
            var _onSuccess = function(paymentsNamesByClazz)
            {
                expect(paymentsNamesByClazz).to.have.length(1);
                expect(paymentsNamesByClazz[0].name).to.equal("Aluno1");
                done();
            };

            var _user = "eric3";
            var _clazz = "Turma1";

            _student
                .findAllStudentsNamesByClass(_user, _clazz)
                .then(_onSuccess);
        })

        it('should return payments names by class correctly - eric3', function(done)
        {
            var _onSuccess = function(paymentsNamesByClazz)
            {
                expect(paymentsNamesByClazz).to.have.length(3);
                expect(paymentsNamesByClazz[0].name).to.equal("Aluno2");
                done();
            };

            var _user = "outro";
            var _clazz = "Turma2";

            _student
                .findAllStudentsNamesByClass(_user, _clazz)
                .then(_onSuccess);
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
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _pagamento = {name: "Aluno1"};
            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerNewPayment(_wrongParams[i], _pagamento)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register payment - wrong payment param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];
            var _user = "eric3";

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerNewPayment(_user, _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register payment - both user and payment are wrong', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", undefined, null, {}, [], function(){}, 1, 0, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerNewPayment(_wrongParams[i], _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register payment correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

            var _user = "eric3";
            var _pagamento = {name: "Aluno1"};

            _student
                .registerNewPayment(_user, _pagamento)
                .then(_onSuccess);
        })
    })

    describe('findAllPaymentsByUser', function()
    {
        it('shouldn\'t find all payments - wrong user param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", null, function(){}, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .findAllPaymentsByUser(_wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should find all payments correctly', function(done)
        {
            var _onSuccess = function(payments)
            {
                expect(typeof payments).to.equal("object");
                expect(payments).to.have.length(1);
                expect(payments[0]._id).to.be.an('object');
                expect(payments[0].name).to.equal("Aluno1");
                expect(payments[0].birthDate).to.equal("26/06/1989");
                expect(payments[0].email).to.equal("ericdantas0@hotmail.com");
                expect(payments[0].phone).to.equal("27417417");
                expect(payments[0].class).to.equal("Turma1");
                expect(payments[0].mobilePhone).to.equal("998989898");
                expect(payments[0].availability).to.equal("15:00, 18:00");
                expect(payments[0].contract).to.equal("monthly");
                expect(payments[0].contractDate).to.equal("01/01/2010");
                expect(payments[0].address).to.equal("Rua Avenida Estrada km 99");
                expect(payments[0].status).to.equal("Matriculado");
                expect(payments[0].lastModified).to.be.an.instanceof(Date);
                expect(payments[0].registered).to.be.an.instanceof(Date)
                expect(payments[0].usersAllowed).to.not.exist;
                expect(payments[0].payments[0].paymentMonth).to.equal("04/2999");
                expect(payments[0].payments[0].amountPaid).to.equal("123");
                expect(payments[0].payments[0].paidWithWhat).to.equal("Dinheiro");
                expect(payments[0].payments[0].untilWhen).to.equal("Junho");
                expect(payments[0].payments[0].lastModified).to.be.an.instanceof(Date);
                expect(payments[0].payments[0].observation).to.equal("Observation");
                done();
            };

            var _user = "eric3";

            _student
                .findAllPaymentsByUser(_user)
                .then(_onSuccess);
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
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _aluno = {name: "Aluno3"};
            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerStudent(_wrongParams[i], _aluno)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register _student - wrong _student param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _user = "eric3";
            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerStudent(_user, _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register _student - both _student and user are wrong', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", null, undefined, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .registerStudent(_wrongParams[i], _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register _student correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            }

            var _aluno = {name: "Aluno1", birthDate: "26/06/1989"};
            var _user = "eric3";

            _student
                .registerStudent(_user, _aluno)
                .then(_onSuccess);
        })
    })

    describe('editStudent', function()
    {
        it('shouldn\'t edit _student - wrong user param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "534dafae51aaf04b9b8c5b6f";
            var _aluno = {name: "Aluno3"};

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .editStudent(_wrongParams[i], _aluno, _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit _student - wrong _student param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "534dafae51aaf04b9b8c5b6f";
            var _user = "eric3";

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .editStudent(_user, _wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit _student - wrong id param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _user = "eric3";
            var _aluno = {name: "Aluno1"};

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .editStudent(_user, _aluno, _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit _student - all params are wrong', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _wrongParams = ["", null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .editStudent(_wrongParams[i], _wrongParams[i], _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should edit _student correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            }

            var _user = "eric3";
            var _aluno = {name: "Aluno3"};
            var _id = "534dafae51aaf04b9b8c5b6f";


            _student
                .editStudent(_user, _aluno, _id)
                .then(_onSuccess);
        })
    })

    describe('deleteStudent', function()
    {
        it('shouldn\'t delete _student - wrong user param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "534dafae51aaf04b9b8c5b6f";

            var _wrongParams = ["", null, undefined, function(){}, {}, [], true, false, 1, 0];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .deleteStudent(_wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t delete _student - wrong ID param', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _user = "eric3";

            var _wrongParams = ["", null, undefined, function(){}, {}, [], true, false, 1, 0];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _student
                    .deleteStudent(_user, _wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should delete _student correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            }

            var _user = "eric3";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _student
                .deleteStudent(_user, _id)
                .then(_onSuccess);
        })
    })

    describe('deletePayment', function()
    {
        it('should throw an error - user is not valid', function(done)
        {
            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível deletar o pagamento. Usuário passado não é válido/);

                done();
            }

            var _user = null;

            _student
                .deletePayment(_user, null)
                .then(null, _onError);
        })

        it('should throw an error - object payment is not valid', function(done)
        {
            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível deletar o pagamento. Objeto passado não é válido/);

                done();
            }

            var _user = 'eric3';

            _student
                .deletePayment(_user, null)
                .then(null, _onError);
        })

        it('should not delete the payment correctly - user doesn\'t exist', function(done)
        {
            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Nenhum pagamento encontrado para deleção./);
                done();
            }

            var _user = 'NO_ECZISTE';
            var _payment = {student: "Aluno4",
                month: "04/2999",
                amount: "123"};

            _student
                .deletePayment(_user, _payment)
                .then(_onSuccess, _onError);
        })

        it('should delete the payment correctly', function(done)
        {
            var _onSuccess = function()
            {
                expect(true).to.be.true;
                done();
            }

            var _onError = function()
            {
                expect(false).to.be.true();
            }

            var _user = 'outro';
            var _payment = {student: "Aluno4",
                            month: "04/2999",
                            amount: "123"};

            _student
                .deletePayment(_user, _payment)
                .then(_onSuccess, _onError);
        })
    })
})