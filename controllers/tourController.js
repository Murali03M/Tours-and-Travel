const { Tour } =require('./../model/tourModel')



exports.checkBody = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
      });
  next();
};

exports.getAllTours = async (req, res) => {

    

    try {

        // filtering
        
       const queryObj = { ...req.query };
       const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);

        // advance filtering 

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query =Tour.find(JSON.parse(queryStr));
        console.log(req.query);
        console.log('before sort', query.length);
        // sorting 
        if (req.query.sort) {
            const sortFields =req.query.sort.split(',').join(' ');
            query = query.sort(sortFields);
        }
        console.log('after', query.length);
        
        //field limiting

        if (req.query.fields)
        {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //pagination

        
        
        //execute the query
        const tour = await query;

    res.status(200).json({
        status: 'success',
        length: tour.length,
        data: tour
    });
        
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
  
};

exports.getTour =async (req, res) => {

    try {
    
   const tour = await Tour.findById(req.params.id )

    res.status(200).json({
        status:'success',
        data: tour
    });
        
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
};

exports.createTour = async (req, res) => {

    try {
        // const name = req.body.name;
        // const rating = req.body.rating;
        // const price = req.body.price;
    
        const newTour = await Tour.create(req.body )
        res.status(201).json({
            status: 'success',
            data: newTour
        });
    
        
    } catch (error) {

       return res.status(400).json({
            status: 'error',
            message: error.message
        });
        
    }


};

exports.updateTour = async (req, res) => {
    try {
    
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
     
         res.status(200).json({
             status:'success',
             data: tour
         });
             
         } catch (error) {
             res.status(400).json({
                 error:error.message
             })
         }
};

exports.deleteTour = async(req, res) => {
    try {
    
       await Tour.findByIdAndDelete(req.params.id, {
            new:true
        })
     
         res.status(200).json({
             status:'successfully deleted',
             
         });
             
         } catch (error) {
             res.status(400).json({
                 error:error.message
             })
         }
};