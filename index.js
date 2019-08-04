const Express = require('express');
const Path = require('path');
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const CORS = require('cors');
const PORT = process.env.PORT || 3000;

const app = new Express();

app.use(CORS());
app.use(BodyParser.json({ type: '*/*' }));
app.use(Morgan('dev'));

app.use(Express.static(Path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(Path.join(__dirname, './build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});