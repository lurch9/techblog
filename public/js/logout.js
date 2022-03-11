const logout = async () => {
    const response = await fetch('/api/user/logout');
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout')?.addEventListener('click', logout);