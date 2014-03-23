"use strict";

var isLoggedIn = require('./session');

(function(content, users, classes, teachers, students, books, stats)
{
    var app, authentication;

    function init(application, passport)
    {
        app = application;
        authentication = passport;
        listenURLs();
    }

    function listenURLs()
    {
        //HTML
        app.get('/', content.loginPage);
        app.get('/principal', isLoggedIn, content.mainPage);

        //USER
        app.post('/api/validateUser', authentication.authenticate('local-login'), users.validateUser);
        app.get('/api/getUser/:username', isLoggedIn, users.getUserInfoByUsername);
        app.post('/api/logout', users.logout);

        //CLASS
        app.get('/api/getClasses', isLoggedIn, classes.getClassesInfo);
        app.post('/api/registerClass', isLoggedIn, classes.registerClass);
        app.post('/api/editClass', isLoggedIn, classes.editClass);
        app.delete('/api/deleteClass', isLoggedIn, classes.deleteClass);

        //TEACHERS
        app.get('/api/getTeachers', isLoggedIn, teachers.getTeachersInfo);
        app.post('/api/registerTeacher', isLoggedIn, teachers.registerTeacher);
        app.post('/api/editTeacher', isLoggedIn, teachers.editTeacher);
        app.delete('/api/deleteTeacher', isLoggedIn, teachers.deleteTeacher);

        //STUDENTS
        app.get('/api/getStudents', isLoggedIn, students.getInfoFromAllStudents);
        app.post('/api/registerStudent', isLoggedIn, students.registerStudent);
        app.post('/api/editStudent', isLoggedIn, students.editStudent);
        app.delete('/api/deleteStudent', isLoggedIn, students.deleteStudent);

        //PAYMENTS
        app.get('/api/getPayments', isLoggedIn, students.getPaymentsInfo);
        app.post('/api/registerPayment', isLoggedIn, students.registerPayment);

        //BOOKS
        app.get('/api/getBooks', isLoggedIn, books.getBooksInfo);
        app.post('/api/registerBook', isLoggedIn, books.registerBook);
        app.post('/api/editBook', isLoggedIn, books.editBook);
        app.delete('/api/deleteBook', isLoggedIn, books.deleteBook);

        //STATS
        app.get('/api/getEarningByTrimester', isLoggedIn, stats.getEarningByTrimesterInfo);
        app.get('/api/getInterestedStudentsPerMonth', isLoggedIn, stats.getInterestedStudentsPerMonth);

        //ERROR
        app.get('/*', isLoggedIn, content.mainPage);
    }

    exports.init = init;
}(require('./content'), require('../controllers/UserController'), require('../controllers/ClassController'),
  require('../controllers/TeacherController'), require('../controllers/StudentController'), require('../controllers/BookController'), require('../controllers/StatisticController')))