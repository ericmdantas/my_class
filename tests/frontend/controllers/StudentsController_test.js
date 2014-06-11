describe('STUDENTSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', '/api/students').respond({students: [{nome: 'aluno qualquer'}]});
        _httpMock.when('GET', '/api/classes/name').respond({classes: [{name: 'turma qualquer'}]});
        _httpMock.when('POST', '/api/students').respond(200);
        _httpMock.when('PUT', '/api/students/1').respond();
        _httpMock.when('DELETE', '/api/students/1').respond(200);
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

        it('checks if $scope.novoAluno is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.novoAluno).toBeDefined();
        }))

        it('checks if $scope.alunoEscolhido is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.alunoEscolhido).toBeDefined();
        }))

        it('checks if $scope.turmasCadastradas is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.turmasCadastradas).toBeDefined();
        }))

        it('checks if $scope.isLoadingVisible is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.isLoadingVisible).toBeDefined();
            expect(_scope.isLoadingVisible.modal).toEqual(false);
        }))

        it('checks if $scope.getStudents is defined', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.getStudents).toBeDefined();
        }))

        it('checks if $scope.getClassesName is defined', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.getClassesNames).toBeDefined();
        }))

        it('checks if modals are ready to be opened - openModalToDeleteStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.openModalToDeleteStudent).toBeDefined();
            expect(typeof _scope.openModalToDeleteStudent).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.openModalToRegisterStudent).toBeDefined();
            expect(typeof _scope.openModalToRegisterStudent).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            expect(_scope.openModalToEditStudent).toBeDefined();
            expect(typeof _scope.openModalToEditStudent).toEqual('function');
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
    })

    describe('openModalToRegisterStudent()', function()
    {
        it('should call openModalToRegisterStudent correctly', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            _scope.openModalToRegisterStudent();
        }))
    })

    describe('openModalToEditStudent()', function()
    {
        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var chosenStudent = {};
            _scope.openModalToEditStudent(chosenStudent);
            expect(_scope.alunoEscolhido).toEqual(chosenStudent);
        }))

        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var chosenStudent = {_id: 'abc', name: 'Turma1'};
            _scope.openModalToEditStudent(chosenStudent);
            expect(_scope.alunoEscolhido).toEqual(chosenStudent);
        }))
    })

    describe('openModalToDeleteStudent()', function()
    {
        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var chosenStudent = {};
            _scope.openModalToDeleteStudent(chosenStudent);
            expect(_scope.alunoEscolhido).toEqual(chosenStudent);
        }))

        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var chosenStudent = {_id: 'abc', name: 'Turma1'};
            _scope.openModalToDeleteStudent(chosenStudent);
            expect(_scope.alunoEscolhido).toEqual(chosenStudent);
        }))
    })

    describe('GET /api/students', (function()
    {
        it('checks if _scope.alunos is being fed correctly even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET('/api/students').respond({});
            $controller('StudentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.alunos.length).toEqual(0);
        }))

        it('checks if _scope.alunos is being fed correctly even when there\'s only the object students - no array', inject(function($controller)
        {
            _httpMock.expectGET('/api/students').respond({students: []});
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

    describe('POST /api/students', function()
    {
        it('shouldn\'t allow a student to be registered without info - throws error', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = [null, undefined, 1, true, false, [], {}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.registerNewStudent(wrongParams[i])}).toThrow(new Error('erro: aluno nao informado - registerNewStudent'));
            }
        }))

        it('checks if after registering, the _scope.novoAluno is an empty object', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            _scope.registerNewStudent({nome: 123});
            _httpMock.flush();
            expect(_scope.novoAluno).toEqual({});
        }))

        it('checks if addition is working', inject(function($controller)
        {
            _httpMock.expectGET('/api/students').respond({students: [{name: 'A'}]});
            $controller('StudentsController', {$scope: _scope});
            var obj = {name: 'A', class: {name: 'B'}, status: {nome: 'C'}, availability: 'D'};
            _scope.registerNewStudent(obj);
            _httpMock.flush();
            var quantidadeDeAlunosDepoisDaAdicao = _scope.alunos.length;
            expect(quantidadeDeAlunosDepoisDaAdicao).toBeGreaterThan(0);
        }))
    })

    describe('PUT /api/students/:id', function()
    {
        it('tries to edit a student with an empty object - throws exception', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = [null, undefined, {}, [], true, false, '', 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.editStudent(wrongParams[i])}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
            }
        }))

        it('tries to edit a student without _id', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});
            var studentWithoutId = {name: 'A', age: '123'};

            expect(function(){_scope.editStudent(studentWithoutId)}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
        }))

        it('should edit successfully and return students on /api/students', inject(function($controller)
        {
            _httpMock.expectPUT('/api/students/1').respond();
            _httpMock.expectGET('/api/students').respond({students: [{name: 'nome'}]});
            $controller('StudentsController', {$scope: _scope});
            var student = {_id: "1", name: 'e', class: '', status: '', contract: ''};
            _scope.editStudent(student);
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(_scope.alunos[0].name).toBe('nome');
            expect(_scope.alunoEscolhido).toEqual({});
        }))
    })

    describe('DELETE /api/students/:id', function()
    {
        it('tries to delete a student with wrong parameters', inject(function($controller)
        {
            $controller('StudentsController', {$scope: _scope});

            var wrongParams = [null, undefined, 1, {}, [], '', true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.deleteStudent(wrongParams[i])}).toThrow(new Error('Não foi possível realizar a deleção do aluno. O ID está errado.'));
            }
        }))

        it('checks if deletion is working - if there were 3 students, should be 2 after deletion', inject(function($controller)
        {
            _httpMock.expectGET('/api/students').respond({students: {students: []}});
            $controller('StudentsController', {$scope: _scope});
            _scope.alunos = [{name: 1, idade: 1, _id: "1"}];
            var quantidadeDeAlunosAntesDaDelecao = _scope.alunos.length;
            _scope.deleteStudent(_scope.alunos[0]._id);
            _httpMock.flush();

            expect(quantidadeDeAlunosAntesDaDelecao).toBeGreaterThan(0);
            expect(_scope.alunoEscolhido).toEqual({});
        }))
    })
})