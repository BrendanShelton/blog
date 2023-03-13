
likeBtns = document.getElementsByClassName("like-post");
welcomeEL = document.getElementById('welcome')
userId = welcomeEL.getAttribute('data-id')

fetch(`/api/likes`)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
  for (const btn of likeBtns) {
    let postId = btn.getAttribute('data-id')
    for (const like of data) {
      if (like.user_id == userId && like.post_id == postId) {
        btn.setAttribute("class", "liked")
        console.log(`class added button on post ${like.post_id}`)
      }
    }
  }
  
})

const likeButtonHandler = async (event) => {
  event.stopPropagation();
  console.log("like button clicked")
  console.log(event.target.hasAttribute('data-id'))
  console.log(event.target)
    if (event.target.hasAttribute('data-id')) {
      console.log('has data-id')
      const id = event.target.getAttribute('data-id');
      const checkLiked = event.target.getAttribute('class');
      console.log(id)
      if (checkLiked == 'liked') {
        console.log('unlike')
        const response = await fetch(`/api/likes/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          //document.location.replace('/');
        } else {
          alert('Failed to unlike');
        }
      } else {
        console.log('like')
        console.log(id)
        const response = await fetch(`/api/likes`, {
          method: 'POST',
          body: JSON.stringify({ post_id: id, user_id: userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          //document.location.replace('/');
        } else {
          alert('Failed to like post');
        }
      }
      
    }  

      
    }
  

  for (const btn of likeBtns) {
      btn.addEventListener("click", likeButtonHandler);
    }
