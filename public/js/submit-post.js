//submit data to create post
async function formHandler(event) {
    event.preventDefault();
    const post_title = document.querySelector("#post-title").value.trim();
    const post_data = document.querySelector("#post-content").value.trim();

    const response = await fetch (`/dashboard`, {
        method: "POST",
        body: JSON.stringify({
            post_title,
            post_data
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert("cannot find any properties");
    }
}

//code to delete post
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/dashboard/post/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  //code to update post
  const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const post_title = document.querySelector("#post-title").value.trim();
      const post_data = document.querySelector("#post-content").value.trim();

      const response = await fetch(`/dashboard/post/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_data
        }),
        headers: {
            "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard/post/update/${id}`);
      } else {
          console.log("RESPONSE", response)
        alert('Failed to update project');
      }
    }
  };


document.querySelector(".post-data").addEventListener("submit", formHandler);
document.querySelectorAll('.post-delete').forEach(node => node.addEventListener('click', delButtonHandler));
document.querySelectorAll('.post-update').forEach(node => node.addEventListener('click', updateButtonHandler));