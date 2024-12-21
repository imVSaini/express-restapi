import express from 'express'

const router = express.Router()

router.get('/hello', (req, res) => {
  res.status(200).send({ message: 'Hello, World!' })
})

export default router
