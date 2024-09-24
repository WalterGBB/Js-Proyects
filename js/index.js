const url = 'https://text-translator2.p.rapidapi.com/translate';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '48e86c4600msh2c0cffd19e54b2dp13291ajsn587e554908a5',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    body: new URLSearchParams({
        source_language: 'en',
        target_language: 'es',
        text: 'What is your name?'
    })
};

fetch(url, options)
    .then(res => res.json())
    .then(res => console.log(res.data.translatedText))