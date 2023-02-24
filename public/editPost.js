const newEditForm = async (event) => {
	event.preventDefault();
	const title = document.querySelector('#title-area').value.trim();
	const description = document.querySelector('#content-area').value.trim();
	const post_id = window.location.toString().split('/dashboard/');
	const id = post_id[1];
	console.log(`I really really need id ${id}`)
	if (title && description) {
		const response = await fetch(`/api/post/1`, {
			method: 'PUT',
			body: JSON.stringify({ title, description}),
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
