const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.all('*', async (req, res) => {
  const binanceUrl = 'https://api.binance.com' + req.originalUrl;
  try {
    const response = await fetch(binanceUrl, {
      method: req.method,
      headers: {
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
      },
      body: req.method === 'GET' ? null : JSON.stringify(req.body),
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Binance proxy running on port ${port}`);
});
