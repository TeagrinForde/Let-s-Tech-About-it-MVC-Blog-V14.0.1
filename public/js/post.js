const newPostForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();

    if(title && content) {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to post blog.');
        }
    }
};

const editPost = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute('user_id');
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('post').value;

    if(postTitle && postContent) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({postTitle, postContent}),
            headers: {
                'Content-type': 'application/json'
            }
        })

        if(response.ok) {
            document.location.replace('/')
        } else {
            alert('Unable to update post at this time.')
        }
    }
}

const deletePostForm = async (event) => {
    if (event.target.hasAttribute('dataId')) {
        const id = event.target.getAttribute('dataId');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post.');
        }
    }
};

document
  .querySelector('.newPostForm')
  .addEventListener('submit', newPostForm);

document
  .querySelector('.postList')
  .addEventListener('click', deletePostForm);