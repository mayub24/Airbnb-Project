// Setting time of error in register
setInterval(function()
{ 
    const errors = document.querySelectorAll('.errz');

    errors.forEach((val) =>
    {
        val.style.display = 'none';
    })

}, 15000);


// Clicking plus icon and showing lists
const one = document.querySelector('#plus1');
const two = document.querySelector('#plus2');
const three = document.querySelector('#plus3');
const heady = document.querySelector('.top-space');
const middle = document.querySelector('.middle-space');
const bottom = document.querySelector('.bottom-space');
const minus1 = document.querySelector(`#minus1`);
const minus2 = document.querySelector(`#minus2`);
const minus3 = document.querySelector(`#minus3`);


let clicked = false;
let sem = false;
let sem2 = false;
let sem3 = false;

one.addEventListener('click', () =>
{
    if(clicked == false)
    {
        heady.style.display = 'block';
        one.style.display = 'none';
        minus1.style.display = 'block';
        clicked = true;
        sem = true;
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
        two.style.display = 'none';
        minus2.style.display = 'block';
        clicked2 = true;
        sem2 = true;
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
        three.style.display = 'none';
        minus3.style.display = 'block';
        clicked3 = true;
        sem3 = true;
    }
    else
    {
        bottom.style.display = 'none';
        clicked3 = false;
    }
})



// MINUS 1 TRUE
minus1.addEventListener(`click`, () =>
{
    if(sem == true)
    {
        one.style.display = 'block';
        heady.style.display = 'none';
        sem = false;
    }
    else
    {
        one.style.display = 'none';
        heady.style.display = 'block';
        sem = true;
    }
});


// MINUS 2 TRUE
minus2.addEventListener(`click`, () =>
{
    if(sem2 == true)
    {
        two.style.display = 'block';
        middle.style.display = 'none';
        sem2 = false;
    }
    else
    {
        two.style.display = 'none';
        middle.style.display = 'block';
        sem2 = true;
    }
});




// MINUS 3 TRUE
minus3.addEventListener(`click`, () =>
{
    if(sem3 == true)
    {
        three.style.display = 'block';
        bottom.style.display = 'none';
        sem3 = false;
    }
    else
    {
        three.style.display = 'none';
        bottom.style.display = 'block';
        sem3 = true;
    }
});