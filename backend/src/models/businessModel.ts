import mongoose, { Schema, Document } from 'mongoose';

interface IBusiness extends Document {
    name: string;
    adress: string;
    description: string;
    category: string;
    reviews: Schema.Types.ObjectId[];
};

export const businessSchema: Schema = new Schema<IBusiness>({
    name: {type: String, required: true},
    adress: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
});

export default mongoose.model<IBusiness>('business', businessSchema);