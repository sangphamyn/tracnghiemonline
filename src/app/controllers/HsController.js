const db = require('../../database');
class HsController {
  index(req, res) {
    if (req.session.isStudent) {
      res.render('home', {
        name: req.session.name,
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        isTeacher: req.session.isTeacher,
        isHeadTeacher: req.session.isHeadTeacher,
        isStudent: req.session.isStudent,
  
      })
    }
    else res.redirect('/');
  }

  dskithi(req, res) {
    if (req.session.isStudent) {
      let hs_ma = req.session.hocsinh_ma;
      let sql = `SELECT * FROM hocsinh, kithi, monhoc WHERE hocsinh.HS_ma = '${hs_ma}' AND hocsinh.HS_lop = kithi.LH_name AND kithi.MH_id = monhoc.MH_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;

        res.render('hs_dskithi', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: req.session.isHeadTeacher,
          isStudent: req.session.isStudent,
          
          dskithi: kq
        })
      })
    }
    else res.redirect('/');
  }

  chitietkithi(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let sql = `SELECT * FROM hocsinh_dethi, monhoc, bode, giaovien, kithi WHERE kithi.id = ${kithi_id} AND kithi.MH_id = monhoc.MH_id AND kithi.BD_ma = bode.BD_ma AND kithi.KT_giaoviencoi = giaovien.GV_ma AND kithi.id = hocsinh_dethi.KT_id AND hocsinh_dethi.HS_ma = '${hocsinh_ma}'`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results[0];
        res.render('hs_chitietkithi', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: req.session.isHeadTeacher,
          isStudent: req.session.isStudent,

          kithi: kq
        })
      })
    }
    else res.redirect('/');
  }
  thamgiathi(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let sql = `SELECT * FROM hocsinh_dethi WHERE KT_id = ${kithi_id} AND HS_ma = '${hocsinh_ma}'`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let dethi_ma = results[0].DT_ma;
        let sql1 = `SELECT * FROM dethi_cauhoi, cauhoi WHERE dethi_cauhoi.DT_ma = '${dethi_ma}' AND dethi_cauhoi.CH_id = cauhoi.CH_id`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq = results;
          res.render('hs_baithi', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,
  
            dscauhoi: kq,
            madethi: dethi_ma
          })
        })
      })
    }
    else res.redirect('/');
  }
  lambaithi(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let sql4 = `SELECT * FROM kithi WHERE id = ${kithi_id}`;
      db.query(sql4, (err, results) => {
        if (err) throw err;
        if (results[0].mothi == 0) {
          res.redirect('./');
        }
        else {
          // Kiểm tra xem học sinh trong kì thi đã bấm bắt đầu làm bài lần nào chưa
          let sql0 = `SELECT * FROM trangthaibaithi WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id}`;
          db.query(sql0, (err, results) => {
            if (err) throw err;
            if (results.length == 0) {
              // Lấy mã đề thi
              let sql = `SELECT * FROM hocsinh_dethi WHERE KT_id = ${kithi_id} AND HS_ma = '${hocsinh_ma}'`;
              db.query(sql, (err, results) => {
                if (err) throw err;
                let dethi_ma = results[0].DT_ma;
                // Lấy thông tin câu hỏi trong đề
                let sql1 = `SELECT * FROM dethi_cauhoi, cauhoi WHERE dethi_cauhoi.DT_ma = '${dethi_ma}' AND dethi_cauhoi.CH_id = cauhoi.CH_id`;
                db.query(sql1, (err, results) => {
                  if (err) throw err;
                  let kq = results;
                  let socauhoi = kq.length;
                  let sql2 = `INSERT INTO trangthaibaithi(HS_ma, KT_id, CH_id, dapan_dung, CH_thutu, dapan_chon) VALUES `;
                  for (let i = 0; i < socauhoi - 1; i++) {
                    sql2 += '(\'' + hocsinh_ma + '\', \'' + kithi_id + '\', ' + kq[i].CH_id + ', ' + kq[i].CH_dapandung + ', ' + (i+1) + ', 0), ';
                  }
                  sql2 += '(\'' + hocsinh_ma + '\', \'' + kithi_id + '\', ' + kq[socauhoi - 1].CH_id + ', ' + kq[socauhoi - 1].CH_dapandung + ', ' + (socauhoi) + ', 0);';
                  db.query(sql2, (err, results) => {
                    if (err) throw err;
                    const d = new Date();
                    let thoigian = d.toLocaleString();
                    let sql3 = `UPDATE hocsinh_dethi SET thoigian_batdau = '${thoigian}' WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id}`;
                    db.query(sql3, (err, results) => {
                      if (err) throw err;
                      res.redirect('lambai/1');
                    })
                  })
                })
              })
            }
            else res.redirect('lambai/1');
          })
        }
      })
    }
    else res.redirect('/');
  }
  cauhoi(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let thutucauhoi = req.params.slug2;      
      

      let sql = `SELECT * FROM trangthaibaithi, cauhoi WHERE trangthaibaithi.HS_ma = '${hocsinh_ma}' AND trangthaibaithi.KT_id = ${kithi_id} AND trangthaibaithi.CH_thutu = ${thutucauhoi} AND trangthaibaithi.CH_id = cauhoi.CH_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results[0];
        // Lấy danh sách câu hỏi
        let sql1 = `SELECT * FROM trangthaibaithi WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id} ORDER BY trangthaibaithi.CH_thutu ASC`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          let length = kq1.length;
          // lấy thời gian bắt đầu thi
          let sql2 = `SELECT * FROM hocsinh_dethi WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id}`;
          db.query(sql2, (err, results) => {
            if (err) throw err;
            if (results[0].nopbai == 1) {
              res.redirect('../ketthuc');
            }
            else {
              let kq2 = results[0].thoigian_batdau;
              // lấy thời gian thi của kì thi
              let sql3 = `SELECT * FROM kithi WHERE id = ${kithi_id}`;
              db.query(sql3, (err, results) => {
                if (err) throw err;
                let kq3 = results[0];
                let d = new Date(kq2);
                let f = kq3.thoigian;
                let e = new Date(d.getTime() + f*60000);
                let g = new Date();
                let timeLeft = Math.floor((e - g) / 1000);
                if (timeLeft <= 0) {
                  res.redirect('../ketthuc');
                }
                e = e.toLocaleString();
                g = g.toLocaleString();

                // Kiểm tra xem kì thi mở hay đóng
                if (kq3.mothi == 0) {
                  res.redirect('../');
                }
                res.render('hs_cauhoi', {
                  name: req.session.name,
                  isLogged: req.session.logged,
                  isAdmin: req.session.isAdmin,
                  isTeacher: req.session.isTeacher,
                  isHeadTeacher: req.session.isHeadTeacher,
                  isStudent: req.session.isStudent,
        
                  cauhoi: kq,
                  dscauhoi: kq1,
                  socauhoi: length,
                  thoigianbatdau: kq2,
                  thoigianketthuc: e,
                  thoigianhientai: g,
                  thoigianthi: f,
                  thoigianconlai: timeLeft
                })
              })
            }
          })
        })
      })
    }
    else res.redirect('/');
  }

  nopcauhoi(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let thutucauhoi = req.params.slug2;

      let answer;
      if (req.body.answerSelect1 == 'on')
        answer = 1;
      else if (req.body.answerSelect2 == 'on')
        answer = 2;
      else if (req.body.answerSelect3 == 'on')
        answer = 3;
      else if (req.body.answerSelect4 == 'on')
        answer = 4;
      else
        answer = 0;
      
      let sql = `UPDATE trangthaibaithi SET dapan_chon = ${answer} WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id} AND CH_thutu = ${thutucauhoi}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('#');
      })
    }
    else res.redirect('/');
  }

  hetgio(req, res) {
    if (req.session.isStudent) {
      let kithi_id = (req.params.slug).slice(5);
      let hocsinh_ma = req.session.hocsinh_ma;
      let sql = `SELECT * FROM trangthaibaithi WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let socauhoi = results.length;
        let count = 0;
        for (let a of results) {
          if (a.dapan_dung == a.dapan_chon)
            count++;
        }
        let diem = (10 / socauhoi) * count;
        diem *= 10;
        diem = Math.round(diem);
        diem /= 10;
        let sql1 = `UPDATE hocsinh_dethi SET diem = ${diem}, nopbai = 1 WHERE HS_ma = '${hocsinh_ma}' AND KT_id = ${kithi_id}`;
        db.query(sql1, (err, results) => {
          if (err) throw err;

          res.render('hs_hetgio', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: req.session.isHeadTeacher,
            isStudent: req.session.isStudent,
            
            socauhoi: socauhoi,
            socaudung: count,
            diem: diem
          })
        })
      })
    }
    else res.redirect('/');
  }
  diemcanhan(req, res) {
    if (req.session.isStudent) {
      let hocsinh_ma = req.session.hocsinh_ma;
      let sql = `SELECT * FROM hocsinh_dethi, kithi, monhoc WHERE hocsinh_dethi.HS_ma = '${hocsinh_ma}' AND hocsinh_dethi.KT_id = kithi.id AND kithi.MH_id = monhoc.MH_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;

        res.render('hs_diemcanhan', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: req.session.isHeadTeacher,
          isStudent: req.session.isStudent,
          
          dskithi: kq
        })
      })
    }
    else res.redirect('/');
  }
  // (req, res) {
  //   if (req.session.isStudent) {

  //   }
  //   else res.redirect('/');
  // }
}
module.exports = new HsController;