import {Post} from '../Models/Post.js';


/////////////////////////Ajouterr/////////////////////////////////
export const createPost = async (req, res) => {
  try {
    const { title, text, image, author } = req.body;
    const post = new Post({ title, text, image, author });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la publication.' });
  }
};

//////////////////////// Afficher tout les posts////////////////////////
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des publications.' });
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
    const { title, text, image } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }
    post.title = title;
    post.text = text;
    post.image = image;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la publication.' });
  }
};


//////////////////Supprimer un post //////////////////////
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }
    await post.remove();
    res.status(200).json({ message: 'Publication supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la publication.' });
  }
};
