const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const CourseModel = require('../models/Course')

const checkuserauth = async(req, res, next)=>{
    // console.log('hello auth');
    const {token} = req.cookies
    // console.log(token);
    if(!token) {
        req.flash('error','unauthorized user, please login')
        res.redirect('/')
    }else{
        const verifytoken = jwt.verify(token,'jay123@mridula')
        // console.log(verifytoken);
        const data = await UserModel.findOne({_id:verifytoken.ID})
        // console.log(data);
        req.data1 = data
        
        next()
    }
}

module.exports = checkuserauth;