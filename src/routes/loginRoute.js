let express = require('express');
const session = require('express-session');
let db = require('../database');
let router = express.Router();

let loginController = require('../app/controllers/LoginController');

router.get('/', loginController.index);
router.post('/', loginController.login);

module.exports = router;
