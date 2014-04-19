"use strict";

var myClass = angular.module('myClass', ['ngRoute'])
                     .config(configuration.routes)
                     .config(configuration.interceptors)
                     .factory('pageConfig', services.pageConfig)