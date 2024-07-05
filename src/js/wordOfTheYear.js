const wordsOfTheYear = [
    'vaccine',
    'pandemic',
    'lockdown',
    'authentic',
    'rizz',
    'deepfake',
    'coronation',
  ];  
  
  const randomWord = wordsOfTheYear[Math.floor(Math.random() * wordsOfTheYear.length)];
  document.getElementById('word').textContent = randomWord;
  
  document.getElementById('getDefinition').addEventListener('click', async () => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
    const data = await response.json();
  
    const definitionElement = document.getElementById('definition');
    if (data.title === 'No Definitions Found') {
        definitionElement.textContent = 'No definition found.';
    } else {
        const definitions = data[0].meanings[0].definitions;
        definitionElement.innerHTML = `<p>${definitions[0].definition}</p>`;
    }
});

  
  document.getElementById('backToHome').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  