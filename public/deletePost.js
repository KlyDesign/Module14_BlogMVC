const deletePost = async (event) => {
	event.preventDefault();
    let id = document.getElementsById('delVal').value;
    console.log(id)
    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard/view');
    } else {
        alert('Could Not Post to the DB');
    }
};
document
	.getElementsById('deletePost')
	.addEventListener('submit', deletePost);