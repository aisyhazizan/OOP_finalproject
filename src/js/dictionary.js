document.getElementById('search').addEventListener('click', async () => {
  const word = document.getElementById('word_input').value.trim();
  const definitionElement = document.getElementById('definition');

  // Clear previous definition
  definitionElement.textContent = '';

  if (!word) {
    definitionElement.textContent = 'Please enter a word.';
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.length > 0) {
      const wordData = data[0];
      const phoneticText = wordData.phonetics.map(p => p.text).join(', ') || 'N/A';
      const examples = wordData.meanings.flatMap(m => m.definitions.map(d => d.example)).filter(Boolean).join('; ') || 'N/A';
      const synonyms = wordData.meanings.flatMap(m => m.definitions.flatMap(d => d.synonyms)).filter(Boolean).join(', ') || 'N/A';
      const antonyms = wordData.meanings.flatMap(m => m.definitions.flatMap(d => d.antonyms)).filter(Boolean).join(', ') || 'N/A';
      const adverbs = wordData.meanings.filter(m => m.partOfSpeech === 'adverb').flatMap(m => m.definitions.map(d => d.definition)).join('; ') || 'N/A';
      const anagrams = wordData.anagrams ? wordData.anagrams.join(', ') : 'N/A';
      const origin = wordData.origin || 'N/A';
      const syllables = wordData.word.split(/[^aeiou]+/).filter(Boolean).length;

      // Display the word data
      document.getElementById('displayWord').innerText = `Word: ${wordData.word}`;
      document.getElementById('displayPhonetic').innerText = `Phonetic: ${phoneticText}`;
      document.getElementById('definition').innerText = `Definition: ${wordData.meanings.flatMap(m => m.definitions.map(d => d.definition)).join('; ') || 'N/A'}`;
      document.getElementById('displayExample').innerText = `Examples: ${examples}`;
      document.getElementById('displaySynonyms').innerText = `Synonyms: ${synonyms}`;
      document.getElementById('displayAntonyms').innerText = `Antonyms: ${antonyms}`;
      document.getElementById('displayAdverbs').innerText = `Adverbs: ${adverbs}`;
      document.getElementById('displayAnagrams').innerText = `Anagrams: ${anagrams}`;
      document.getElementById('displayOrigin').innerText = `Origin: ${origin}`;
      document.getElementById('displaySyllables').innerText = `Syllables: ${syllables}`;

      // Display parts of speech
      const partsOfSpeechElement = document.getElementById('partsOfSpeech');
      const partsOfSpeechHTML = wordData.meanings.map(meaning => {
        const partOfSpeech = meaning.partOfSpeech || 'N/A';
        const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
        return `<div><h3>${partOfSpeech}</h3><ul>${definitions}</ul></div>`;
      }).join('');

      partsOfSpeechElement.innerHTML = partsOfSpeechHTML;

      // Display audio
      const audioElement = document.getElementById('audio');
      const audioSource = wordData.phonetics.find(p => p.audio)?.audio;
      console.log('Audio Source:', audioSource); // Log the audio source

      if (audioElement && audioSource) {
        audioElement.src = audioSource;
        audioElement.style.display = 'block';
        audioElement.controls = true; // Ensure controls are visible
      } else if (audioElement) {
        audioElement.style.display = 'none';
      }

      // Display related URLs (if available)
      const relatedURLs = wordData.sourceUrls || [];
      const relatedURLsElement = document.getElementById('relatedURLs');
      relatedURLsElement.innerHTML = relatedURLs.length > 0 ? relatedURLs.map(url => `<a href="${url}" target="_blank">${url}</a>`).join('<br>') : 'No related URLs available';

    } else {
      definitionElement.textContent = 'No definition found for the entered word.';
    }
  } catch (error) {
    console.error('An error occurred while fetching the word data:', error);
    definitionElement.textContent = `An error occurred while fetching the word data. Please try again. Error: ${error.message}`;
  }
});

