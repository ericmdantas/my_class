"use strict";

describe('DELETE-INFO BEING TESTED', function()
{
    var _scope, _element, _compile;

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<delete-info directiveid="modal-delete-class" ' +
                                 'title="turma" ' +
                                 'objectname="{{turmaEscolhida.name}}" ' +
                                 'objectid="{{turmaEscolhida._id}}" ' +
                                 'delete="deleteClass(id)">'+
                    '</delete-info>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if delete info was created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('checks if the key words are being filled', function()
    {
        it('should behave correctly on click', function()
        {
            _element.click();
        })
    })
})