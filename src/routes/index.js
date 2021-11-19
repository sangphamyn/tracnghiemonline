const loginRouter = require('./loginRoute');
const homeRouter = require('./homeRoute');
const adminRouter = require('./adminRoute');
const gvRouter = require('./gvRoute');
const hsRouter = require('./hsRoute');
var session = require('express-session');

function route(app) {
  app.use(session({ 
      secret: '123456cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 7200000 }
  }))
  app.use('/login', loginRouter);
  app.use('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  })
  app.use('/admin', adminRouter);
  app.use('/gv', gvRouter);
  app.use('/hs', hsRouter);
  app.use('/:slug', (req, res) => {
    res.redirect('/');
  });
  app.use('/', homeRouter);
}
module.exports = route;
