"use strict";

var helper = require('../helper');

describe('route changes', function()
{
    browser.get('#');
    helper.login();
    
    describe('navigation - main page (cards)', function()
    {
        beforeEach(function()
        {
            helper.goTo('main');
        })

        it('should navigate correctly to aulas', function()
        {
            $('#aulas-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('aulas');
                    expect(browser.getCurrentUrl()).toContain('aulas');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to turmas', function()
        {
            $('#turmas-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('turmas');
                    expect(browser.getCurrentUrl()).toContain('turmas');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to professores', function()
        {
            $('#professores-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('professores');
                    expect(browser.getCurrentUrl()).toContain('professores');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to alunos', function()
        {
            $('#alunos-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('alunos');
                    expect(browser.getCurrentUrl()).toContain('alunos');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to livros', function()
        {
            $('#livros-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('livros');
                    expect(browser.getCurrentUrl()).toContain('livros');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to pagamentos', function()
        {
            $('#pagamentos-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('pagamentos');
                    expect(browser.getCurrentUrl()).toContain('pagamentos');
                    helper.goTo('main');
                })
        })

        it('should navigate correctly to estatisticas', function()
        {
            $('#estatisticas-container')
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('estatisticas');
                    expect(browser.getCurrentUrl()).toContain('estatisticas');
                    helper.goTo('main');
                })
        })
    })

    describe('navigation - header', function()
    {
        it('should navigate correctly to aulas', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(0)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('aulas');
                    expect(browser.getCurrentUrl()).toContain('aulas');
                })
        })

        it('should navigate correctly to turmas', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(1)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('turmas');
                    expect(browser.getCurrentUrl()).toContain('turmas');
                })
        })

        it('should navigate correctly to professores', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(2)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('professores');
                    expect(browser.getCurrentUrl()).toContain('professores');
                })
        })

        it('should navigate correctly to alunos', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(3)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('alunos');
                    expect(browser.getCurrentUrl()).toContain('alunos');
                })
        })

        it('should navigate correctly to livros', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(4)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('livros');
                    expect(browser.getCurrentUrl()).toContain('livros');
                })
        })

        it('should navigate correctly to pagamentos', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(5)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('pagamentos');
                    expect(browser.getCurrentUrl()).toContain('pagamentos');
                })
        })

        it('should navigate correctly to estatisticas', function()
        {
            element
                .all(by.css('.nav.navbar-nav .activable'))
                .get(6)
                .click()
                .then(function()
                {
                    expect(browser.getTitle()).toContain('estatisticas');
                    expect(browser.getCurrentUrl()).toContain('estatisticas');
                })
        })
    })
})