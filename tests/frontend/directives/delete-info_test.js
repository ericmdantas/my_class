"use strict";

describe('DELETE-INFO BEING TESTED', function()
{
    var scope, element, compile;

    beforeEach(inject(function($injector)
    {
        compile = $injector.get('$compile');
        scope = $injector.get('$rootScope').$new();

        var html = '<div class="modal fade" id="{{directiveid}}">'+
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
                    '</div>';

        element = compile(angular.element(html))(scope);
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if delete info was created', function()
        {
            expect(element).toBeDefined();
        })

        it('checks if element is populated', function()
        {

            expect(element.text()).toContain('Tem certeza que deseja excluir');
        })

        it('finds exclusão', function()
        {
            //scope.directiveid = 'a'
            //console.log(element.isola().directiveid);
            //expect(element.toContain('Exclusão')).toBe(true);
        })
    })
})