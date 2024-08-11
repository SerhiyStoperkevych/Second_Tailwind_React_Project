import { Request, Response } from "express";
import businessModel from "../models/businessModel";

export const postBusiness = async (req: Request, res: Response) => {
    const { name, adress, description, category } = req.body;

    try {
        const business = new businessModel({ name, adress, description, category });
        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(500).json({ error: "Failed to create business" });
    }
};

export const getBusiness = async (req: Request, res: Response) => {
    try {
        const business = await businessModel.find().populate('reviews');
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch business" });
    }
};