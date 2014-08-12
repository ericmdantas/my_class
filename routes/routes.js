"use strict";

(function(isLoggedIn, content, users, classes, teachers, students, books, stats)
{
    function init(router, application, passport)
    {
        //NEEDS AUTHENTICATION

        router
            .route('/api/protected/*')
            .all(isLoggedIn);

        router
            .route('/principal')
            .all(isLoggedIn);


        //HTML
        router
            .route('/')
            .get(content.loginPage);

        router
            .route('/principal')
            .get(content.mainPage);


        //USER
        router
            .route('/api/validateUser')
            .all(passport.authenticate('local-login'))
            .post(users.validateUser);

        router
            .route('/api/logout')
            .post(users.logout);


        //CLAZZ
        router
            .route('/api/protected/classes')
            .get(classes.getClassesInfo)
            .post(classes.registerClass);

        router
            .route('/api/protected/classes/name')
            .get(classes.getClassesNames);

        router
            .route('/api/protected/classes/dailyInfo/:monthYear')
            .get(classes.getClassesDailyInfo);

        router
            .route('/api/protected/classes/dailyInfo/:id/:monthYear')
            .get(classes.getClassesDailyInfoByClass);

        router
            .route('/api/protected/classes/dailyInfo')
            .post(classes.registerClassMomentInTime);

        router
            .route('/api/protected/classes/:id')
            .put(classes.editClass)
            .delete(classes.deleteClass);


        //TEACHERS
        router
            .route('/api/protected/teachers')
            .get(teachers.getTeachersInfo)
            .post(teachers.registerTeacher);

        router
            .route('/api/protected/teachers/name')
            .get(teachers.getTeachersNames);

        router
            .route('/api/protected/teachers/:id')
            .put(teachers.editTeacher)
            .delete(teachers.deleteTeacher);


        //STUDENTS
        router
            .route('/api/protected/students')
            .get(students.getInfoFromAllStudents)
            .post(students.registerStudent);

        router
            .route('/api/protected/students/name')
            .get(students.getStudentsNames);

        router
            .route('/api/protected/students/name/:clazz')
            .get(students.getStudentsNamesByClass);

        router
            .route('/api/protected/students/:id')
            .put(students.editStudent)
            .delete(students.deleteStudent);


        //PAYMENTS
        router
            .route('/api/protected/students/payments')
            .get(students.getPaymentsInfo)
            .post(students.registerPayment);


        //BOOKS
        router
            .route('/api/protected/books')
            .get(books.getBooksInfo)
            .post(books.registerBook);

        router
            .route('/api/protected/books/:id')
            .put(books.editBook)
            .delete(books.deleteBook);


        //STATS
        router
            .route('/api/protected/earnings/trimester')
            .get(stats.getEarningByTrimesterInfo);

        router
            .route('/api/protected/interestedStudents/month')
            .get(stats.getInterestedStudentsPerMonth);


        //ERROR - SEND HTML
        router
            .route('/*')
            .get(content.mainPage)


        //MAKE ROUTER WORK
        application.use('/', router);
    }

    exports.init = init;

}(require('../services/SessionService'),
  require('../controllers/ContentController'),
  require('../controllers/UserController'),
  require('../controllers/ClazzController'),
  require('../controllers/TeacherController'),
  require('../controllers/StudentController'),
  require('../controllers/BookController'),
  require('../controllers/StatisticController')))