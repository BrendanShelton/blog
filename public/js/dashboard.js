
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

  const getContent = function (btn) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    
    // first child of the parent node
    let sibling  = btn.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings[2];
};

  const editButtonHandler = async (event) => {
    const btn = event.target
    if (btn.hasAttribute('data-id')) {
      const id = btn.getAttribute('data-id');

      const parentEl = btn.parentElement;

      const oldContent = parentEl.children[2].textContent;
      
      
      editDiv = document.createElement('div')
      console.log(parentEl.childNodes)
      editDiv.innerHTML =`<textarea maxlength="5000" cols="60" rows="20">${oldContent}</textarea>` + '<button>submit</button>"'
      parentEl.replaceChild(editDiv, parentEl.children[2])


      //
      /*editArea = document.createElement('textarea');
      submitEditBtn = document.createElement('button');
      editArea.textContent = oldContent
      submitEditBtn.textContent = 'submit edit'
      editDiv.appendChild(editArea);
      editDiv.appendChild(submitEditBtn);*/
      

    
    }
  };
  
  const submitEditHandler = async (event) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
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