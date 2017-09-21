const express = require('express');
var app = express();

app.get('/hello-express', (req, res) => {
    res.send('Hello Express!');
});

app.get('/array-objects', (req, res) => {

    Object.prototype._type1_ = 'anything'; // Bad idea. You should never do this.
    res.status(200)
        .send([{
                number: 1,
                _type1_:'integer'
            },{
                number: 2
            },{
                number: 3
            }
        ]);
});

app.listen(3000);

console.log(`Running on port 3000`);

module.exports.app = app;