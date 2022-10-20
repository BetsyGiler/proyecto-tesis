import express from 'express';

const app = express();

const port = process.env.API_PORT || 8500;

app.listen(port, () => {

});
