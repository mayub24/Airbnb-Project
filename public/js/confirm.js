const btn = document.querySelectorAll(`#del`);

btn.forEach((check) =>
{
    check.addEventListener('click', (e) =>
    {
        const sure = confirm('Are you sure you want to delete this room?');

        if(!sure)
        {
            e.preventDefault();
        }
        else
        {
            alert('Room has been deleted.');
        }
    })
})