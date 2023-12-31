const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {

    app.use(morgan('dev'));

}


app.use((req, res, next) => {
    console.log("middleware");
    next();
});



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);




module.exports = app;