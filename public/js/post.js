const newPostForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();

    if(title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to post blog.');
        }
    }
};

const deletePostForm = async (event) => {
    if (event.target.hasAttribute('dataId')) {
        const id = event.target.getAttribute('dataId');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            document.location.replace('/profile');
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