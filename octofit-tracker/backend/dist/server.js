import express from 'express';
import { apiBaseUrl } from './config/api.js';
import { connectToDatabase } from './config/database.js';
import routes from './routes.js';
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(routes);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
async function startServer() {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
}
startServer();
