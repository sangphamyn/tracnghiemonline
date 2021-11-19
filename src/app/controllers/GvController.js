const db = require('../../database');
class GvController {

  index(req, res) {
    res.render('home', {
      name: req.session.name,
      isLogged: req.session.logged,
      isAdmin: req.session.isAdmin,
      isTeacher: req.session.isTeacher,
      isHeadTeacher: req.session.isHeadTeacher,
      isStudent: req.session.isStudent,
      gvMon: req.session.monhoc,
    });
  }

  qlch(req, res) {
    let sql = `SELECT * FROM cauhoi, chude, dokho, giaovien WHERE cauhoi.MH_id = '${req.session.monhoc_id}' AND cauhoi.CD_id = chude.CD_id AND cauhoi.DK_id = dokho.DK_id AND cauhoi.GV_ma = giaovien.GV_ma`;
    if (req.session.isTeacher) {
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM chude WHERE MH_id = '${req.session.monhoc_id}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          let sql2 = `SELECT * FROM dokho`;
          db.query(sql2, (err, results) => {
            if (err) throw err;
            let kq2 = results;

            res.render('quanlycauhoigiaovien', {
              name: req.session.name,
              isLogged: req.session.logged,
              isAdmin: req.session.isAdmin,
              isTeacher: req.session.isTeacher,
              isHeadTeacher: req.session.isHeadTeacher,
              isStudent: req.session.isStudent,
              gvMon: req.session.monhoc,
      
              dscauhoi: kq,
              dschude: kq1,
              dsdokho: kq2
            })
          })
        })
      })
    }
    else res.redirect('/');
  }

  themcauhoi(req, res) {
    if (req.session.isTeacher) {
      let noidung = req.body.noidung;
      let dapan1 = req.body.dapan1;
      let dapan2 = req.body.dapan2;
      let dapan3 = req.body.dapan3;
      let dapan4 = req.body.dapan4;
      let dapan0 = req.body.dapan0;
      let chude = req.body.chude;
      let dokho = req.body.dokho;
      const d = new Date();
      let thoigiantao = d.toLocaleString();
      if (dapan0 == 'Đáp án đúng' || dokho == 'Độ khó') {
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
        let sql = `INSERT INTO cauhoi(CH_noidung, CH_dapan1, CH_dapan2, CH_dapan3, CH_dapan4, CH_dapandung, CD_id, DK_id, GV_ma, MH_id, CH_thoigiantao)
                  VALUES ('${noidung}', '${dapan1}', '${dapan2}', '${dapan3}', '${dapan4}', ${dapan0}, '${chude}', '${dokho}', '${req.session.gv_id}', '${req.session.monhoc_id}', '${thoigiantao}')`;
        db.query(sql, (err, results) => {
          if (err) throw err;
        })
        res.redirect('/gv/qlch');
      }
    }
    else res.redirect('/');
  }

  nganhangcauhoi(req, res) {
    if (req.session.isHeadTeacher) {
      let sql = `SELECT * FROM cauhoi, chude, dokho, giaovien WHERE 
      cauhoi.MH_id = '${req.session.monhoc_id}' AND cauhoi.CD_id = chude.CD_id AND cauhoi.DK_id = dokho.DK_id AND cauhoi.GV_ma = giaovien.GV_ma AND cauhoi.duyet = 1`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        res.render('nhch', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: true,
          isStudent: req.session.isStudent,
          gvMon: req.session.monhoc,
  
          dscauhoi: kq
        })
      })
    }
    else res.redirect('/');
  }

  dscauhoichoduyet(req, res) {
    if (req.session.isHeadTeacher) {
      let sql = `SELECT * FROM cauhoi, chude, dokho, giaovien WHERE 
      cauhoi.MH_id = '${req.session.monhoc_id}' AND cauhoi.CD_id = chude.CD_id AND cauhoi.DK_id = dokho.DK_id AND cauhoi.GV_ma = giaovien.GV_ma AND cauhoi.duyet = 0`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        res.render('nhch', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: true,
          isStudent: req.session.isStudent,
          gvMon: req.session.monhoc,
  
          dscauhoi: kq
        })
      })
    }
    else res.redirect('/');
  }

  cauhoichoduyet(req, res) {
    if (req.session.isHeadTeacher) {
      let cauhoi_id = req.params.slug;
      let sql = `SELECT * FROM cauhoi, chude, dokho, giaovien WHERE 
      cauhoi.MH_id = '${req.session.monhoc_id}' AND cauhoi.CD_id = chude.CD_id AND cauhoi.DK_id = dokho.DK_id AND cauhoi.GV_ma = giaovien.GV_ma AND cauhoi.CH_id = ${cauhoi_id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results[0];
        res.render('chitietcauhoi', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: true,
          isStudent: req.session.isStudent,
          gvMon: req.session.monhoc,
  
          chitietcauhoi: kq
        })
      })
    }
    else res.redirect('/');
  }

  duyetcauhoi(req, res) {
    if (req.session.isHeadTeacher) {
      let cauhoi_id = req.params.slug;
      let sql = `UPDATE cauhoi SET duyet = 1 WHERE CH_id = ${cauhoi_id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;

        res.redirect('/gv/qlchcd');
      })
    }
    else res.redirect('/');
  }

  cauhoitheochude(req, res) {
    if (req.session.isHeadTeacher) {
      let chude_id = req.params.slug;
      let sql = `SELECT * FROM cauhoi, dokho, giaovien WHERE CD_id = '${chude_id}' AND cauhoi.DK_id = dokho.DK_id AND cauhoi.GV_ma = giaovien.GV_ma`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM chude WHERE CD_id = '${chude_id}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results[0];
          res.render('cauhoitheochude', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: true,
            isStudent: req.session.isStudent,
            gvMon: req.session.monhoc,
    
            dscauhoi: kq,
            chude: kq1
          })
        })
      })
    }
    else res.redirect('/');
  }
  cauhoitheodokho(req, res) {
    if (req.session.isHeadTeacher) {
      let dokho_id = req.params.slug;
      let sql = `SELECT * FROM cauhoi, chude, giaovien WHERE cauhoi.MH_id = '${req.session.monhoc_id}' AND cauhoi.DK_id = '${dokho_id}' AND cauhoi.CD_id = chude.CD_id AND cauhoi.GV_ma = giaovien.GV_ma`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM dokho WHERE DK_id = '${dokho_id}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results[0];
          res.render('cauhoitheodokho', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: true,
            isStudent: req.session.isStudent,
            gvMon: req.session.monhoc,
    
            dscauhoi: kq,
            dokhochude: kq1
          })
        })
      })
    }
    else res.redirect('/');
  }

  quanlydanhsachdethi(req, res) {
    if (req.session.isHeadTeacher) {
      let sql = `SELECT * FROM bode, monhoc WHERE bode.BD_mon = '${req.session.monhoc_id}' AND bode.BD_mon = monhoc.MH_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM chude WHERE MH_id = '${req.session.monhoc_id}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          let sql2 = `SELECT * FROM dokho`;
          db.query(sql2, (err, results) => {
            if (err) throw err;
            let kq2 = results;
            res.render('quanlydanhsachdethi', {
              name: req.session.name,
              isLogged: req.session.logged,
              isAdmin: req.session.isAdmin,
              isTeacher: req.session.isTeacher,
              isHeadTeacher: true,
              isStudent: req.session.isStudent,
              gvMon: req.session.monhoc,
    
              dsdethi: kq,
              dschude: kq1,
              dsdokho: kq2
            })
          })
        })
      })
    }
    else res.redirect('/');
  }
 
  soandethi(req, res) {
    if (req.session.isHeadTeacher) {
      let sql = `SELECT * FROM bode`;
      db.query(sql, (err, results) => {
        if (err) throw err;

        let mabode = 'BD';
        if(results.length == 0)
          mabode += '1';
        else {
          results[results.length - 1].BD_id++;
          mabode += results[results.length - 1].BD_id;
        }
        let tongsocau = 0;
        let count = 1;
        let kt = 0;
        while (eval(`req.body.socau${count}`)) {
          tongsocau += parseInt(eval(`req.body.socau${count}`));
          if (eval(`req.body.chude${count}`) == 'Chủ đề' || eval(`req.body.dokho${count}`) == 'Độ khó') {
            kt = 1;
          }
          count++;
        }
        if (kt == 1) {
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
          let sql2 = `INSERT INTO bode(BD_ma, BD_mon, BD_tongsocau, BD_soluongde) VALUES ('${mabode}', '${req.session.monhoc_id}', ${tongsocau}, ${req.body.sode})`;
          db.query(sql2, (err, results) => {
            if (err) throw err;
            let count = 1;
            var sql1 = `INSERT INTO cauhinhbode(BD_ma, CD_id, DK_id, CHBD_socau) VALUES `;
            while (eval(`req.body.socau${count}`)) {
              sql1 = sql1 + '(\'' + mabode + '\', ' + eval(`req.body.chude${count}`) + ', ' + eval(`req.body.dokho${count}`) + ', ' + eval(`req.body.socau${count}`) + '), ';
              count++;
            }
            sql1 = sql1.slice(0, sql1.length - 2);
            db.query(sql1, (err, results) => {
              if (err) throw err;
              let sql2 = `SELECT * FROM dethi`;
              db.query(sql2, (err, results) => {
                if (err) throw err;
                let kq = results.length;
                let madethi = 0;
                let temp = 0;
                if (kq == 0)
                  madethi += 1;
                else {
                  madethi += results[kq - 1].DT_id + 1;
                }
                temp = madethi;
                let sql3 = `INSERT INTO dethi(DT_ma, BD_ma) VALUES `;
                for (let i = 0; i < req.body.sode; i++) {
                  if (i == req.body.sode - 1) {
                    sql3 = sql3 + '(\'DT' + madethi + '\', \'' + mabode + '\');';
                  }
                  else {
                    sql3 = sql3 + '(\'DT' + madethi + '\', \'' + mabode + '\'), ';
                  }
                  madethi++;
                }
                db.query(sql3, (err, results) => {
                  if (err) throw err;
                  // mabode, mon, tongsocau, soluongde,   chude, dokho, socau,   madethi
                  let chude, dokho, socau;
                  let count1 = 1;
                  let kq2;
                  while (count1 != count) {
                    eval(`chude = req.body.chude${count1}`);
                    eval(`dokho = req.body.dokho${count1}`);
                    eval(`socau = req.body.socau${count1}`);
                    db.query(`SELECT * FROM cauhoi WHERE CD_id = ${chude} AND DK_id = ${dokho} AND duyet = 1`, (err, results) => {
                      if (err) throw err;
                      madethi = temp;
                      kq2 = results;
                      let mangcauhoiid = [],
                      random_cauhoiid = [],
                      i = kq2.length,
                      j = 0,
                      count2,
                      sql5;
                      for (let p = 0; p < req.body.sode; p++) {
                        mangcauhoiid = [],
                        random_cauhoiid = [],
                        i = kq2.length,
                        j = 0;
                        for (let a of kq2) { 
                          mangcauhoiid.push(a.CH_id);
                        }
                        while (i--) {
                          j = Math.floor(Math.random() * (i+1));
                          random_cauhoiid.push(mangcauhoiid[j]);
                          mangcauhoiid.splice(j,1);
                        }
                        count2 = 1;
                        while (count2 != count) {
                          eval(`chude = req.body.chude${count2}`);
                          eval(`dokho = req.body.dokho${count2}`);
                          if (chude == kq2[0].CD_id && dokho == kq2[0].DK_id) {
                            break;
                          }
                          count2++;
                        }
                        eval(`socau = req.body.socau${count2}`);
                        sql5 = `INSERT INTO dethi_cauhoi(CH_id, DT_ma) VALUE `;
                        for (let k = 0; k < socau - 1; k++) {
                          sql5 = sql5 + '(' + random_cauhoiid[k] + ', \'DT' + madethi + '\'), ';
                        }
                        sql5 = sql5  + '(' + random_cauhoiid[socau-1] + ', \'DT' + madethi + '\');';
                        madethi++;
                        db.query(sql5, (err, results) => {
                          if (err) throw err;
                        })
                      }
                    })
                    count1++;
                  }
                  res.redirect('/gv/quanlydanhsachdethi');
                })
              })
            })
          })
        }
      })
    }
    else res.redirect('/');
  }

  chitietbode(req, res) {
    if (req.session.isHeadTeacher) {
      let bode_ma = req.params.slug;
      let sql = `SELECT * FROM cauhinhbode, chude, dokho WHERE cauhinhbode.BD_ma = '${bode_ma}' AND cauhinhbode.CD_id = chude.CD_id AND cauhinhbode.DK_id = dokho.DK_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM dethi WHERE BD_ma = '${bode_ma}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq2 = results;
          res.render('cauhinhbode', {
            name: req.session.name,
            isLogged: req.session.logged,
            isAdmin: req.session.isAdmin,
            isTeacher: req.session.isTeacher,
            isHeadTeacher: true,
            isStudent: req.session.isStudent,
            gvMon: req.session.monhoc,
  
            dscauhinhbode: kq,
            dsdethi: kq2
          })
        })
      })
    }
    else res.redirect('/');
  }

  chitietdethi(req, res) {
    if (req.session.isHeadTeacher) {
      let madethi = req.params.slug;
      let sql = `SELECT * FROM dethi_cauhoi, cauhoi, chude, dokho WHERE DT_ma = '${madethi}' AND dethi_cauhoi.CH_id = cauhoi.CH_id AND cauhoi.CD_id = chude.CD_id AND cauhoi.DK_id = dokho.DK_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        res.render('dscauhoidethi', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: true,
          isStudent: req.session.isStudent,
          gvMon: req.session.monhoc,

          dscauhoi: kq
        })
      })
    }
    else res.redirect('/');
  }

  qlct(req, res) {
    if (req.session.isHeadTeacher) {
      let monhoc_id = req.session.monhoc_id;
      let sql = `SELECT * FROM kithi, monhoc, giaovien WHERE kithi.MH_id = monhoc.MH_id AND kithi.KT_giaoviencoi = giaovien.GV_ma`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        let sql1 = `SELECT * FROM bode WHERE BD_mon = '${monhoc_id}'`;
        db.query(sql1, (err, results) => {
          if (err) throw err;
          let kq1 = results;
          let sql2 = `SELECT * FROM lophoc`;
          db.query(sql2, (err, results) => {
            if (err) throw err;
            let kq2 = results;
            let sql3 = `SELECT * FROM giaovien WHERE isHeadTeacher = 0`;
            db.query(sql3, (err, results) => {
              if (err) throw err;
              let kq3 = results;
              res.render('gvtm_quanlycuocthi', {
                name: req.session.name,
                isLogged: req.session.logged,
                isAdmin: req.session.isAdmin,
                isTeacher: req.session.isTeacher,
                isHeadTeacher: req.session.isHeadTeacher,
                isStudent: req.session.isStudent,
      
                dskithi: kq,
                dsbode: kq1,
                dslop: kq2,
                dsgiaovien: kq3
              })
            })
          })
        })
      })
    }
    else res.redirect('/');
  }

  taokithi(req, res) {
    if (req.session.isHeadTeacher) {
      let name = req.body.name;
      let monhoc = req.session.monhoc_id;
      let bode = req.body.bode;
      let lophoc = req.body.lop;
      let giaovien = req.body.giaovien;
      let thoigian = req.body.time;
      if (bode == 'Bộ đề' || lophoc == 'Lớp tham gia thi' || giaovien == 'Giáo viên coi thi') {
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

        let sql = `INSERT INTO kithi(KT_name, MH_id, BD_ma, LH_name, KT_giaoviencoi, thoigian) VALUES ('${name}', '${monhoc}', '${bode}', '${lophoc}', '${giaovien}', ${thoigian})`;
        db.query(sql, (err, results) => {
          if (err) throw err;
          db.query('SELECT * FROM kithi', (err, results) => {
            if (err) throw err;
            let KT_id = results[results.length - 1].id;
            let sql1 = `SELECT * FROM hocsinh WHERE HS_lop = '${lophoc}'`;
            db.query(sql1, (err, results) => {
              if (err) throw err;
              let kq = results;
              let length = kq.length;
              let sql2 = `SELECT * FROM dethi WHERE BD_ma = '${bode}'`;
              db.query(sql2, (err, results) => {
                if (err) throw err;
                let kq1 = results;
                let sql2 = `INSERT INTO hocsinh_dethi(KT_id, HS_ma, DT_ma) VALUES `;
                let j = 0;
                for (let i = 0; i < length - 1; i++) {
                  sql2 = sql2 + '(' + KT_id + ', \'' + kq[i].HS_ma + '\', \'' + kq1[j].DT_ma + '\'), ';
                  j = i % kq1.length;
                }
                sql2 = sql2 + '(' + KT_id + ', \'' + kq[length - 1].HS_ma + '\', \'' + kq1[(length) % kq1.length].DT_ma + '\');';
                db.query(sql2, (err, results) => {
                  if (err) throw err;
                  res.redirect('/gv/quanlycuocthi');
                })
              })
            })
          }) 
        })
      }
    }
    else res.redirect('/');
  }

  dscoithi(req, res) {
    if (req.session.isTeacher && !req.session.isHeadTeacher) {
      let magiaovien = req.session.gv_id;
      let sql = `SELECT * FROM kithi, monhoc WHERE KT_giaoviencoi = '${magiaovien}' AND kithi.MH_id = monhoc.MH_id`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        res.render('dscoithi', {
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

  chitietcoithi(req, res) {
    if (req.session.isTeacher && !req.session.isHeadTeacher) {
      let magiaovien = req.session.gv_id;
      let kithi_id = req.params.slug;
      let sql = `SELECT * FROM monhoc, hocsinh_dethi, hocsinh, kithi WHERE hocsinh_dethi.KT_id = ${kithi_id} AND kithi.id = hocsinh_dethi.KT_id AND kithi.MH_id = monhoc.MH_id AND hocsinh_dethi.HS_ma = hocsinh.HS_ma`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let kq = results;
        console.log(kq[5].id);
        res.render('gv_chitietcoithi', {
          name: req.session.name,
          isLogged: req.session.logged,
          isAdmin: req.session.isAdmin,
          isTeacher: req.session.isTeacher,
          isHeadTeacher: req.session.isHeadTeacher,
          isStudent: req.session.isStudent,

          dshocsinh: kq
        })
      })
    }
    else res.redirect('/');
  }

  mothi(req, res) {
    if (req.session.isTeacher && !req.session.isHeadTeacher) {
      let kithi_id = req.params.slug;
      let sql = `UPDATE kithi SET mothi = 1 WHERE id = ${kithi_id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(`/gv/dscoithi/${kithi_id}`);
      })
    }
    else res.redirect('/');
  }
  dongthi(req, res) {
    if (req.session.isTeacher && !req.session.isHeadTeacher) {
      let kithi_id = req.params.slug;
      let sql = `UPDATE kithi SET mothi = 0 WHERE id = ${kithi_id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(`/gv/dscoithi/${kithi_id}`);
      })
    }
    else res.redirect('/');
  }

}

module.exports = new GvController;