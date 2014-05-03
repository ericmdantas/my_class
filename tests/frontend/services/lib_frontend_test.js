describe('_lib BEING TESTED', function()
{
    var _lib;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _lib = $injector.get('lib');
    }))

    describe('checks elements creation', function()
    {
        it('should check if _lib was created', function()
        {
            expect(_lib).toBeDefined();
        })

        it('checks if _lib.removeWhiteSpaces was created', function()
        {
            expect(_lib.removeWhiteSpaces).toBeDefined();
            expect(typeof _lib.removeWhiteSpaces).toEqual('function');
        })

        it('checks if _lib.createWarningModal was created', function()
        {
            expect(_lib.createAlert).toBeDefined();
            expect(typeof _lib.createAlert).toEqual('function');
        })
    })

    describe('removeWhiteSpaces', function()
    {
        it('should check if removeWhiteSpaces is working - invalid parameters', function()
        {
            var wrongParams = [, "", null, undefined, {}, [], true, false, function(){}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_lib.removeWhiteSpaces(wrongParams[i])}).toThrow(new Error('problema na remoção de espaços em branco (obj == undefined)'));
            }
        })

        it('should check if removeWhiteSpaces is working - undefined', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined};
            expect(_lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - numbers', function()
        {
            var obj = {nome: " eric  ", idade: 1};
            expect(_lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - boolean', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24};
            expect(_lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - decimals', function()
        {
            var obj = {nome: " eric  ", vivo: true, idade: 24, idk: undefined, altura: 1.703232322323232};
            expect(_lib.removeWhiteSpaces(obj).nome).toBe('eric');
        })

        it('should check if removeWhiteSpaces is working - decimals', function()
        {
            var obj = {nome: " eric  ", sobrenome: 'dantas      ', vivo: true, idade: 24, idk: undefined, altura: 1.703232322323232};
            expect(_lib.removeWhiteSpaces(obj).nome).toBe('eric');
            expect(_lib.removeWhiteSpaces(obj).sobrenome).toBe('dantas');
        })
    })

    describe('isStringInvalid', function()
    {
        it('should return true - string is invalid', function()
        {
            var wrongParams = [true, false, '', {}, [], function(){}, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(_lib.isStringInvalid(wrongParams[i])).toBeTruthy();
            }
        })

        it('should return false - string is valid', function()
        {
            var correctParams = ["AAAA", "aaa", 'a', "123", "123.3", "{}"];

            for (var i = 0; i < correctParams.length; i++)
            {
                expect(_lib.isStringInvalid(correctParams[i])).toBeFalsy();
            }
        })
    })

    describe('isObjectInvalid', function()
    {
        it('should return true - object is invalid', function()
        {
            var wrongParams = [true, false, '', {}, [], function(){}, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(_lib.isObjectInvalid(wrongParams[i])).toBeTruthy();
            }
        })

        it('should return false - object is valid', function()
        {
            var correctParams = [{name: "abc"}, [{name: "abc"}], {name: "true"}, {name: true}, {name: true, age: 1, address: {stuff: 1}}];

            for (var i = 0; i < correctParams.length; i++)
            {
                expect(_lib.isObjectInvalid(correctParams[i])).toBeFalsy();
            }
        })
    })

    describe('isMonthYearInvalid', function()
    {
        var _invalidYear = new Date().getFullYear() + 1;
        var _invalidMonth = new Date().getMonth() + 2;

        it('should return true - invalid MonthYear param ', function()
        {
            var _wrongParams = ['', 1, 2, function(){}, true, false, {}, [], "1/2014", "1_2014", "01.2014",
                                "01/1999", "01/"+ _invalidYear, _invalidMonth + "/" + new Date().getFullYear(), "13/2999", "../...."];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(_lib.isMonthYearInvalid(_wrongParams[i])).toBeTruthy();
            }
        })

        it('should return false - valid MonthYear param', function()
        {
            var _correctParams = ['01/2014', '02/2013', '12/2001', "06/2000"];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(_lib.isMonthYearInvalid(_correctParams[i])).toBeFalsy();
            }
        })
    })

    describe('emptyProperty', function()
    {
        it('should throw error - wrong parent param', function()
        {
            var _wrongParams = ['', 1, false, true, [], {}, function(){}, 1, 0];
            var _property = 'algumaPropriedade';
            var _withWhat = {};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _lib.emptyProperty(_wrongParams[i], _property, _withWhat);
                }).toThrow(new Error('Objeto pai não é um objeto válido para ter sua propriedade limpa.'));
            }
        })

        it('should throw error - wrong property param', function()
        {
            var _parent = {algumaInfoAqui: 1, OutraInfoAqui: {mais: true}};
            var _wrongParams = ['', 1, false, true, [], {}, function(){}, 1, 0];
            var _withWhat = {};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _lib.emptyProperty(_parent, _wrongParams[i], _withWhat);
                }).toThrow(new Error('A propriedade em questão não é válida para ser esvaziada.'));
            }
        })

        it('should emptyProperty correctly', function()
        {
            var _params = ['', 0, {}, [], function(){}, false, 'abc', 'nothing to see here', '...', new Date()];

            var _parent = {propriedade: 'preenchida'};
            var _propriedade = 'propriedade';

            for (var i = 0; i < _params.length; i++)
            {
                _lib.emptyProperty(_parent, _propriedade, _params[i])
                expect(_parent.propriedade).toEqual(_params[i]);
            }
        })
    })
})