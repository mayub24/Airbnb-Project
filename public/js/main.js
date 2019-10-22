// Setting time of error in register
setInterval(function()
{ 
    const errors = document.querySelectorAll('.errz');

    errors.forEach((val) =>
    {
        val.style.display = 'none';
    })

}, 6000);


// Clicking plus icon and showing lists
const one = document.querySelector('#plus1');
const two = document.querySelector('#plus2');
const three = document.querySelector('#plus3');
const heady = document.querySelector('.top-space');
const middle = document.querySelector('.middle-space');
const bottom = document.querySelector('.bottom-space');

let clicked = false;

one.addEventListener('click', () =>
{
    if(clicked == false)
    {
        heady.style.display = 'block';
        clicked = true;
    }
    else
    {
        heady.style.display = 'none';
        clicked = false;
    }
})

let clicked2 = false;

two.addEventListener('click', () =>
{
    if(clicked2 == false)
    {
        middle.style.display = 'block';
        clicked2 = true;
    }
    else
    {
        middle.style.display = 'none';
        clicked2 = false;
    }
})

let clicked3 = false;

three.addEventListener('click', () =>
{
    if(clicked3 == false)
    {
        bottom.style.display = 'block';
        clicked3 = true;
    }
    else
    {
        bottom.style.display = 'none';
        clicked3 = false;
    }
})
