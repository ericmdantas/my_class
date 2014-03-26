"use strict";

var myClass = angular.module('myClass', ['ngRoute', 'ngResource'])
                     .config(configuration.routes)
                     .config(configuration.interceptors)
                     .factory('pageConfig', services.pageConfig)
                     .factory('lib_frontend', services.lib)