import mongoose, {Schema, Document} from 'mongoose';

export interface IFavorite extends Document {
    userId: mongoose.Types.ObjectId;
    repoId: number;
    name: string;
    description: string;
    starCount: number;
    url: string;
    language: string;
}

const FavoriteSchema: Schema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User', required: true},
    repoId: {type: Number, required: true},
    name: {type: String, reqired: true},
    description: {type: String},
    starCount: {type: Number, required: true},
    url: {type: String, required: true},
    language: {type: String}
});

FavoriteSchema.index({userId: 1, repoId: 1}, {unique: true});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);