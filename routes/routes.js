"use strict";

(function(isLoggedIn, content, users, classes, teachers, students, books, stats)
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
        app.post('/api/logout', users.logout);

        //CLASS
        app.get('/api/classes', isLoggedIn, classes.getClassesInfo);
        app.get('/api/classes/name', isLoggedIn, classes.getClassesNames);
        app.get('/api/classes/dailyInfo/:monthYear', isLoggedIn, classes.getClassesDailyInfo);
        app.get('/api/classes/dailyInfo/:id/:monthYear', isLoggedIn, classes.getClassesDailyInfoByClass);
        app.post('/api/classes', isLoggedIn, classes.registerClass);
        app.post('/api/classes/dailyInfo', isLoggedIn, classes.registerClassMomentInTime);
        app.put('/api/classes/:id', isLoggedIn, classes.editClass);
        app.delete('/api/classes/:id', isLoggedIn, classes.deleteClass);

        //TEACHERS
        app.get('/api/teachers', isLoggedIn, teachers.getTeachersInfo);
        app.get('/api/teachers/name', isLoggedIn, teachers.getTeachersNames);
        app.post('/api/teachers', isLoggedIn, teachers.registerTeacher);
        app.put('/api/teachers/:id', isLoggedIn, teachers.editTeacher);
        app.delete('/api/teachers/:id', isLoggedIn, teachers.deleteTeacher);

        //STUDENTS
        app.get('/api/students', isLoggedIn, students.getInfoFromAllStudents);
        app.get('/api/students/name', isLoggedIn, students.getStudentsNames);
        app.get('/api/students/name/:clazz', isLoggedIn, students.getStudentsNamesByClass);
        app.post('/api/students', isLoggedIn, students.registerStudent);
        app.put('/api/students/:id', isLoggedIn, students.editStudent);
        app.delete('/api/students/:id', isLoggedIn, students.deleteStudent);

        //PAYMENTS
        app.get('/api/students/payments', isLoggedIn, students.getPaymentsInfo);
        app.post('/api/students/payments', isLoggedIn, students.registerPayment);

        //BOOKS
        app.get('/api/books', isLoggedIn, books.getBooksInfo);
        app.post('/api/books', isLoggedIn, books.registerBook);
        app.put('/api/books/:id', isLoggedIn, books.editBook);
        app.delete('/api/books/:id', isLoggedIn, books.deleteBook);

        //STATS
        app.get('/api/earnings/trimester', isLoggedIn, stats.getEarningByTrimesterInfo);
        app.get('/api/interestedStudents/month', isLoggedIn, stats.getInterestedStudentsPerMonth);

        //ERROR - SEND HTML
        app.get('/*', isLoggedIn, content.mainPage);
    }

    exports.init = init;
}(require('./session'), require('./content'), require('../controllers/UserController'), require('../controllers/ClazzController'),
  require('../controllers/TeacherController'), require('../controllers/StudentController'), require('../controllers/BookController'), require('../controllers/StatisticController')))