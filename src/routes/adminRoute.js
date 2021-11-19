let express = require('express');
let db = require('../database')
let router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/qlgv', adminController.qlgv);
router.post('/qlgv', adminController.themgiaovien);

router.get('/qllh/:slug', adminController.lh);
router.get('/qllh', adminController.qllh);
router.post('/qllh', adminController.themlophoc);

router.get('/qlhs', adminController.qlhs);
router.post('/qlhs', adminController.themhocsinh);

router.get('/:slug', (req, res) => {
  res.redirect('/');
});
router.get('/', adminController.index);
module.exports = router;