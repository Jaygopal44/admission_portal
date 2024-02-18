const express = require('express')
const UserController = require('../controllers/UserController')
const FrontendController = require('../controllers/FrontendController')
const CourseController = require('../controllers/CourseController')
const router = express.Router()
const checkuserauth = require('../middleware/auth')
const isLogin = require('../middleware/islogin')
const AdminController = require('../controllers/admin/AdminController')




// Frontend Controller
router.get('/',isLogin,FrontendController.login)
router.get('/register',FrontendController.register)
router.get('/dashboard',checkuserauth,FrontendController.dashboard)
router.get('/about',checkuserauth,FrontendController.about)
router.get('/contact',checkuserauth,FrontendController.contact)
router.post('/userInsert',FrontendController.userinsert)
router.post('/verifylogin',FrontendController.verifylogin)
router.get('/logout',FrontendController.logout)
router.get('/user_profile',checkuserauth,FrontendController.UserProfile)
// router.post('/change_password',checkuserauth,FrontendController.ChangePassword)
router.post('/change_pass',checkuserauth,FrontendController.ChangePassword)



// Course Controller
router.post('/course-insert',checkuserauth,CourseController.CourseInsert)
router.get('/course/display',checkuserauth,CourseController.courseDisplay)
router.get('/courseview/:id',checkuserauth,CourseController.CourseDetailes)
router.get('/courseedit/:id',checkuserauth,CourseController.CourseEdit)
router.post('/courseUpdate/:id',checkuserauth,CourseController.CourseUpdate)
router.get('/userdelete/:id',checkuserauth,CourseController.UserDelete)
router.post('/change_userp',checkuserauth,CourseController.ChangeUserProfile)

// Admin controller

router.get('/adminview/:id',checkuserauth,AdminController.CourseDetailes)
// router.get('/adminedit/:id',checkuserauth,CourseController.CourseEdit)
// router.post('/adminUpdate/:id',checkuserauth,CourseController.CourseUpdate)
router.get('/admin_profile',checkuserauth,AdminController.AdminProfile)
router.post('/change_password',checkuserauth,AdminController.ChangePassword)
router.post('/change_profile',checkuserauth,AdminController.ChangeProfile)
router.get('/delete/:id',checkuserauth,AdminController.UserDelete)
router.get('/admin/contact',checkuserauth,AdminController.AdminContact)
router.get('/admin/about',checkuserauth,AdminController.AdminContact)
router.get('/admin/dashboard',checkuserauth,AdminController.dashboard)
router.post('/update_approve/:id',checkuserauth,AdminController.update_approve)










module.exports = router
