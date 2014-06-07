"use strict";

var myClass = angular.module('myClass', ['ngRoute'])
                     .config(configuration.routes)
                     .config(configuration.interceptors)
                     .constant('inputMaxLength',
                     {
                         TAMANHO_CAMPO_NOME: "80",
                         TAMANHO_CAMPO_ENDERECO: "100",
                         TAMANHO_CAMPO_EMAIL: "60",
                         TAMANHO_CAMPO_QUANTIA: "12",
                         TAMANHO_CAMPO_TELEFONE: "25",
                         TAMANHO_CAMPO_DATA: "10",
                         TAMANHO_CAMPO_HORARIO: "22",
                         TAMANHO_CAMPO_QUANTIDADE: "3"
                     })
                     .constant('contractsTypes',
                     [
                         {nome:"quinzenal"},
                         {nome: "mensal"},
                         {nome: "trimestral"},
                         {nome: "semestral"}
                     ])
                     .constant('months',
                     [
                        {nome: "Janeiro", numero: 1},
                        {nome: "Fevereiro", numero: 2},
                        {nome: "Março", numero: 3},
                        {nome: "Abril", numero: 4},
                        {nome: "Maio", numero: 5},
                        {nome: "Junho", numero: 6},
                        {nome: "Julho", numero: 7},
                        {nome: "Agosto", numero: 8},
                        {nome: "Setembro", numero: 9},
                        {nome: "Outubro", numero: 10},
                        {nome: "Novembro", numero: 11},
                        {nome: "Dezembro", numero: 12}
                     ])
                     .constant('studentStatus',
                     [
                         {nome: "interessado"},
                         {nome: "matriculado"},
                         {nome: "desistente"},
                         {nome: "outro"}
                     ])
                     .factory('pageConfig', services.pageConfig)