const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/proxy-to-zapier', async (req, res) => {
  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/19989472/2t8x294/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to forward request to Zapier' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Proxy server running on port ${port}`));
