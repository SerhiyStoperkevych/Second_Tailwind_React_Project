import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
    text: string;
    username: string;
}

const ChatSchema: Schema = new Schema({
    text: { type: String, required: true },
    username: { type: String, required: true }
});

export default mongoose.model<IChat>('chats', ChatSchema);
