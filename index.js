const express = require('express')
const app = express()
const cors = require('cors')
const verifyJWT = require('./middleware/verfiyJWT.js')
const port = 3000 

const corsOptions = {
  origin: 'https://opulent-acorn-5rwgjvgqr54c4v9-3000.app.github.dev', // Adjust this URL to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
const auth = require('./controllers/auth.js')
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/auth',auth)
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get('/', (req, res) => {
  console.log("hi")
  res.cookie("hello","hi")
  res.send('ok')

})

app.get('/meet', verifyJWT,(req, res) => {
  res.json(res.locals.user)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
