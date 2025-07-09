console.log('CWD:', process.cwd());
require('dotenv').config({ debug: true });
console.log('CLIENT_ID:', process.env.REDDIT_SERGIO_CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.REDDIT_SERGIO_SECRET);
require('dotenv').config();
console.log(
  'ID:',
  process.env.REDDIT_SERGIO_CLIENT_ID,
  'SECRET:',
  process.env.REDDIT_SERGIO_SECRET
);
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins for development

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/reddit-token', async (req, res) => {
  const credentials = Buffer.from(
    `${process.env.REDDIT_SERGIO_CLIENT_ID}:${process.env.REDDIT_SERGIO_SECRET}`
  ).toString('base64');

  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'sergio-client/0.1 by SergioTom',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch Reddit token', details: error.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
