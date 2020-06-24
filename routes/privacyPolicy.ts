import express, { Request, Response } from 'express'
import path from 'path'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../privacy-policy.html'));
})

export default router