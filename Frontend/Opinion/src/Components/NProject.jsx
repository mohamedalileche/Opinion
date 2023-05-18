
import { useState } from 'react';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPost } from '../../Api/apis';
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const [title, settitle] = useState("");
    const [text, settext] = useState("");

  
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    
    const createPostMutation = useMutation(createPost, {
        onSuccess: () => {
            refetch()
            queryClient.invalidateQueries("posts");
            navigate('/Accueil')
        },
    });


    const handleNewPostsubmit = (e) => {
        
        e.preventDefault();

        createPostMutation.mutate({title,text});
        settitle("");
        settext("")
 
    };



    return (
        <div className="w-[100%] h-[250px] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-[5px] shadow dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleNewPostsubmit} className="w-[80%] flex flex-col items-center justify-center gap-2 shadow-sm">
                <label >Titre:</label>
                <input onChange={(e) => settitle(e.target.value)} type="text" id="project_Titre" className=" w-[60%] h-[50px] border-2 border-gray-300 rounded px-2 py-1" />
                <label >Contenu:</label>
                <input onChange={(e) => settext(e.target.value)} type="text" id="project_Titre" className=" w-[60%] h-[70px] border-2 border-gray-300 rounded px-2 py-1" />
                <div className="inline-flex w-full items-center justify-center gap-2">           
                    <button type="submit" className="px-4 py-2 bg-black rounded text-white">Ajouter</button>

                </div>
            </form>
        </div>
    );
}

export default NewPost;







