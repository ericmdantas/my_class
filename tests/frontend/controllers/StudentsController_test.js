describe('STUDENTSCONTROLLER BEING TESTED', function()
{
    var scope, httpMock, lib_frontend;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        lib_frontend = $injector.get('lib_frontend');
        httpMock.when('GET', '/api/students').respond({students: [{nome: 'aluno qualquer'}]});
        httpMock.when('GET', '/api/classes/name').respond({classes: [{name: 'turma qualquer'}]});
        httpMock.when('POST', '/api/students').respond(200);
        httpMock.when('DELETE', '/api/students/1').respond(200);
    }))

    describe('elements creation', function()
    {
        it('checks if studentscontroller was created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect('StudentsController').toBeDefined();
        }))

        it('checks if $scope.alunos is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.alunos).toBeDefined();
        }))

        it('checks if $scope.novoAluno is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.novoAluno).toBeDefined();
        }))

        it('checks if $scope.alunoEscolhido is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.alunoEscolhido).toBeDefined();
        }))

        it('checks if $scope.turmasCadastradas is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.turmasCadastradas).toBeDefined();
        }))

        it('checks if $scope.isLoadingVisible is created', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.isLoadingVisible).toBeDefined();
            expect(scope.isLoadingVisible.modal).toEqual(false);
        }))

        it('checks if $scope.getStudents is defined', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.getStudents).toBeDefined();
        }))

        it('checks if $scope.getClassesName is defined', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.getClassesNames).toBeDefined();
        }))

        it('checks if modals are ready to be opened - openModalToDeleteStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.openModalToDeleteStudent).toBeDefined();
            expect(typeof scope.openModalToDeleteStudent).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.openModalToRegisterStudent).toBeDefined();
            expect(typeof scope.openModalToRegisterStudent).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditStudent', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(scope.openModalToEditStudent).toBeDefined();
            expect(typeof scope.openModalToEditStudent).toEqual('function');
        }))
    })

    describe('checks if opening modal to edit student is working properly', function()
    {
        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            var chosenStudent = {};
            scope.openModalToEditStudent(chosenStudent);
            expect(scope.alunoEscolhido).toEqual(chosenStudent);
        }))

        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            var chosenStudent = {_id: 'abc', name: 'Turma1'};
            scope.openModalToEditStudent(chosenStudent);
            expect(scope.alunoEscolhido).toEqual(chosenStudent);
        }))
    })

    describe('checks if opening modal to delete class is working properly', function()
    {
        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            var chosenStudent = {};
            scope.openModalToDeleteStudent(chosenStudent);
            expect(scope.alunoEscolhido).toEqual(chosenStudent);
        }))

        it('checks if opening student and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            var chosenStudent = {_id: 'abc', name: 'Turma1'};
            scope.openModalToDeleteStudent(chosenStudent);
            expect(scope.alunoEscolhido).toEqual(chosenStudent);
        }))
    })

    describe('GET /api/students', (function()
    {
        it('checks if scope.alunos is being fed correctly even when there\'s no response', inject(function($controller)
        {
            httpMock.expectGET('/api/students').respond({});
            $controller('StudentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.alunos.length).toEqual(0);
        }))

        it('checks if scope.alunos is being fed correctly even when there\'s only the object students - no array', inject(function($controller)
        {
            httpMock.expectGET('/api/students').respond({students: []});
            $controller('StudentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.alunos.length).toEqual(0);
        }))

        it('checks if scope.alunos is being fed correctly', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.alunos.length).toEqual(1);
        }))
    }))

    describe('POST /api/students', function()
    {
        it('checks if after registering, the scope.novoAluno is an empty object', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            scope.registerNewStudent({nome: 123});
            httpMock.flush();
            expect(scope.novoAluno).toEqual({});
        }))

        it('checks if addition is working', inject(function($controller)
        {
            httpMock.expectGET('/api/students').respond({students: [{name: 'A'}]});
            $controller('StudentsController', {$scope: scope});
            var obj = {name: 'A', class: {name: 'B'}, status: {nome: 'C'}, availability: 'D'};
            scope.registerNewStudent(obj);
            httpMock.flush();
            var quantidadeDeAlunosDepoisDaAdicao = scope.alunos.length;
            expect(quantidadeDeAlunosDepoisDaAdicao).toBeGreaterThan(0);
        }))

        it('shouldn\'t allow a student to be registered without info', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(function(){scope.registerNewStudent(undefined)}).toThrow(new Error('erro: aluno nao informado - registerNewStudent'));
        }))
    })

    describe('PUT /api/students/:id', function()
    {
        it('tries to edit a student with an empty object - throws exception', inject(function($controller)
        {
            httpMock.expectPUT('/api/students/1', undefined).respond();
            $controller('StudentsController', {$scope: scope});
            expect(function(){scope.editStudent(null)}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
            expect(function(){scope.editStudent(undefined)}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
            expect(function(){scope.editStudent()}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
            expect(function(){scope.editStudent({})}).toThrow(new Error('Não foi possível editar este aluno. Tente mais tarde.'));
        }))

        it('should edit successfully and return students on /api/students', inject(function($controller)
        {
            httpMock.expectPUT('/api/students/1').respond();
            httpMock.expectGET('/api/students').respond({students: [{name: 'nome'}]});
            $controller('StudentsController', {$scope: scope});
            var student = {_id: 1, name: 'e', class: '', status: '', contract: ''};
            scope.editStudent(student);
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(scope.alunos[0].name).toBe('nome');
        }))
    })

    describe('DELETE /api/students/:id', function()
    {
        it('tries to delete a student with wrong parameters', inject(function($controller)
        {
            $controller('StudentsController', {$scope: scope});
            expect(function(){scope.deleteStudent(null)}).toThrow(new Error('Não foi possível realizar a deleção do aluno. O ID está errado.'));
            expect(function(){scope.deleteStudent(undefined)}).toThrow(new Error('Não foi possível realizar a deleção do aluno. O ID está errado.'));
            expect(function(){scope.deleteStudent({})}).toThrow(new Error('Não foi possível realizar a deleção do aluno. O ID está errado.'));
        }))

        it('checks if deletion is working - if there were 3 students, should be 2 after deletion', inject(function($controller)
        {
            httpMock.expectGET('/api/students').respond({students: {students: []}});
            $controller('StudentsController', {$scope: scope});
            scope.alunos = [{name: 1, idade: 1, _id: 1}];
            var quantidadeDeAlunosAntesDaDelecao = scope.alunos.length;
            scope.deleteStudent(scope.alunos[0]._id);
            httpMock.flush();

            expect(quantidadeDeAlunosAntesDaDelecao).toBeGreaterThan(0);
        }))
    })
})