"use strict";

describe('DELETE-INFO BEING TESTED', function()
{
    var _scope, _element, _compile;

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<delete-info directiveid="modal-delete-class" title="turma" objectname="{{turmaEscolhida.name}}" objectid="{{turmaEscolhida._id}}" delete="deleteClass(id)">'+
                        '<div class="modal fade" id="{{directiveid}}">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                                        '<h4 class="modal-title">Exclusão de {{title}}</h4>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<p>Tem certeza que deseja excluir {{objectname}}?</p>'+
                                        '<p>Esta ação é <strong>irreversível</strong>.</p>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<button type="button" class="btn btn-default" ng-click="delete({id: objectid})" data-dismiss="modal">sim, excluir</button>'+
                                        '<img src="img/loading.gif" ng-show=isLoadingVisible.modal />'+
                                        '<button type="button" class="btn btn-link" data-dismiss="modal">não, cancelar ação</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
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

        it('checks if element is populated', function()
        {
            expect(_element.text()).toContain('Tem certeza que deseja excluir');
        })
    })

    describe('checks if the key words are being filled', function()
    {
        //TODO: ADD TESTS FOR THE ISOLATED SCOPE
    })
})