let entries = [];

function displayEntries() {
  const entriesContainer = document.getElementById('entries');
  entriesContainer.innerHTML = '';

  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.className = 'entry';
    entryElement.innerHTML = `
      <span class="entry-text" id="entry-${entry.id}">${entry.text}</span>
      <button onclick="editEntry(${entry.id})">Update</button>
      <button onclick="deleteEntry(${entry.id})">Delete</button>
    `;
    entriesContainer.appendChild(entryElement);
  });
} 

function editEntry(id) {
  const entry = entries.find(e => e.id === id);
  const entryElement = document.getElementById(`entry-${id}`);
  entryElement.innerHTML = `
    <input type="text" id="edit-${id}" value="${entry.text}">
    <button onclick="saveEntry(${id})">Save</button>
  `;
}

function saveEntry(id) {
  const newValue = document.getElementById(`edit-${id}`).value.trim();
  if (!newValue) {
    alert("Please enter a value");
    return;
  }

  const entry = entries.find(e => e.id === id);
  entry.text = newValue;

  displayEntries();
}

function deleteEntry(id) {
  entries = entries.filter(e => e.id !== id);
  displayEntries();
}

document.getElementById('addEntry').addEventListener('click', () => {
  const newEntryText = document.getElementById('newEntry').value.trim();
  if (!newEntryText) {
    alert("Please enter a value");
    return;
  }

  const newEntry = { id: Date.now(), text: newEntryText };
  entries.push(newEntry);

  document.getElementById('newEntry').value = '';
  displayEntries();
});

displayEntries();
