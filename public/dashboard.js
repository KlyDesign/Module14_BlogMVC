const newPostForm = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#title-area').value.trim();

	const description = document.querySelector('#content-area').value.trim();

	if (title && description) {
		const response = await fetch(`/api/post`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Could Not Post to the DB');
		}
	}
};


document
	.querySelector('#PostForm')
	.addEventListener('submit', newPostForm);
