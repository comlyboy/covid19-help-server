import mongoose from "mongoose";

import { MONGO_DB_URL } from "../configuration/configuration";


export async function ConnectDB() {
    try {
        const conne = await mongoose.connect(MONGO_DB_URL!);
        console.log("Connected to database ==> 100%");
    } catch (error) {
        console.log(error);
        console.log("Cannot connect to database");

    }

}
