import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () : Promise<void> => {
    try {
        const MONGO_URL = <string>process.env.MONGO_URI;
        mongoose.connect(MONGO_URL);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log(error)
    }
    
}

export default connectDB;