import * as express from 'express';

const App = express();

App.get('/', (req, res) => {
    res.send('Coool!!');
});


App.listen(8080);