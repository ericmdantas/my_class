"use strict";

myClass.directive('deleteInfo', function()
{
    var _temp = '<div class="modal fade" id="{{directiveid}}">'+
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
                                '<button type="button" class="btn btn-default" id="to-be-deleted" ng-click="delete({id: objectid})" data-dismiss="modal">sim, excluir</button>'+
                                '<button type="button" class="btn btn-link" data-dismiss="modal">não, cancelar ação</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';

    return {
                restrict: 'EA',
                template: _temp,
                scope: {
                            directiveid: '@',
                            title: '@',
                            objectid: '@',
                            objectname: '@',
                            delete: '&'
                       }
           }
})