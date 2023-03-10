const newEditForm = async (event) => {
	event.preventDefault();
	const title = document.querySelector('#title-area').value.trim();
	const description = document.querySelector('#content-area').value.trim();
	console.log(description)
	const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
	if (title && description) {
		const response = await fetch(`/api/post/${id}`, {
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

const deletePost = async (event) => {
	event.preventDefault();
	const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
	const response = await fetch(`/api/post/${id}`, {
		method: 'DELETE'
	});
	if (response.ok) {
        document.location.replace('/dashboard/view');
    } 
	else {
        alert('Could Not Post to the DB');
    }
};
document
	.querySelector('#editPost')
	.addEventListener('click', newEditForm);

document
	.querySelector('#deletePost')
	.addEventListener('click', deletePost);