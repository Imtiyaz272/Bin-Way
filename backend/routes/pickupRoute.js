import express from 'express';
import { Bin } from '../models/binModel.js';
import { Ward } from '../models/wardModel.js';
import { Office } from '../models/officeModel.js';

const router = express.Router();

router.post('/getRoute', async (req, res) => {
  console.log('Request for getRoute received');
  const { ward, officeId } = req.body;

  try {
    const bins = await Bin.find({ wardId: ward });
    const office = await Office.findOne({ officeId });

    const highPriorityBins = bins.filter((bin) => bin.fillLevel > 50);
    highPriorityBins.sort((a, b) => b.fillLevel - a.fillLevel);

    const selectedBins = [];
    let truckCapacity = 300;
    let usedCapacity = 0;

    highPriorityBins.forEach((bin) => {
      if (usedCapacity + bin.fillLevel <= truckCapacity) {
        selectedBins.push(bin);
        usedCapacity += bin.fillLevel;
      }
    });

    if (usedCapacity <= truckCapacity) {
      const remainingBins = bins.filter((bin) => bin.fillLevel <= 50);
      const additionalBins = applyDP(remainingBins, truckCapacity - usedCapacity);
      selectedBins.push(...additionalBins);
    }
   console.log(office);
    // Send selected bins and office location to frontend
    res.json({ selectedBins, office });
  } catch (error) {
    console.error('Error fetching route:', error);
    res.status(500).send('Error computing route');
  }
});

const applyDP = (bins, remainingCapacity) => {
  const n = bins.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(remainingCapacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let cap = 1; cap <= remainingCapacity; cap++) {
      if (bins[i - 1].fillLevel <= cap) {
        dp[i][cap] = Math.max(
          dp[i - 1][cap],
          dp[i - 1][cap - bins[i - 1].fillLevel] + bins[i - 1].fillLevel
        );
      } else {
        dp[i][cap] = dp[i - 1][cap];
      }
    }
  }

  const selectedBins = [];
  let cap = remainingCapacity;
  for (let i = n; i > 0 && cap > 0; i--) {
    if (dp[i][cap] !== dp[i - 1][cap]) {
      selectedBins.push(bins[i - 1]);
      cap -= bins[i - 1].fillLevel;
    }
  }

  return selectedBins;
};

router.post('/updateBinStatus', async (req, res) => {
  const { binId } = req.body;

  try {
    const bin = await Bin.findOne({ binId });

    if (bin) {
      bin.status = "picked up";
      bin.fillLevel = 0;
      await bin.save();
      res.status(200).json({ success: true, message: "Bin status updated" });
    } else {
      console.log('Bin not found');
      res.status(404).json({ success: false, message: "Bin not found" });
    }
  } catch (error) {
    console.error('Error updating bin status:', error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


export default router;
