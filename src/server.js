import express from 'express'
const app = express()

app.use(express.json())

app.post('/api/receiver', (req, res) => {
    console.log(req.body)

    res.status(200).send('gg')
})

app.listen(21868, () => {
  console.log('server started at http://localhost:21868')
})

export default app
