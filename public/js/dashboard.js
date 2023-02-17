
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

  const editButtonHandler = async (event) => {
    const btn = event.target
    if (btn.hasAttribute('data-id')) {
      const id = btn.getAttribute('data-id');

      const parentEl = btn.parentElement;

      const oldContent = parentEl.children[2].textContent;
      
      
      editDiv = document.createElement('div')
      console.log(parentEl.childNodes)
      editDiv.innerHTML =`<textarea id="edit-area" maxlength="5000" cols="60" rows="20">${oldContent}</textarea>` + 
        `<button id="submitEditBtn" data-id="${id}">submit</button>`
      parentEl.replaceChild(editDiv, parentEl.children[2])
      parentEl.removeChild(parentEl.children[4])
      parentEl.removeChild(parentEl.children[3])

      const submitEditBtn = document.querySelector("#submitEditBtn")
      submitEditBtn.addEventListener("click", submitEditHandler)

    
    }
  };
  
  const submitEditHandler = async (event) => {
    const contentVal = document.querySelector('#edit-area').value.trim();
    const btn = event.target
    const id = btn.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content: contentVal }),
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit project');
    }
  }
  document
    .querySelector('#post-button')
    .addEventListener('click', newFormHandler);

  deleteBtns = document.getElementsByClassName("delete-post");
  for (const btn of deleteBtns) {
      btn.addEventListener("click", delButtonHandler);
    }

  editBtns = document.getElementsByClassName("edit-post");
  for (const btn of editBtns) {
      btn.addEventListener("click", editButtonHandler);
    }