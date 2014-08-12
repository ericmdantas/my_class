"use strict";

(function(mongoose)
{
    var _dailyInformation = mongoose.Schema
    ({
        day: {type: String, trim: true, required: true, index: true},
        monthYear: {type: String, trim: true, required: true, index: true},
        teacherName: {type: String, trim: true, required: true},
        subject: {type: String, trim: true, required: true},
        studentByDay: [{
            name: {type: String, trim: true},
            wasInClass: {type: Boolean, required: true}
        }]
    })

    var _clazzSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true, index: true},
        students: [{type: String, trim: true, required: true}],
        time: {type: String, required: true},
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: [],
        dailyInfo: [_dailyInformation]
    });

    exports.clazzSchema = _clazzSchema;

}(require('mongoose')))