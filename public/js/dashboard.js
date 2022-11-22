
const newFormHandler = async (event) => {
    event.preventDefault();
    
    const contentVal = document.querySelector('#post-content').value.trim();
    const titleVal = document.querySelector('#post-title').value.trim();
    console.log(contentVal, titleVal)
    if (contentVal) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ content: contentVal, title: titleVal }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('#post-button')
    .addEventListener('click', newFormHandler);

  btns = document.getElementsByClassName("delete-post");
  for (const btn of btns) {
      btn.addEventListener("click", delButtonHandler);
    }