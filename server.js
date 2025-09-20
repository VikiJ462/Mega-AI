import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const SERPHouse_API_KEY = process.env.SERPHOUSE_API_KEY;

app.use(cors());
app.use(express.static('public'));

app.get('/api/serphouse', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await fetch(`https://api.serphouse.com/search?api_key=${SERPHouse_API_KEY}&query=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json({ response: data, source: 'SERPHouse API' });
    } catch (error) {
        console.error('Error fetching data from SERPHouse API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from SERPHouse API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
