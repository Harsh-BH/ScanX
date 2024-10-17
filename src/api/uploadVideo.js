// pages/api/uploadVideo.js (in Next.js)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName, length, confidence, prediction, totalFaces, processingTime, userId } = req.body;

    try {
      const video = await prisma.video.create({
        data: {
          fileName,
          length,
          confidence,
          prediction,
          totalFaces,
          processingTime,
          userId,
        },
      });

      res.status(200).json(video);
    } catch (error) {
      console.error("Error saving video data: ", error);
      res.status(500).json({ error: 'Failed to save video data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
