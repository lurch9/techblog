//sign up form handler
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
        headers: { 'Content-Type': 'application/json' },
      });
      setTimeout(() => {
        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard');
        } 
      
        else {
          alert('Failed to log in.');
        }
      }, 1000);
  
  
    }
  };
  
// login form handler

const loginFormHandler = async (event) => {
    event.preventDefault();
    const emailLogin = document.querySelector("#email-login").value.trim();
    const passwordLogin = document.querySelector("#password-login").value.trim();
    console.log("LOGGED IN!")
    if (emailLogin && passwordLogin) {
        const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ emailLogin, passwordLogin }),
        headers: { 'Content-Type': 'application/json' },
        });
        setTimeout(() => {
          console.log(response)
          if (response.ok) {
            document.location.replace('/dashboard');
          } 
        
          else {
            alert('Failed to log in.');
          }

          
        }, 1000);
    }
}

//signup
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


//login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


