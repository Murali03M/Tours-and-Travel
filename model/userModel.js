const mongoose = require('mongoose');






const userSchema = new mongoose.Schema({

    name: { 
        type: String,
        required: [true, "should need to have a name"],
        unique: true
    },
        
    age: {
        type: Number,
        default:0
    },
    mail: {
        type: String,
        required: true
    }


})




const User = mongoose.model('User', userSchema);


module.exports = {
      User
};


