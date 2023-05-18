import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", withCredentials: true
})

  

export const register = async (Inscription) => {
    console.log(Inscription);
    const res = await api.post('/users/register',Inscription)
    return res.data;
}



export const login = async (Inscription) => {
    console.log(Inscription);
    const res = await api.post('/users/login',Inscription)
    console.log({user:res.data});
    return res.data;
}


export const logout = async () => {
    const res = await api.get('/users/logout')
    return res.data;
}


/////////////////Post///////////////////////
export const createPost = async (data) => {
    console.log(data);
    const res = await api.post('/posts/create',data)
    return res.data;
}

export const getPosts  = async () => {
    const res = await api.post('/posts',projet)
    return res.data;
}

export const fetchPosts = async () => {
    const response = await api.get('/posts');
    if (response.status !== 200) {
      throw new Error('s');
    }
    return response
  }


  export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete post');
    }
    return response;
  };  

  export const updatePost = async (postId, updatedPostData) => {
    const response = await api.put(`/posts/${postId}`, updatedPostData);
    if (response.status !== 200) {
      throw new Error('Failed to update post');
    }
    return response;
  };
  