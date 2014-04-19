describe('lib BEING TESTED', function()
{
    var lib, rootScope, compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope').$new();
        lib = $injector.get('lib');
        compile = $injector.get('$compile');
    }))

    describe('checks elements creation', function()
    {
        it('should check if lib was created', function()
        {
            expect(lib).toBeDefined();
        })

        it('checks if lib.removeWhiteSpaces was created', function()
        {
            expect(lib.removeWhiteSpaces).toBeDefined();
            expect(typeof lib.removeWhiteSpaces).toEqual('function');
        })

        it('checks if lib.createWarningModal was created', function()
        {
            expect(lib.createAlert).toBeDefined();
            expect(typeof lib.createAlert).toEqual('function');
        })
    })

    describe('checks if removeWhiteSpaces is working', function()
    {
        it('should check if removeWhiteSpaces is working - invalid parameters', function()
        {
            var wrongParams = [, "", null, undefined, {}, [], true, false, function(){}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){lib.removeWhiteSpaces(wrongParams[i])}).toThrow(new Error('problema na remoção de espaços em branco (obj == undefined)'));
            }
        })

        it('should check if removeWhiteSpaces is working - undefined', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined};
            expect(lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - numbers', function()
        {
            var obj = {nome: " eric  ", idade: 1};
            expect(lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - boolean', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24};
            expect(lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - decimals', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined, altura: 1.703232322323232};
            expect(lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - decimals', function()
        {
            var obj = {nome: " eric  ", sobrenome: 'dantas      ', vivo: true, idade: 24, idk: undefined, altura: 1.703232322323232};
            expect(lib.removeWhiteSpaces(obj).nome).toBe('eric');
            expect(lib.removeWhiteSpaces(obj).sobrenome).toBe('dantas');
        })
    })

    describe('checks if isStringInvalid is working', function()
    {
        it('should return true - string is invalid', function()
        {
            var wrongParams = [true, false, '', {}, [], function(){}, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(lib.isStringInvalid(wrongParams[i])).toBeTruthy();
            }
        })

        it('should return false - string is valid', function()
        {
            var correctParams = ["AAAA", "aaa", 'a', "123", "123.3", "{}"];

            for (var i = 0; i < correctParams.length; i++)
            {
                expect(lib.isStringInvalid(correctParams[i])).toBeFalsy();
            }
        })
    })

    describe('checks if isObjectInvalid is working', function()
    {
        it('should return true - object is invalid', function()
        {
            var wrongParams = [true, false, '', {}, [], function(){}, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(lib.isObjectInvalid(wrongParams[i])).toBeTruthy();
            }
        })

        it('should return false - object is valid', function()
        {
            var correctParams = [{name: "abc"}, [{name: "abc"}], {name: "true"}, {name: true}, {name: true, age: 1, address: {stuff: 1}}];

            for (var i = 0; i < correctParams.length; i++)
            {
                expect(lib.isObjectInvalid(correctParams[i])).toBeFalsy();
            }
        })
    })
})