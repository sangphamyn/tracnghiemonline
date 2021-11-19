let express = require('express');
let router = express.Router();

let hsController = require('../app/controllers/HsController');

router.post('/dskithi/:slug/lambai/:slug2', hsController.nopcauhoi);
router.get('/dskithi/:slug/lambai/:slug2', hsController.cauhoi);

router.get('/dskithi/:slug/lambai', hsController.lambaithi);
router.get('/dskithi/:slug/ketthuc', hsController.hetgio);
// router.get('/dskithi/:slug/:slug1', hsController.thamgiathi);
router.get('/dskithi/:slug', hsController.chitietkithi);
router.get('/dskithi', hsController.dskithi);

router.get('/diemcanhan', hsController.diemcanhan);
router.get('/', hsController.index);

module.exports = router;