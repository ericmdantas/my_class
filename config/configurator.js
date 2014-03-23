(function()
{
    function configure(application, exp, passport, dir)
    {
        application.use(exp.static(dir + '/public'));
        application.use(exp.logger());
        application.use(exp.bodyParser());
        application.use(exp.cookieParser('112233'));
        application.use(exp.session({secret: 'somethingthatshouldbeasecr3t'}));
        application.use(passport.initialize());
        application.use(passport.session());
        application.use(exp.favicon(dir+'/public/img/favicon.ico'));
    }

    exports.me = configure;
}())