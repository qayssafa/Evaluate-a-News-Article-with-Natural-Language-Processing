
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { inputText } = req.body;

    if (!inputText) {
        return res.status(400).send({ error: 'No text provided' });
    }

    try {
        const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            body: new URLSearchParams({
                key: '0a4b8ebb734441efe1800b1dc3a9c459',  
                txt: inputText,
                lang: 'en',
            }),
        });

        const data = await response.json();
        console.log('Data:', data);

        const result = {
            polarity: data.score_tag,
            subjectivity: data.subjectivity,
            sentence_list: data.sentence_list || [],  
        };

        res.send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Failed to analyze the article' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
