
const db = require('../../database');
class AdminController {

  index(req, res) {
    if (req.session.isAdmin)
      res.render('home', {
        name: req.session.name,
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        isTeacher: req.session.isTeacher,
        isHeadTeacher: req.session.isHeadTeacher,
        isStudent: req.session.isStudent
      });
    else res.redirect('/');
  }

  qlgv(req, res) {
    if (req.session.isAdmin) {
      let sql = "SELECT * FROM giaovien, monhoc WHERE giaovien.MH_id = monhoc.MH_id";
      var kq;
      db.query(sql, (err, results) => {
        if (err) throw err;
        kq = results;

        let sql1 = "SELECT * FROM monhoc";
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;

          res.render('qlgv', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,
  
            dsgiaovien: kq,
            dsmonhoc: kq1
          })
        })
      })
    }
    else res.redirect('/');
  }

  qllh(req, res) {
    if (req.session.isAdmin) {
      let sql = "SELECT * FROM lophoc";
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = "SELECT * FROM giaovien";
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          res.render('qllh', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,
  
            dslophoc: kq,
            dsgiaovien: kq1
          })
        })
      })
    }
    else res.redirect('/');
  }

  lh(req, res) {
    if (req.session.isAdmin) {
      var slug = req.params.slug;
      let sql = `SELECT LH_name FROM lophoc WHERE id = ${slug}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let tenlop = results[0].LH_name;
        let sql1 = `SELECT * FROM hocsinh WHERE HS_lop = '${tenlop}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq = results;

          res.render('qlhs', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,

            dshocsinh: kq
          })
        })
      })
    }
    else res.redirect('/');
  }

  qlhs(req, res) {
    if (req.session.isAdmin) {
      let sql = "SELECT * FROM hocsinh";
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = "SELECT * FROM lophoc";
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          
          res.render('qlhs', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,

            dshocsinh: kq,
            dslop: kq1
          })
        })
      })
    }
    else res.redirect('/');
  }
  
  themgiaovien(req, res) {
    let name = req.body.name;
    let monhoc = req.body.monhoc;
    let isHead = (req.body.isHead == 'on') ? 1 : 0;
    let sql1 = "SELECT * FROM giaovien";
    if (monhoc == 'Môn' || name == '') {
      res.render('error_nhapthieu', {
        name: req.session.name,
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        isTeacher: req.session.isTeacher,
        isHeadTeacher: req.session.isHeadTeacher,
        isStudent: req.session.isStudent,
      })
    }
    else {
      db.query(sql1, (err, results) => {
        if (err) throw err;
        let ma;
        if (results.length == 0)
          ma = 1;
        else 
          ma = results[results.length - 1].id + 1;
        ma = `GV${ma}`;
        
        let sql = `INSERT INTO giaovien(GV_ma, username, password, GV_name, MH_id, isHeadTeacher) VALUES ('${ma}', '${ma.toLowerCase()}', '${ma.toLowerCase()}', '${name}', '${monhoc}', ${isHead})`;
        db.query(sql, (err, results) => {
          if (err) throw err;
        })
      })
      res.redirect('/admin/qlgv');
    }
  }

  themlophoc(req, res) {
    let name = req.body.name;
    let giaovien = req.body.giaovien;
    let sql = `INSERT INTO lophoc(LH_name, LH_giaovien) VALUES ('${name}', '${giaovien}')`;
    if (giaovien == 'Giáo viên chủ nhiệm' || name == '') {
      res.render('error_nhapthieu', {
        name: req.session.name,
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        isTeacher: req.session.isTeacher,
        isHeadTeacher: req.session.isHeadTeacher,
        isStudent: req.session.isStudent,
      })
    } else {
      db.query(sql, (err, results) => {
        if (err) throw err;
      })
      res.redirect('/admin/qllh');
    }
  }

  themhocsinh(req, res) {
    let name = req.body.name;
    let lop = (req.body.lop == "Lớp") ? '' : req.body.lop;
    let sql = "SELECT * FROM hocsinh";
    db.query(sql, (err, results) => {
      let ma, sql1;
      if(results.length == 0)
        ma = 1;
      else
        ma = results[results.length - 1].id + 1;
      ma = `HS${ma}`;

      if (lop == '')
        sql1 = `INSERT INTO hocsinh(HS_ma, username, password, name) VALUES ('${ma}','${ma}', '${ma}', '${name}')`;
      else
        sql1 = `INSERT INTO hocsinh(HS_ma, username, password, name, HS_lop) VALUES ('${ma}','${ma}', '${ma}', '${name}', '${lop}')`;
      db.query(sql1, (err, results) => {
        if (err) throw err;
        let sql2 = `UPDATE lophoc SET LH_sothanhvien = LH_sothanhvien + 1 WHERE LH_name = '${lop}'`;
        db.query(sql2, (err, results) => {
          if (err) throw err;
        })
      })
    })
    res.redirect('/admin/qlhs');
  }

}

module.exports = new AdminController;