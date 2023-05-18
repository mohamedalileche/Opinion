import Post from '../Models/Post.js';


/////////////////////////Ajouterr/////////////////////////////////
export const createPost = async (req, res) => {
  const userId = res.locals.userId
  
  const {title, text} = req.body
  console.log(title);
  try {
    const post =  await Post.create({title, text, user: userId});
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  } 
};

//////////////////////// Afficher tout les posts////////////////////////
export const getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la publication.' });
  }
};

///////////////Modifier un post////////////////
export const updatePost = async (req, res) => {
  try {
    
    const post = await Post.findByIdAndUpdate(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la publication.' });
  }
};


//////////////////Supprimer un post //////////////////////
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }
 
    res.status(200).json({ message: 'Publication supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la publication.' });
  }
};
