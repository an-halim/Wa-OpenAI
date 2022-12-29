const auth = require('../controllers/auth');
const app = require('express');
const router = app.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/verify', auth.verify);

module.exports = router;