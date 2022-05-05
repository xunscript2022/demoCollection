const express = require('express');
const path = require('path');
const app = express();
const port = 3000

const staticOptions = {
    setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*')
    }
}
app.use('/static',express.static(path.join(__dirname,'static'), staticOptions));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})