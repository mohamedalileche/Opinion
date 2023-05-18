import { userAuthValidation } from "../Middlewares/auth.js";
import {createPost,getPosts,updatePost,deletePost} from "./Controllers/PostControllers.js";


app.post('/posts/create', userAuthValidation, createPost);
app.get('/posts', getPosts);
app.put('/posts/:id', updatePost);
app.delete('/posts/:id',deletePost);   
