const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const CourseModel = require("../models/Course");

cloudinary.config({
  cloud_name: "djzd1wuvx",
  api_key: "396292133336491",
  api_secret: "n1fldIDPHq42A2LWJkoAMifWRcw",
});

class FrontendController {
  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash("success"), error: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, image, _id } = req.data1;
      const btech = await CourseModel.findOne({
        user_id: _id,
        course: "Btech",
      });
      const mtech = await CourseModel.findOne({
        user_id: _id,
        course: "Mtech",
      });
      const mba = await CourseModel.findOne({ user_id: _id, course: "Mba" });

      // console.log(name);
      res.render("dashboard", {
        n: name,
        img: image,
        b: btech,
        m: mtech,
        mba: mba,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("contact", { n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("about", { n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static userinsert = async (req, res) => {
    // console.log(req.files.profile_image);
    // console.log(req.body)

    const { name, email, password, confirm_password } = req.body;
    const image = req.files.profile_image;
    // console.log(image);
    const image_upload = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "profimage",
    });
    // console.log(image_upload);
    const user = await UserModel.findOne({ email: email });
    // console.log(user);
    if (user) {
      req.flash("error", "email already exist");
      res.redirect("/register");
    } else {
      if (name && email && password && confirm_password) {
        if (password == confirm_password) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: image_upload.public_id,
                url: image_upload.secure_url,
              },
            });
            await result.save();
            req.flash("success", "registration successfully please login");
            res.redirect("/");
          } catch (error) {
            console.log(error);
          }
        } else {
          req.flash("error", "password and confirm password does not match");
          res.redirect("/register");
        }
      } else {
        req.flash("error", "all fields are required");
        res.redirect("/register");
      }
    }

    // login Verify
  };
  static verifylogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user);
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            // multipal login
            if (user.role == "student") {
              // generate token
              const token = jwt.sign({ ID: user._id }, "jay123@mridula");
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/dashboard");
            }

            if (user.role == "admin") {
              // generate token
              const token = jwt.sign({ ID: user._id }, "jay123@mridula");
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
          } else {
            req.flash("error", "Email or password is not valid");
            return res.redirect("/");
          }
        } else {
          req.flash("error", "you are not registered user");
          return res.redirect("/");
        }
      } else {
        req.flash("error", "All fields Required");
        return res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static UserProfile = async (req, res) => {
    try {
      const { name, image , email} = req.data1;
      res.render("profile", { n: name, img: image  , e:email , success: req.flash("success"), error: req.flash("error")});
      // res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  static ChangePassword = async (req, res) => {
    try {
      const {name,email,id,image} = req.data1
      // console.log(req.body);
      const{oldpassword, newpassword, cpassword} = req.body

      if (oldpassword && newpassword && cpassword) {
        const user = await UserModel.findById(id)
        const isMatch = await bcrypt.compare(oldpassword, user.password)
        if(!isMatch) {
          req.flash('error','Old Password is incorrect')
          res.redirect('/user_profile')
        }else{
          if(newpassword !== cpassword){
            req.flash('error','Password does not matched')
            res.redirect('/user_profile')
          }else{
            const newHashPass = await bcrypt.hash(newpassword, 10)
            await UserModel.findByIdAndUpdate(id,{
              $set:{password:newHashPass}
            })
            req.flash('success','Password Changed successfully')
            res.redirect('/user_profile')
          }
        }


      }else{
        req.flash('error','All field are required')
        res.redirect('/user_profile')
      }

    } catch (error) {
      console.log(error);
    }
  };

}

module.exports = FrontendController;
