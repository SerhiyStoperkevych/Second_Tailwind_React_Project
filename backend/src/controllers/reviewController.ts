import { Request, Response } from "express";
import reviewModel from "../models/reviewModel";

export const postReview = async (req: Request, res: Response) => {
    const { businessId, rating, comment } = req.body;

    try {
        const review = new reviewModel({ business: businessId, user: (req as any).user.userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Failed to create review" });
    };
};

export const getReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewModel.find({ business: req.params.businessId }).populate('user');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch business" });
    }
};
