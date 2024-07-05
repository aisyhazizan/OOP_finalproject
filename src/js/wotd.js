document.addEventListener('DOMContentLoaded', () => {
    const wotdDateElement = document.getElementById('wotd-date');
    const wotdWordElement = document.getElementById('wotd-word');
    const wotdDefinitionElement = document.getElementById('wotd-definition');
    const wotdAudioElement = document.getElementById('wotd-audio');
    const editContainer = document.getElementById('edit-container');
    const editWordInput = document.getElementById('editWord');
    const editDefinitionInput = document.getElementById('editDefinition');
    const editWotdButton = document.getElementById('editWotd');
    const deleteWotdButton = document.getElementById('deleteWotd');
    const saveWotdButton = document.getElementById('saveWotd');
  
    // Generate a random word based on the day and date
    function generateRandomWord() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const randomWord = `word-${day}-${month}-${year}`;
        return randomWord;
    }
  
    // Fetch the Word of the Day from the server (or local storage)
    function fetchWotd() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        const wotdDate = `${day}-${month}-${year}`;
        const wotdKey = `word-${wotdDate}`;
      
        console.log('Current Date:', wotdDate);
        wotdDateElement.textContent = `Date: ${wotdDate}`;
      
        let wotd = localStorage.getItem(wotdKey);
      
        if (!wotd) {
          wotd = JSON.stringify({
            word: wotdKey,
            definition: `Definition for ${wotdKey}`,
            audio: ''
          });
          localStorage.setItem(wotdKey, wotd);
        }
      
        const { word, definition, audio } = JSON.parse(wotd);
        console.log('Fetched WOTD:', { word, definition, audio });
      
        wotdWordElement.textContent = word;
        wotdDefinitionElement.textContent = definition;
        if (audio) {
          wotdAudioElement.src = audio;
          wotdAudioElement.style.display = 'block';
        } else {
          wotdAudioElement.style.display = 'none';
        }
      }
  
    // Edit WOTD
    editWotdButton.addEventListener('click', () => {
        editContainer.style.display = 'block';
        editWordInput.value = wotdWordElement.textContent;
        editDefinitionInput.value = wotdDefinitionElement.textContent;
    });
  
    // Save WOTD
    saveWotdButton.addEventListener('click', () => {
      const updatedWord = editWordInput.value;
      const updatedDefinition = editDefinitionInput.value;
      const wotdDate = wotdDateElement.textContent.replace('Date: ', ''); // Extract the date from displayed text
      const wotdKey = `word-${wotdDate}`;

      const updatedWotd = {
          word: updatedWord,
          definition: updatedDefinition,
          audio: wotdAudioElement.src // Assuming audio remains unchanged
      };

      localStorage.setItem(wotdKey, JSON.stringify(updatedWotd));
      fetchWotd();
      editContainer.style.display = 'none';
    });
  
    // Delete WOTD
    deleteWotdButton.addEventListener('click', () => {
      const wotdDate = wotdDateElement.textContent.replace('Date: ', ''); // Extract the date from displayed text
      const wotdKey = `word-${wotdDate}`;
  
      localStorage.removeItem(wotdKey);
      // Clear the displayed content
      wotdWordElement.textContent = '';
      wotdDefinitionElement.textContent = '';
    });
  
    fetchWotd();
  }); 
  