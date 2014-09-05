"use strict";

(function(mongoose)
{
    var _teacherSchema = mongoose.Schema
    ({
        name:           {type: String, trim: true, required: true, index: true},
        birthDate:      {type: String, trim: true, required: true},
        address:        {type: String, trim: true, required: true},
        salary:         {type: Number, required: true},
        admission:      {type: String, trim: true},
        availability:   {type: String, trim: true},
        email:          {type: String, trim: true},
        mobilePhone:    {type: String, trim: true},
        phone:          {type: String, trim: true},
        registered:     {type: Date, default: new Date},
        lastModified:   {type: Date},
        usersAllowed: []
    });

    exports.teacherSchema = _teacherSchema;

}(require('mongoose')))