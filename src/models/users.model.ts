import mongoose from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema <User>({
   username: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String, 
      required: true,
      unique: true
   },
   password: {
         type: String,
         required: true,
         //TODO: esta opcion nos permite en las consultas no traer el password o cualquier opcion que no sea buena llevar al frontend
         select: false      
   },
},{
   versionKey: false,
   timestamps: true
});

export default mongoose.model('User', UserSchema);
