const fs=require('fs');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

const {Tour} = require('../../model/tourModel');
const mongoose = require('mongoose');


 console.log(process.env.DATABASE);

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connected');
}).catch((error) => {
  console.error('DB connection error:', error.message);
});





const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');


// add data to db
const importData = async () => {
    try {

        await Tour.create(JSON.parse(tours))
        console.log('data imported');
        process.exit();
        
    } catch (error) {
        console.log(error);
    }
}

//delete data from db

const deleteData = async () => {

    try {
        await Tour.deleteMany()
        console.log("deta deleted");
        process.exit();
        
    } catch (error) {
       console.log(error);
        
    }
}


console.log(process.argv);

if (process.argv[2] === '--import')
{
    importData();
} else if (process.argv[2] === '--delete')
{
    deleteData();
}