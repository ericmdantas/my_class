describe('LIB_FRONTEND BEING TESTED', function()
{
    var lib_frontend, rootScope, compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope').$new();
        lib_frontend = $injector.get('lib_frontend');
        compile = $injector.get('$compile');
    }))

    describe('checks elements creation', function()
    {
        it('should check if lib was created', function()
        {
            expect(lib_frontend).toBeDefined();
        })

        it('checks if lib_frontend.removeWhiteSpaces was created', function()
        {
            expect(lib_frontend.removeWhiteSpaces).toBeDefined();
            expect(typeof lib_frontend.removeWhiteSpaces).toEqual('function');
        })

        it('checks if lib_frontend.createWarningModal was created', function()
        {
            expect(lib_frontend.createAlert).toBeDefined();
            expect(typeof lib_frontend.createAlert).toEqual('function');
        })
    })

    describe('checks if removeWhiteSpaces is working', function()
    {
        it('should check if removeWhiteSpaces is working', function()
        {
            expect(function(){lib_frontend.removeWhiteSpaces(undefined)}).toThrow(new Error('problema na remoção de espaços em branco (obj == undefined)'));
        })

        it('should check if removeWhiteSpaces is working - undefined', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined};
            expect(lib_frontend.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - numbers', function()
        {
            var obj = {nome: " eric  ", idade: 1};
            expect(lib_frontend.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - boolean', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24};
            expect(lib_frontend.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - decimals', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined, altura: 1.703232322323232};
            expect(lib_frontend.removeWhiteSpaces(obj).nome).toBe('eric');
        })
    })
})