function buttonClicked() {
  const word = document.getElementById('word_input').value.trim();
  if (word) {
    fetchWordData(word);
  } else {
    alert('Please enter a word.');
  }
}

async function fetchWordData(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Debug: Log the full word data
    console.log('Full Word Data:', data);

    if (data.length > 0) {
      const wordData = data[0];
      const phoneticText = wordData.phonetics.map(p => p.text).join(', ') || 'N/A';
      const examples = wordData.meanings.flatMap(m => m.definitions.map(d => d.example)).filter(Boolean).join('; ') || 'N/A';
      const synonyms = wordData.meanings.flatMap(m => m.definitions.flatMap(d => d.synonyms)).filter(Boolean).join(', ') || 'N/A';
      const antonyms = wordData.meanings.flatMap(m => m.definitions.flatMap(d => d.antonyms)).filter(Boolean).join(', ') || 'N/A';
      const adverbs = wordData.meanings.filter(m => m.partOfSpeech === 'adverb').flatMap(m => m.definitions.map(d => d.definition)).join('; ') || 'N/A';
      const anagrams = wordData.anagrams ? wordData.anagrams.join(', ') : 'N/A';
      const origin = wordData.origin || 'N/A';
      const syllables = wordData.word.split(/[^aeiou]+/).filter(Boolean).length;

      document.getElementById('displayWord').innerText = `Word: ${wordData.word}`;
      document.getElementById('displayPhonetic').innerText = `Phonetic: ${phoneticText}`;
      document.getElementById('definition').innerText = `Definition: ${wordData.meanings.flatMap(m => m.definitions.map(d => d.definition)).join('; ') || 'N/A'}`;
      document.getElementById('displayExample').innerText = `Examples: ${examples}`;
      document.getElementById('displaySynonyms').innerText = `Synonyms: ${synonyms}`;
      document.getElementById('displayAntonyms').innerText = `Antonyms: ${antonyms}`;
      document.getElementById('displayAdverbs').innerText = `Adverbs: ${adverbs}`;
      document.getElementById('displayAnagrams').innerText = `Anagrams: ${anagrams}`;
      document.getElementById('displayOrigin').innerText = `Origin: ${origin}`;
      document.getElementById('displaySyllables').innerText = `Syllables: ${syllables}`;

      // Display parts of speech
      const partsOfSpeechElement = document.getElementById('partsOfSpeech');
      const partsOfSpeechHTML = wordData.meanings.map(meaning => {
        const partOfSpeech = meaning.partOfSpeech || 'N/A';
        const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
        return `<div><h3>${partOfSpeech}</h3><ul>${definitions}</ul></div>`;
      }).join('');

      partsOfSpeechElement.innerHTML = partsOfSpeechHTML;

      // Display audio
      const audioElement = document.getElementById('audio');
      const audioSource = wordData.phonetics.find(p => p.audio)?.audio;
      console.log('Audio Source:', audioSource); // Log the audio source

      if (audioElement && audioSource) {
        audioElement.src = audioSource;
        audioElement.style.display = 'block';
        audioElement.controls = true; // Ensure controls are visible
      } else if (audioElement) {
        audioElement.style.display = 'none';
      }

      // Display related URLs (if available)
      const relatedURLs = wordData.sourceUrls || [];
      const relatedURLsElement = document.getElementById('relatedURLs');
      relatedURLsElement.innerHTML = relatedURLs.length > 0 ? relatedURLs.map(url => `<a href="${url}" target="_blank">${url}</a>`).join('<br>') : 'No related URLs available';

    } else {
      document.getElementById('result').innerText = 'No definition found for the entered word.';
    }
  } catch (error) {
    console.error('An error occurred while fetching the word data:', error);
    document.getElementById('result').innerText = `An error occurred while fetching the word data. Please try again. Error: ${error.message}`;
  }
}
