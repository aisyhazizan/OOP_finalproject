document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value;
  
    const formData = { name, email, topic, message };
    
    displayFormData(formData);
  });
  
  document.getElementById('editButton').addEventListener('click', function() {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formData').style.display = 'none';
  });
   
  document.getElementById('deleteButton').addEventListener('click', function() {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formData').style.display = 'none';
  });
  
  document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
  
  function displayFormData(formData) {
    const displayData = `
      Name: ${formData.name}<br>
      Email: ${formData.email}<br>
      Topic: ${formData.topic}<br>
      Message: ${formData.message}
    `;
    
    document.getElementById('displayData').innerHTML = displayData;
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formData').style.display = 'block';
  }
  