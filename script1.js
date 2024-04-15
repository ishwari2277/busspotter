
document.getElementById('signin-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === '1' && password === 'abc') {
      var newTab = window.open('map.html');
  } else {
      alert('Invalid username or password');
  }
});
