describe('MAINCONTROLLER BEING TESTED', function()
{
    var httpMock, scope = {};

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/getUser/eric3')
                .respond({resultado:{}});
        scope = $injector.get('$rootScope').$new();
    }))

    describe('elements creation', function()
    {
        it('checks if main controller is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect('MainController').toBeDefined();
        }))

        it('checks if scope.turmas is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.turmas).toBeDefined();
        }))

        it('checks if scope.alunos is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.alunos).toBeDefined();
        }))

        it('checks if scope.livros is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.livros).toBeDefined();
        }))

        it('checks if scope.getPeriodDay is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.getPeriodDay).toBeDefined();
            expect(typeof scope.getPeriodDay).toEqual("function");
        }))

        it('checks if scope.cfg is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))
    })

    describe('checks /getUser/:user', function()
    {
        it('checks if getUser without any response', inject(function($controller)
        {
            httpMock.expectGET('/api/getUser/eric3').respond();
            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual(0);
            expect(scope.professores).toEqual(0);
            expect(scope.alunos).toEqual(0);
            expect(scope.livros).toEqual(0);
        }))

        it('checks if /getUser/eric3 is working without response - turmas', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual(0);
        }))

        it('checks if /getUser/eric3 is working without response - alunos', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            httpMock.expectGET('/api/getUser/eric3');
            httpMock.flush();
            expect(scope.alunos).toEqual(0);
        }))

        it('checks if /getUser/eric3 is working without response - livros', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.livros).toEqual(0);
        }))

        it('checks if /getUser/eric3 is working - scope.turma (1)', inject(function($controller)
        {
            httpMock.expectGET('/api/getUser/eric3')
                    .respond(
                    {
                        resultado: {
                                        username: 'eric',
                                        password: '1',
                                        classes: [{
                                                    name: "a"
                                                 }]
                                   }
                    });

            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas.length).toEqual(1);
        }))

        it('checks if /getUser/eric3 is working - scope.livros (2)', inject(function($controller)
        {
            httpMock.expectGET('/api/getUser/eric3')
                .respond(
                {
                    resultado: {
                                    username: 'eric',
                                    password: '1',
                                    books: [{
                                                name: "a",
                                                quantity: 19
                                             },
                                             {
                                                name: "b",
                                                quantity: 1
                                             }]
                               }
                });

            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.livros.length).toEqual(2);
        }))

        it('checks if /getUser/eric3 is working - scope.students (3)', inject(function($controller)
        {
            httpMock.expectGET('/api/getUser/eric3')
                .respond({
                          resultado: {
                                        username: 'eric',
                                        password: '1',
                                        students: [{name: "eric1"}, {name: "eric2"}, {name: "eric3"}]
                                     }
                        });

            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.alunos.length).toEqual(3);
        }))

        it('checks if /getUser/eric3 is working -scope.turmas (2), scope.students (1), scope.livros (2)', inject(function($controller)
        {
            httpMock.expectGET('/api/getUser/eric3')
                    .respond(
                    {
                        resultado: {
                                        books: 1,
                                        students: 2,
                                        classes: 3,
                                        teachers: 4
                                     }
                    });

            $controller('MainController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual(3);
            expect(scope.alunos).toEqual(2);
            expect(scope.livros).toEqual(1);
            expect(scope.professores).toEqual(4);
        }))
    })

    describe('checks if getPeriodDay is working properly', function()
    {
        it('checks if getPeriodDay is returning values', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(typeof scope.getPeriodDay()).toBe("string");
        }))

        it('checks if the new Date().getHours is working', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});

            var hora = new Date().getHours();
            var manha = hora < 12;
            var tarde = hora >= 12 && hora < 18;

            var cumprimento = manha ? "Bom dia" : tarde ? "Boa tarde" : "Boa noite";

            expect(scope.getPeriodDay()).toEqual(cumprimento);
        }))
    })
});