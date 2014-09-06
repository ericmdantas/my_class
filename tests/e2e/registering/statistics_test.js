"use strict";

var helper = require('../helper');

describe('statistics', function()
{
    beforeEach(function()
    {
        helper.goTo('estatisticas');
    })

    describe('payment', function()
    {
        it('should check if the arrecadação por trimestre is visible', function()
        {
            expect($('#column-chart .highcharts-container').isPresent()).toBeTruthy();
        })

        it('should check if interessados por mês is visible', function()
        {
            expect($('#pie-chart .highcharts-container').isPresent()).toBeTruthy();
        })
    })
})