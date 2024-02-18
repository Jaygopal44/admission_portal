const UserModel = require('../models/User')
class UserController{
    static home = (req,res)=>{
        res.render('home')
    }

    static about = (req,res)=>{
        res.render('about')
    }
}

module.exports=UserController