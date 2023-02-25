const newCommentForm = async (event) => {
	event.preventDefault();
	const description_comment = document.querySelector('#comment-text').value.trim();
	const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

	if (description_comment) {
		const response = await fetch(`/api/comment`, {
			method: 'POST',
			body: JSON.stringify({ description_comment, post_id }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Could Not Post to the DB');
		}
	}
};

window.addEventListener("load", (event) => {
	document.querySelector('#commentForm').style.display = 'none';
  });

const showCommentForm = async (event) => {
	event.preventDefault();
	document.querySelector('#showCommentForm').style.display = 'none';
	document.querySelector('#commentForm').style.display = 'block';
}
document
	.querySelector('#commentButton')
	.addEventListener('click', newCommentForm);


document
.querySelector('#showCommentForm')
.addEventListener('click', showCommentForm);