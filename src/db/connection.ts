import mongoose from 'mongoose';

const DB_URL = "mongodb+srv://corneliusDbUser:corneliusDbPassword@ncdc-help-database-fcwkp.mongodb.net/test?retryWrites=true&w=majority";

const DB_URL_local = "mongodb://localhost:27017/Covid19_help_DB";


// // Connecting to mongoDB atlas
// mongoose.connect("mongodb+srv://cornelius:d8c8fLcOVovfzHpo@cluster1-pauiv.mongodb.net/easy-client?retryWrites=true&w=majority", { useNewUrlParser: true })

//     .then(result => {
// })
//     .catch(err => {
//         console.log(err);
//     });



const connect_DB = async () => {
    try {
        const conne = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to database ==> 100%');
    } catch (error) {
        console.log(error);
        console.log('Cannot connect to database');

    }

}

export default connect_DB;