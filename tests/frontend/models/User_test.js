"use strict";

describe('User', function()
{
    var _User;
    var _userInstance;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _User = $injector.get('User');
        _userInstance = new _User();
    }))

    describe('creation', function()
    {
        it('should have the right properties', function()
        {
            expect(_userInstance.username).toBeNull();
            expect(_userInstance.password).toBeNull();
            expect(_userInstance.payment).toBeFalsy();
            expect(_userInstance.type).toBeNull();
        })
    })

    describe('isNew', function()
    {
        it('should return false', function()
        {
            _userInstance._id = 'a123';
            expect(_userInstance.isNew()).toBeFalsy();
        })

        it('should return true', function()
        {
            expect(_userInstance.isNew()).toBeTruthy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true', function()
        {
            expect(_userInstance.isInvalid()).toBeTruthy();
        })

        it('should return false', function()
        {
            _userInstance.username = 'eric';
            _userInstance.password = 'abc123';

            expect(_userInstance.isInvalid()).toBeFalsy();
        })
    })
})