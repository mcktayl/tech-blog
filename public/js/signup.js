const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#exampleInputEmail1').value.trim();
  const password = document
    .querySelector('#exampleInputPassword1')
    .value.trim();
  const user_name = document.querySelector('#exampleInputUser1').value.trim();

  if (email && password && user_name) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ email, password, user_name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
