const {Router}=require('express')
const authController=require('../controllers/auth.controller')
const authRouter=Router();
const authMiddleware=require('../middleware/auth.middleware')

/**
 * @route post  /api/auth/register
 * @description Register new user
 * @access public
 */
 authRouter.post('/register',authController.registerUserController)


 /**
 * @route post  /api/auth/login
 * @description login  user with email  and password
 * @access public
 */

 authRouter.post("/login",authController.loginUserController)


  /**
 * @route get  /api/auth/logout
 * @description logout  user with email  and password
 * @access public
 */

  authRouter.get("/logout",authController.logoutUserController)

  /**
 * @route GET  /api/auth/get-me
 * @description get the current logged in  user details
 * @access private
 */

  authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports=authRouter;
