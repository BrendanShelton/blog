const newFormHandler = async (event) => {
    event.preventDefault();
  
    const contentVal = document.querySelector('#comment-content').value.trim();
    const id = event.target.hasAttribute('data-id')
    if (contentVal) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: contentVal, post_id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
    .querySelector('#comment-button')
    .addEventListener('click', newFormHandler);
