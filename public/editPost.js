const newEditForm = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#title-area').value.trim();
	const description = document.querySelector('#content-area').value.trim();
	const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
	if (title && description) {
		const response = await fetch(`/api/posts/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard/view');
		} else {
			alert('Could Not Post to the DB');
		}
	}
};

document
	.querySelector('#EditForm')
	.addEventListener('submit', newEditForm);
