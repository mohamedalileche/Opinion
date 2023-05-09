import  express  from "express";
import mongoose from "mongoose";
import router from "./Routes/Routeauth.js";
import {createPost,getPosts,updatePost,deletePost} from "./Controllers/PostControllers.js";

const app = express()
app.use(express.json());


mongoose.connect('mongodb+srv://mohamedalilechefabrikademy:azerty@clusterfbrk.tykmlyj.mongodb.net/?retryWrites=true&w=majority')
.then(() => { console.log('Connected to MongoDB') })
  .then(() => { app.listen(5000); console.log('Server started on port 5000') })
    .catch(err => console.log(err))





import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));   
app.use("/api/user", router);


app.get('/posts', createPost);
app.post('/posts', getPosts);
app.put('/posts/:id', updatePost);
app.delete('/posts/:id',deletePost);   


