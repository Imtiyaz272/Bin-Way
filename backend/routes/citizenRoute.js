import express from 'express';
import {User} from '../models/userModel.js';
import {Report} from '../models/reportModel.js';
import {Bin} from '../models/binModel.js';
import { Ward } from '../models/wardModel.js';

const router = express.Router();

router.post('/report', async(req, res)=>{
   console.log('Request for report');
    try {
        const { type, area, name, description } = req.body;

        if (!type || !area || !description) {
          return res.status(400).json({ message: "Required fields are missing" });
        }
    
        const newReport = new Report({
          issue: type,
          wardName: area,
          citizen: name,
          description,
          image: req.file ? req.file.path : null, // Save the file path if an image is uploaded
        });
    
        await newReport.save();
        res.status(201).json({ message: "Report submitted successfully", report: newReport });
      } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
}});



export default router;