import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../Api/apis'
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '../../Api/apis';
import  Modpost  from '../Components/Modpost'
import {  useState } from 'react'
import Modal from 'react-modal';

function Card() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  const { data: posts, isLoading, isError , refetch} = useQuery({
    queryKey:['posts'], 
    queryFn: async () => {
      const result = await fetchPosts()
      return result.data
  }});


  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      refetch()
    },
  });
  const handleDeletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching posts</div>;
  }


    return (
<div>  
         
      <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Box Opinion</h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus rem, nulla ipsum dignissimos minus</p>
      </div> 
      <div class="grid gap-8 lg:grid-cols-2"> 
          {posts.map((post) => (
          <article key={post._id} class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                  <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Article
                  </span>
                  <span class="text-sm">{post.createdAt.slice(0,10)} {post.createdAt.slice(11,16)}</span>
              </div>
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{post.title}</a></h2>
              <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{post.text}</p>
              <div class="flex justify-between items-center">
                  <div class="flex items-center space-x-4">
                      <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
                      <span class="font-medium dark:text-white">
                          Bonnie Green
                      </span>
                  </div>
                  <button onClick={() => handleDeletePost(post._id)} className="px-4 py-2 bg-red-500 rounded text-white">Supprimer</button>
                  <button onClick={openModal}>Modifier</button>
                  <Modal className={"flex flex-col items-center justify-center"} isOpen={isModalOpen} onRequestClose={closeModal}>
                  <Modpost/>
                  <button onClick={closeModal}>Fermer</button>
                  </Modal>
                  </div>
          </article> 
))}                           
      </div>  
  </div>
</section> 

</div>    
    )}
export default Card;
