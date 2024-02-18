const CourseModel = require("../../models/Course");
const UserModel = require("../../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.data1;
      const course = await CourseModel.find();
      // console.log(course);
      res.render("admin/dashboard", { n: name, img: image, c: course });
    } catch (error) {
      console.log(error);
    }
  };

  static CourseDetailes = async (req, res) => {
    try {
      const d = await CourseModel.findById(req.params.id);
      // console.log(d);
      const { name, image } = req.data1;
      res.render("admin/view", { data: d, n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static CourseEdit = async (req, res) => {
    try {
      const d = await CourseModel.findById(req.params.id);
      // console.log(d);
      const { name, image } = req.data1;
      res.render("admin/edit", { data: d, n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static CourseUpdate = async (req, res) => {
    try {
      const d = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.number,
        address: req.body.address,
        gender: req.body.gender,
        college: req.body.college,
        course: req.body.course,
        branch: req.body.branch,
      });
      res.redirect("/admin/dashboard");
      // console.log(d);
      // res.render('course/edit',{data:d})
    } catch (error) {
      console.log(error);
    }
  };

  static UserDelete = async (req, res) => {
    try {
      const result = await CourseModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static AdminProfile = async (req, res) => {
    try {
      const { name, email, image } = req.data1;
      const course = await CourseModel.find();
      res.render("admin/profile", {
        n: name,
        e: email,
        img: image,
        c: course,
        success: req.flash("success"),
        error: req.flash("error"),
      });
      // res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  static AdminContact = async (req, res) => {
    try {
      const { name, email, image } = req.data1;
      const course = await CourseModel.find();
      res.render("admin/contact", { n: name, e: email, img: image, c: course });
      // res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  static AdminAbout = async (req, res) => {
    try {
      const { name, email, image } = req.data1;
      const course = await CourseModel.find();
      res.render("admin/about", { n: name, e: email, img: image, c: course });
      // res.redirect('/admin/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  static ChangePassword = async (req, res) => {
    try {
      const { name, email, id, image } = req.data1;
      // console.log(req.body);
      const { oldpassword, newpassword, cpassword } = req.body;

      if (oldpassword && newpassword && cpassword) {
        const user = await UserModel.findById(id);
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
          req.flash("error", "Old Password is incorrect");
          res.redirect("/admin_profile");
        } else {
          if (newpassword !== cpassword) {
            req.flash("error", "Password does not matched");
            res.redirect("/admin_profile");
          } else {
            const newHashPass = await bcrypt.hash(newpassword, 10);
            await UserModel.findByIdAndUpdate(id, {
              $set: { password: newHashPass },
            });
            req.flash("success", "Password Changed Successfully");
            res.redirect("/admin_profile");
          }
        }
      } else {
        req.flash("error", "All field are required");
        res.redirect("/admin_profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static ChangeProfile = async (req, res) => {
    // console.log(req.files.image);
    try {
      if(req.files){
        const user = await UserModel.findById(req.data1);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath , {
          folder: "profimage",
        });
        var data = {
          name : req.body.name,
          email : req.body.email,

          image : {
            public_id : myimage.public_id,
            url : myimage.secure_url,
          }
        }
      }
      else{
        var data = {
          name : req.body.name,
          email : req.body.email
        }
      }
      const update_profile = await UserModel.findByIdAndUpdate(req.data1,data)
      req.flash("success", "Profile updated successfully");
      res.redirect('/admin_profile')
    } catch (error) {
      console.log(error);
    }
  }

  static update_approve = async (req, res) => {
    try {
      const result = await CourseModel.findByIdAndUpdate(req.params.id, {
        comment : req.body.comment,
        status : req.body.status
      })
      res.redirect("/admin/dashboard");

    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = AdminController;
