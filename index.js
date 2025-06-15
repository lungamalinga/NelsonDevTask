const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan'); // test logs 🤪
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const app = express();

 // -- logs
 const LOG_DATA = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' });
 morgan.format('myFormat', ':method :url :status :response-time ms');
 app.use(morgan('combined', { stream: LOG_DATA }));
 app.use(morgan('combined')); // print the log
//-- logs

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = 3001;

app.get('/', (req, res) => {
    res.status(200)
       .send('Welcome to my Nelson API by Lunga Malinga');
});

app.post('/', (req, res) => {
    res.status(200)
       .send('Please use the /data endpoint to send data.');
});

app.get('/data', (req, res) => {
    res.status(200)
       .send('This is a /GET request. Please use a /POST request, with a valid body to send data');
})

app.post('/data', (req, res) => {
    const data = req.body;
    
    //handle missing body
    if (!data || !data.data){
        return res.status(400)
                  .send('Bad request: Missing "data" field.')
    }

    // !return sorted array
    const response_array = generate_response(data.data)
    return res.status(200)
        .send(response_array);
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})

// ! response handler
function generate_response(data){
    return {
        word: data.toLowerCase().split('').sort()
    };
}
