const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

const app = require('./index');
const mongoose = require('mongoose');


 console.log(process.env.DATABASE);

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connected');
}).catch((error) => {
  console.error('DB connection error:', error.message);
});



// console.log(process.env);

const port =process.env.PORT ?? 8002;
app.listen(port, () => {
    console.log('Server is running on port 8000');
});