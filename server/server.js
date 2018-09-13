// routes
// app.listen
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public/');

const port = process.env.PORT || 3000; 

const app = express();

app.use(express.static(publicPath));

// routes
// app.get('/', (req, res) => {
//     res.render('index.html');
// })

app.listen(port, (err, res) => {
    if (err) throw err;

    console.log(`Listening on port ${port}...`);
});
