const {Router} = require("express");

const authController = require('../controllers/authControllers');
const { checkuser, requireAuth } = require("../middlewares/authmiddleware");

const router = Router();

router.get('*',checkuser);

router.get('/',authController.home);

router.get('/signup',authController.signup_get);

router.get('/login',authController.login_get);

router.get('/order',requireAuth ,authController.order);

router.get('/secret', requireAuth, authController.secret);

router.get('/logout',authController.logout);

router.post('/signup',authController.signup_post);

router.post('/login',authController.login_post);


///menu orders
router.get('/breakfast',authController.breakfast);

router.get('/lunch',authController.lunch);

router.get('/dinner',authController.dinner);


module.exports = router;