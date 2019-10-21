

setInterval(function()
{ 
    const errors = document.querySelectorAll('.errz');

    errors.forEach((val) =>
    {
        val.style.display = 'none';
    })

}, 3000);