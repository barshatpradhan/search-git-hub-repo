import mongoose, { Document } from 'mongoose';
export interface IFavorite extends Document {
    userId: mongoose.Types.ObjectId;
    repoId: number;
    name: string;
    description: string;
    starCount: number;
    url: string;
    language: string;
}
declare const _default: mongoose.Model<IFavorite, {}, {}, {}, mongoose.Document<unknown, {}, IFavorite, {}, {}> & IFavorite & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Favourite.d.ts.map