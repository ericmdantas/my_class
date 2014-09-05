describe('STUDENTSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock, _StudentService, _Student;
    var WEBSERVICE = '/api/protected/students';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _Student = $injector.get('Student');
        _StudentService = $injector.get('StudentService');

        _httpMock.when('GET', WEBSERVICE).respond([{nome: 'aluno qualquer'}]);
        _httpMock.when('GET', '/api/protected/classes/name').respond([{name: 'turma qualquer'}]);
        _httpMock.when('POST', WEBSERVICE).respond();
        _httpMock.when('PUT', '/api/protected/students/1').respond();
        _httpMock.when('DELETE', '/api/protected/students/1').respond();
    }))

    describe('elements creation', function()
    {
        it('checks if studentscontroller was created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect('StudentsController').toBeDefined();
        }))

        it('checks if $scope.alunos is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.alunos).toBeDefined();
        }))

        it('checks if $scope.aluno is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.aluno instanceof _Student).toBeTruthy();
        }))

        it('checks if $scope.turmasCadastradas is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.turmasCadastradas).toBeDefined();
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))

        it('checks if studentStatus was created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            expect(_scope.studentStatus).toBeDefined();
        }))

        it('checks if contractsTypes was created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            expect(_scope.contractsTypes).toBeDefined();
        }))

        it('should setStudent correctly', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var _obj = {a: 1};
            _scope.setStudent(_obj);

            expect(_scope.aluno.a).toEqual(_obj.a);
        }))
    })

    describe('resetStudent', function()
    {
        it('should have a brand new student', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            _scope.aluno = {a: 1};
            _scope.resetStudent();

            expect(_scope.aluno instanceof _Student).toBeTruthy();
        }))
    })

    describe('GET /api/protected/students', (function()
    {
        it('checks if _scope.alunos is being fed correctly even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            $controller('StudentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.alunos.length).toEqual(0);
        }))

        it('checks if _scope.alunos is being fed correctly even when there\'s only the object students - no array', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            $controller('StudentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.alunos.length).toEqual(0);
        }))

        it('checks if _scope.alunos is being fed correctly', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.alunos.length).toEqual(1);
        }))
    }))

    describe('POST /api/protected/students', function()
    {
        it('shouldn\'t allow a student to be registered without info - throws error', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = helper.invalidObjects();

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.registerNewStudent(wrongParams[i])
                }).not.toThrow(new Error('erro: aluno nao informado - registerNewStudent'));
            }
        }))

        it('checks if after registering, the _scope.novoAluno is an empty object', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var _aluno = {name: 'Abc', birthDate: '26/06/1989', };

            _scope.registerNewStudent(_aluno);
            _httpMock.flush();
        }))

        it('checks if addition is working', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([{name: 'A'}]);
            $controller('StudentsController', {$scope: _scope});
            var obj = {name: 'A', class: {name: 'B'}, status: {nome: 'C'}, availability: 'D', birthDate: '26/06/1989'};
            _scope.registerNewStudent(obj);
            _httpMock.flush();
            var quantidadeDeAlunosDepoisDaAdicao = _scope.alunos.length;
            expect(quantidadeDeAlunosDepoisDaAdicao).toBeGreaterThan(0);
        }))
    })

    describe('PUT /api/protected/students/:id', function()
    {
        it('tries to edit a student with an empty object - throws exception', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = helper.invalidObjects();

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editStudent(wrongParams[i])
                }).not.toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
            }
        }))

        it('tries to edit a student without _id', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var studentWithoutId = {name: 'A', age: '123'};

            expect(function()
            {
                _scope.editStudent(studentWithoutId)
            }).not.toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
        }))

        it('should edit successfully and return students on /api/protected/students', inject(function($controller)
        {
            var student = {_id: "1", name: 'e', class: '', status: '', contract: '', birthDate: '26/06/1989'};

            _httpMock.expectPUT(WEBSERVICE + '/' + student._id, student).respond();
            _httpMock.expectGET(WEBSERVICE).respond([{name: 'nome'}]);
            $controller('StudentsController', {$scope: _scope});
            _scope.editStudent(student);
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(_scope.alunos[0].name).toBe('nome');
        }))
    })

    describe('DELETE /api/protected/students/:id', function()
    {
        it('tries to delete a student with wrong parameters', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = [null, undefined, 1, {}, [], '', true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.deleteStudent(wrongParams[i])
                }).not.toThrow(new Error('Não foi possível realizar a deleção do aluno. O ID está errado.'));
            }
        }))

        it('checks if deletion is working - if there were 3 students, should be 2 after deletion', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            $controller('StudentsController', {$scope: _scope});

            _scope.alunos = [{name: 1, idade: 1, _id: "1"}];
            var quantidadeDeAlunosAntesDaDelecao = _scope.alunos.length;
            _scope.deleteStudent(_scope.alunos[0]._id);
            _httpMock.flush();

            expect(quantidadeDeAlunosAntesDaDelecao).toBeGreaterThan(0);
        }))
    })
})