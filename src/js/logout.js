document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }); 