const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const connectDb = require('./config/Db')

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

const port = process.env.PORT || 5000
connectDb();

app.get('/', (req, res) => {
    res.send('hello World!');
})

app.use('/', require('./routes/user'))
app.use('/posts', require('./routes/posts'))

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});