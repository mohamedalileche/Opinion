import  express  from "express";
import mongoose from "mongoose";
import router from "./Routes/Routeauth.js";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173" , credentials: true}))

mongoose.connect('mongodb+srv://mohamedalilechefabrikademy:azerty@clusterfbrk.tykmlyj.mongodb.net/?retryWrites=true&w=majority')
.then(() => { console.log('Connected to MongoDB') })
  .then(() => { app.listen(5000); console.log('Server started on port 5000') })
    .catch(err => console.log(err))



app.use("/api", router);




