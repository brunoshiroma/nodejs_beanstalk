const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/hello', (req, resp)=>{
    resp.send(`Hello ${req.query.name}`);
});

app.post('/hello', (req, resp) => {
    resp.send(`Hello ${req.body.name}`);
});

if(process.argv[2] == 'start'){
    app.listen(port, ()=>{
        console.log(`started on port ${port}`);
    });
}



module.exports = {
    port : port
};