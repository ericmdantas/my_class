"use strict";

myClass.factory('Student', ['lib', function(lib)
{
    var DEFAULT_OBJECT =
    {
        _id : null,
        name : null,
        birthDate : null,
        email: null,
        phone: null,
        class: null,
        mobilePhone: null,
        availability: null,
        contract: null,
        contractDate: null,
        address: null,
        status: null
    }

    var Student = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    Student.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid : function()
        {
            return (lib.isStringInvalid(this.name) || lib.isStringInvalid(this.birthDate));
        },

        normalizeStudent : function(aluno)
        {
            if (lib.isObjectInvalid(aluno))
                throw new Error('Não é possível normalizar o aluno passado, pois o mesmo não é válido.');

            aluno.class = aluno.class ? aluno.class.name : '';
            aluno.status = aluno.status ? aluno.status.nome : '';
            aluno.contract = aluno.contract ? aluno.contract.nome : '';

            return aluno;
        }
    }

    return Student;
}])