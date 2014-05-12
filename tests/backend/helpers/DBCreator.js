"use strict";

var BookModel = require('../../../models/Book');
var ClazzModel = require('../../../models/Clazz');
var StudentModel = require('../../../models/Student');
var TeacherModel = require('../../../models/Teacher');
var UserModel = require('../../../models/User');

var DBCreator = function()
{
    function _create(model, done)
    {
        model = model.toLowerCase();

        switch (model)
        {
            case "student": _createStudentModel(done);
                            break;

            case "clazz": _createClazzModel(done);
                          break;

            case "teacher": _createTeacherModel(done);
                            break;

            case "book": _createBookModel(done);
                         break;

            case "user": _createUserModel(done);
                         break;

            case "statistic": _createStatisticModel(done);
                              break;

            default: throw new Error('Modelo não encontrado. Os modelos válidos são: student, clazz, teacher, book, statistic e user.');
        }
    }

    function _createStudentModel(done)
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
                    paymentMonth: "04/2999",
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
                usersAllowed: ["outro"],
                payments: [{
                    paymentMonth: "04/2999",
                    amountPaid: "123",
                    paidWithWhat: "Dinheiro",
                    untilWhen: "Junho",
                    registered: new Date(),
                    lastModified: new Date(),
                    observation: "Observation"
                }]
            },
            {
                name: "Aluno3",
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
                usersAllowed: ["outro"],
                payments: [{
                    paymentMonth: "04/2999",
                    amountPaid: "123",
                    paidWithWhat: "Dinheiro",
                    untilWhen: "Junho",
                    registered: new Date(),
                    lastModified: new Date(),
                    observation: "Observation"
                }]
            },
            {
                name: "Aluno4",
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
                usersAllowed: ["outro"],
                payments: [{
                    paymentMonth: "04/2999",
                    amountPaid: "123",
                    paidWithWhat: "Dinheiro",
                    untilWhen: "Junho",
                    registered: new Date(),
                    lastModified: new Date(),
                    observation: "Observation"
                }]
            }, done);
    }

    function _createClazzModel(done)
    {
        ClazzModel.create({
                name: "Turma7",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [
                    {
                        day: "01",
                        monthYear: "04_2013",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [
                            {
                                name: "Aluno1",
                                wasInClass: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "Turma1",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [
                    {
                        day: "01",
                        monthYear: "04_2014",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [
                            {
                                name: "Aluno1",
                                wasInClass: true
                            }
                        ]
                    },
                    {
                        day: "02",
                        monthYear: "04_2014",
                        teacherName: "Teacher2",
                        subject: "matéria2",
                        studentByDay: [
                            {
                                name: "Aluno1",
                                wasInClass: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "Turma6",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [
                    {
                        day: "01",
                        monthYear: "05_2014",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [
                            {
                                name: "Aluno1",
                                wasInClass: true
                            }
                        ]
                    }
                ]
            },
            {
                name: "Turma2",
                    students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [
                {
                    day: "01",
                    monthYear: "01",
                    teacherName: "Teacher1",
                    subject: "matéria1",
                    studentByDay: [
                        {
                            name: "Aluno1",
                            wasInClass: true
                        }
                    ]
                }
            ]
            },
            {
                _id: '534dafae51aaf04b9b8c5b6f',
                name: "Turma3",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [
                {
                    day: "01",
                    monthYear: "04_2014",
                    teacherName: "Teacher1",
                    subject: "matéria1",
                    studentByDay: [
                        {
                            name: "Aluno1",
                            wasInClass: true
                        }
                    ]
                }
                ]
        }, done);
    }

    function _createTeacherModel(done)
    {
        TeacherModel.create({
                name: "Professor1",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            },
            {
                name: "Professor2",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            },
            {
                name: "Professor3",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            },
            {
                name: "Professor4",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            }, done)
    }

    function _createBookModel(done)
    {
        BookModel.create({name: "Livro1", quantity: "1", usersAllowed: ["abc123"]},
                         {name: "Livro2", quantity: "2", usersAllowed: ["XYZ987"]},
                         {_id: "534dafae51aaf04b9b8c5b6f", name: "Livro1", quantity: 99, usersAllowed: ["usuario"]}, done);
    }

    function _createUserModel(done)
    {
        UserModel.create({username: "eric3    ", password: "112233   ", registered: new Date(), payment: true}, done);
    }

    function _createStatisticModel(done)
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
    }

    return {create: _create}

}

module.exports = DBCreator;