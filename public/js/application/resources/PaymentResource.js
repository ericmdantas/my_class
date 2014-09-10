"use strict";

myClass
    .factory('PaymentResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'students/payments/:studentName/:month/:amount';
        var _params = {studentName: '@studentName', month: '@month', amount: '@amount'};
        var _methods = {};

        return $resource(_url, _params, _methods);
    }])
    .service('PaymentService', ['$q', 'lib', 'PaymentResource', 'Payment', function($q, lib, PaymentResource, Payment)
    {
        var _getAll = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(payments)
            {
                var _payments = [];

                angular.forEach(payments, function(payment)
                {
                    _payments.push(new Payment(payment));
                })

                deferred.resolve(_payments);
            }

            var _onError = function(error)
            {
                deferred.resolve(error);
            }

            PaymentResource
                .query()
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(payment)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(payment))
            {
                deferred.reject(new Error('Não é possível realizar o pagamento. Objeto inválido.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            PaymentResource
                .save(payment)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        var _remove = function(payment)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(payment))
            {
                deferred.reject(new Error('Não é possível remover o pagamento. Objeto informado é inválido.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            PaymentResource
                .remove(payment)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        this.getAll = _getAll;
        this.save = _save;
        this.remove = _remove;
    }])