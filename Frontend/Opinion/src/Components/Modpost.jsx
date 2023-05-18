import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../../Api/apis';
import { useNavigate } from 'react-router-dom';

function EditPost({ postId }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      navigate('/Accueil');
    },
  });

  const handleUpdatePostSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({  title, text });
  };

  return (
    <div>
      <form onSubmit={handleUpdatePostSubmit}>
        <label>Titre:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Contenu:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditPost;
