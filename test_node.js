const https = require('https');
https.get('https://registry.npmjs.org/react', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
}, (res) => {
    console.log('success', res.statusCode);
}).on('error', (e) => {
    console.log(e);
});