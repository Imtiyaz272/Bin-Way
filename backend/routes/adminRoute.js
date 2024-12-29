import express from 'express';
import {User} from '../models/userModel.js';
import {Report} from '../models/reportModel.js';
import {Bin} from '../models/binModel.js';
import { Ward } from '../models/wardModel.js';

const router = express.Router();

router.get('/issues-reported', async(req, res)=>{
    try {
        const reports = await Report.find({});
        return res.status(200).json({
            data : reports
        });
        } catch (error) {
            console.log(error);
            return res.status(400).send({message : error.message});
        }
});

router.get('/binStatus/:wardId', async(req, res)=>{
    const { wardId } = req.params;
  if (!wardId) {
    return res.status(400).json({ message: "Ward ID is required" });
  }
  try {
    const bins = await Bin.find({ wardId: wardId });
    res.status(200).json({ success: true, data: bins });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bins. Please try again.",
    });
  }
});

router.get('/wardData', async (req, res) => {
  try {
    const wards = await Ward.find({});
    res.status(200).json({ success: true, data: wards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/resolved/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params; 

    if (!reportId) {
      return res.status(400).json({ message: 'Report ID is required' });
    }
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json({ message: 'Report resolved and deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    return res.status(500).json({ message: 'An error occurred while resolving the report' });
  }
});


export default router;