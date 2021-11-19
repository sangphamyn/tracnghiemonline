
class HomeController {

  index(req, res) {
    if(req.session.logged)
      res.render('home', {
        name: req.session.name,
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        isTeacher: req.session.isTeacher,
        isHeadTeacher: req.session.isHeadTeacher,
        isStudent: req.session.isStudent,
        gvMon: req.session.monhoc
      })
    else res.redirect('/login');
  }

}

module.exports = new HomeController;