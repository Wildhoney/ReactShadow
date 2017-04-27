import { readFileSync } from 'fs';
import http             from 'http';
import express          from 'express';

const app    = express();
const server = http.createServer(app);
const port   = process.env.PORT || 5000;

app.get(/\.html$/i, (_, res) => {
    res.send(readFileSync(`${__dirname}/example/index.html`, 'utf-8'));
});

app.use(express.static(`${__dirname}/example`));

server.listen(port);
