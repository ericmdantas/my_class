"use strict";

describe('Payment', function()
{
    var _Payment;
    var _paymentInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _Payment = $injector.get('Payment');
        _paymentInstance = new _Payment();
    }))

    describe('isNew', function()
    {
        it('should return false, object is not new', function()
        {
            _paymentInstance._id = 'a123';
            expect(_paymentInstance.isNew()).toBeFalsy();
        })

        it('should return true, object is new', function()
        {
            expect(_paymentInstance.isNew()).toBeTruthy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true', function()
        {
            expect(_paymentInstance.isInvalid()).toBeTruthy();
        })

        it('should return false', function()
        {
            _paymentInstance.name = 'Aluno';
            _paymentInstance.paymentMonth = 'January';
            _paymentInstance.amountPaid = 123.00;
            _paymentInstance.paidWithWhat = 'Moni';

            expect(_paymentInstance.isInvalid()).toBeFalsy();
        })
    })
})