document.getElementById('goToDictionaryView').addEventListener('click', () => {
  window.location.href = 'dictionary.html';
});

document.getElementById('goToCrudView').addEventListener('click', () => {
  window.location.href = 'crud.html';
});

document.getElementById('goToWotdView').addEventListener('click', () => {
  window.location.href = 'wotd.html';
});
 
document.getElementById('goToHomeFromDictionary')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('goToHomeFromCrud')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('goToHomeFromWotd')?.addEventListener('click', () => {
  window.location.href = 'index.html';
}); 

document.getElementById('goToHomeFromHelp')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('contactLink').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'contact.html';
});

document.getElementById('wordOfYearLink').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'wordOfTheYear.html';
});

document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = 'login.html';
});

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

document.getElementById('login-btn').style.display = isLoggedIn ? 'none' : 'block';
document.getElementById('logout-btn').style.display = isLoggedIn ? 'block' : 'none';

document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
});