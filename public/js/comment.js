//CREATE a new comment
const newCommentForm = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('#commentContent').value.trim();

    if(commentContent) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({commentContent}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to post comment.');
        }
    }
};


// const deleteCommentForm = async (event) => {
//     if(event.target.hasAttribute('dataId')) {
//         const id = event.target.getAttrivute('dataId');

//         const response = await fetch(`/api/comments/${id}`, {
//             method: 'DELETE',
//         });

//         if(response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete comment.');
//         }
//     }
// };

document
  .querySelector('.newCommentForm')
  .addEventListener('submit', newCommentForm);

// document
//   .querySelector('.commentList')
//   .addEventListener('click', deleteCommentList);