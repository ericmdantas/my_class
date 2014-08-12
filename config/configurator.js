(function(morgan, bodyParser, cookieParser, expressSession)
{
    function configure(dir, application, exp, passport)
    {
        application.use(exp.static(dir + '/public'));
        application.use(morgan('dev'));
        application.use(bodyParser());
        application.use(cookieParser('112233'));
        application.use(expressSession({secret: 'somethingthatshouldbeasecr3t'}));
        application.use(passport.initialize());
        application.use(passport.session());
    }

    exports.me = configure;
}(require('morgan'),
  require('body-parser'),
  require('cookie-parser'),
  require('express-session')))