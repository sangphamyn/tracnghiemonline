let express = require('express');
let router = express.Router();
let db = require('../database');

let gvController = require('../app/controllers/GvController');

router.get('/qlch', gvController.qlch);
router.post('/qlch', gvController.themcauhoi);
router.get('/ctch/:slug', gvController.cauhoichoduyet);
router.get('/qlnhch', gvController.nganhangcauhoi);
router.get('/qlchcd', gvController.dscauhoichoduyet);
router.get('/quanlydanhsachdethi/:slug', gvController.chitietbode);
router.get('/quanlydanhsachdethi', gvController.quanlydanhsachdethi);
router.post('/quanlydanhsachdethi', gvController.soandethi);
router.get('/duyet/:slug', gvController.duyetcauhoi);
router.get('/cd/:slug', gvController.cauhoitheochude);
router.get('/dk/:slug', gvController.cauhoitheodokho);
router.get('/dethi/:slug', gvController.chitietdethi);

router.get('/quanlycuocthi', gvController.qlct);
router.post('/quanlycuocthi', gvController.taokithi);

router.get('/dscoithi/:slug/1', gvController.mothi);
router.get('/dscoithi/:slug/0', gvController.dongthi);
router.get('/dscoithi/:slug', gvController.chitietcoithi);
router.get('/dscoithi', gvController.dscoithi);

router.get('/:slug', gvController.index);
module.exports = router;