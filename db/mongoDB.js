const mongoose = require('mongoose');
require('dotenv').config();

const dbConection = async()=>{
    try{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log('base de datos online')

    }catch(error){
        console.error(error);
        throw new Error('Error a la hora de iniciar base de datos')
    }
}


module.exports = {
    dbConection
}