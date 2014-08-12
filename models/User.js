"use strict";

(function(mongoose, userSchema)
{
    var User = mongoose.model("User", userSchema);

    module.exports = User;

}(require('mongoose'),
  require('../schemas/UserSchema').userSchema))