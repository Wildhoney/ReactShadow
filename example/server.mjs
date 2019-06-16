import path from 'path';
import fs from 'fs';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

app.get(/\.html$/i, (_, res) => {
    res.send(fs.readFileSync(path.resolve('./example/index.html'), 'utf-8'));
});

app.use(express.static(path.resolve('./example')));

const port = process.env.PORT || 3000;
server.listen(port);
