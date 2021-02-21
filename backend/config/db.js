const mongoose =require('mongoose');

const connectDB = async () =>{
    try{
        console.log('Connecting to DB...')
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex:true
        })

        console.log(`MongoDB Connected: ${connection.connection.host}`)
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;