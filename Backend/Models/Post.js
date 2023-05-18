
import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
},
{timestamps: true}
);

export default mongoose.model('Post', PostSchema);
