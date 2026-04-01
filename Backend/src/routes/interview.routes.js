const {Router}=require('express')
const authMiddleware=require('../middleware/auth.middleware')
const upload=require('../middleware/file.middleware')
const interviewController=require('../controllers/interview.controller')
const interviewRouter=Router()
/**
 * @route post/api/interview
 * @description generate new interview
 * @access private
 */

interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"), interviewController.generateInterviewReportController)


/**
 * @route get/api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportByIdController)


/**
 * @route get/api/interview/
 * @description get all interview report 
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



module.exports=interviewRouter