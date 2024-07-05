document.getElementById('login-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Implement Google OAuth login logic here
    // For demonstration purposes, we'll use a simple redirect
    localStorage.setItem('isLoggedIn', true);
    window.location.href = 'index.html';
  }); 