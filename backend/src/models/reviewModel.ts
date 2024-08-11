import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
    business: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    rating: number;
    comment: string;
};

export const reviewSchema: Schema = new Schema<IReview>({
    business: { type: Schema.Types.ObjectId, ref: "Budiness", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
});

export default mongoose.model<IReview>('reviews', reviewSchema);