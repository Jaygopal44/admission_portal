const mongoose = require('mongoose');

// const live_url = "mongodb+srv://Jaygopal003:MiWeU1S1iV0QnK4f@cluster0.hoey0x3.mongodb.net/BlogWeb?retryWrites=true&w=majority"
const live_url = "mongodb+srv://admission:gazVsVaFjSyv0Npk@cluster0.zqyvrmc.mongodb.net/addmission_portal?retryWrites=true&w=majority"

// const local_url = mongoose.connect("mongodb://localhost:27017/admissionPortal")

const connectdb = ()=>{
    return mongoose.connect(live_url)
    .then(()=>{
        console.log('Connected Successfully');
    }).catch((error)=>{
        console.log(error);
    })
}

module.exports = connectdb