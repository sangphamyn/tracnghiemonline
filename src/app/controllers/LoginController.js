const db = require('../../database');

class LoginController {

  index(req, res) {
    if (req.session.logged == true) res.redirect('/');
    else res.render("login");
  }

  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // Admin
    let sql1 = 'SELECT * FROM Admin WHERE username = ? AND password = ?';
    db.query(sql1, [username, password], (err, data, fields) => {
      if (err) throw err
      if (data.length > 0) {
        req.session.logged = true;
        req.session.role = 'Admin';
        req.session.name = data[0].name;
        req.session.isAdmin = true;
        req.session.isTeacher = false;
        req.session.isHeadTeacher = false;
        req.session.student = false;
        res.redirect('/admin');
      }
    })
    // Giao vien
    let sql2 = 'SELECT * FROM GiaoVien WHERE username = ? AND password = ?';
    db.query(sql2, [username, password], (err, data, fields) => {
      if (err) throw err;
      if (data.length > 0) {
        let sql3 = `SELECT MH_name FROM monhoc WHERE MH_id = '${data[0].MH_id}'`;
        db.query(sql3, (err, results) => {
          if (err) throw err;

          req.session.monhoc = results[0].MH_name;
          req.session.monhoc_id = data[0].MH_id;
          req.session.gv_id = data[0].GV_ma;
          req.session.logged = true;
          req.session.role = 'GiaoVien';
          req.session.isHeadTeacher = data[0].isHeadTeacher;
          req.session.name = data[0].GV_name;
          req.session.isAdmin = false;
          req.session.isTeacher = true;
          req.session.student = false;
          res.redirect('/');
        })
      }
    })

    // Hoc sinh
    let sql = 'SELECT * FROM HocSinh WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, data, fields) => {
      if (err) throw err
      if (data.length > 0) {
        req.session.logged = true;
        req.session.role = 'HocSinh';
        req.session.name = data[0].name;
        req.session.hocsinh_ma = data[0].HS_ma;
        req.session.isAdmin = false;
        req.session.isTeacher = false;
        req.session.isHeadTeacher = false;
        req.session.isStudent = true;
        res.redirect('/');
      }
      else {
        res.render('login', { alertMsg: "* Sai tên đăng nhập hoặc mật khẩu" });
      }
    })
  }
}

module.exports = new LoginController;