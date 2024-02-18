const CourseModel = require("../models/Course");
const UserModel = require("../models/User");

const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

class CourseController {
  static CourseInsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { _id } = req.data1;
      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.number,
        address: req.body.address,
        gender: req.body.gender,
        college: req.body.college,
        course: req.body.course,
        branch: req.body.branch,
        user_id: _id,
      });
      await result.save();
      res.redirect("course/display");
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  static courseDisplay = async (req, res) => {
    try {
      const { name, image, _id } = req.data1;
      const data = await CourseModel.find({ user_id: _id });
      // console.log(data);
      res.render("course/display", { d: data, n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static CourseDetailes = async (req, res) => {
    try {
      const d = await CourseModel.findById(req.params.id);
      // console.log(d);
      const { name, image } = req.data1;
      res.render("course/view", { data: d, n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };

  static CourseEdit = async (req, res) => {
    try {
      const d = await CourseModel.findById(req.params.id);
      // console.log(d);
      const { name, image } = req.data1;
      res.render("course/edit", { data: d, n: name, img: image });
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
      res.redirect("/course/display");
      // console.log(d);
      // res.render('course/edit',{data:d})
    } catch (error) {
      console.log(error);
    }
  };

  static ChangeUserProfile = async (req, res) => {
    // console.log(req.files.image);
    try {
      if (req.files) {
        const user = await UserModel.findById(req.data1);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "profimage",
        });
        var data = {
          name: req.body.name,
          email: req.body.email,

          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
        };
      }
      const update_profile = await UserModel.findByIdAndUpdate(req.data1, data);
      req.flash("success", "Profile updated successfully");
      res.redirect("/user_profile");
    } catch (error) {
      console.log(error);
    }
  };

  static UserDelete = async (req, res) => {
    try {
      const result = await CourseModel.findByIdAndDelete(req.params.id);
      res.redirect("/course/display");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;
