
likeBtns = document.getElementsByClassName("like-post");

fetch(`/api/likes`)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
  for (let like of data){
    if (like.user_id ==) {

    }
  }
  
})

/*const likeButtonHandler = async (event) => {
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
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

  for (const btn of likeBtns) {
      btn.addEventListener("click", likeButtonHandler);
    }
    */