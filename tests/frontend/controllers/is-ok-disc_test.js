"use strict";

describe('isOkDisc being tested', function()
{
    var element, html, compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        compile = $injector.get('$compile');
        html = '<is-ok-disc><span class="is-ok-disc"></span></is-ok-disc>'
    }))
})