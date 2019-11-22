// FOCUS
let txtz = document.querySelectorAll("input");
txtz.forEach((val) =>
{
    val.addEventListener('focus', () =>
    {
        val.style.color = 'black';
        val.style.fontWeight = 'bold';
        val.style.backgroundColor = 'lightgray';
        val.style.border = '2px solid orange';
    })
});

// Blur
let blurz = document.querySelectorAll("input");
blurz.forEach((val) =>
{
    val.addEventListener('blur', () =>
    {
        val.style.border = "none";
        val.style.backgroundColor = 'white';
    })
});


// Functions to guess incorrect values right away
document.querySelector(`#fname`).addEventListener(`blur`, checkFirst);
document.querySelector(`#lname`).addEventListener(`blur`, checkLast);
document.querySelector(`#userName`).addEventListener(`blur`, checkName);
document.querySelector(`#pass`).addEventListener(`blur`, checkPass);
document.querySelector(`#adrs`).addEventListener(`blur`, checkAddress);
document.querySelector(`#mail`).addEventListener(`blur`, checkEmail);
document.querySelector(`#cpass`).addEventListener(`blur`, confirmPass);


function checkFirst()
{
    const fname = document.querySelector(`#fname`);
    const reg = /^[A-Za-z]{2,20}$/;

    if(!reg.test(fname.value))
    {
        fname.style.border = `2px solid red`;
        document.querySelector(`.f-err`).style.display = `block`;
    }
    else
    {
        document.querySelector(`.f-err`).style.display = `none`;
        fname.style.border = `2px solid lightgreen`;
    }
}


function checkLast()
{
    const lname = document.querySelector(`#lname`);
    const reg = /^[A-Za-z]{2,20}$/;

    if(!reg.test(lname.value))
    {
        lname.style.border = `2px solid red`;
        document.querySelector(`.l-err`).style.display = `block`;
    }
    else
    {
        document.querySelector(`.l-err`).style.display = `none`;
        lname.style.border = `2px solid lightgreen`;
    }
}


function checkName() // 1. Username
{
    const name = document.querySelector(`#userName`);
    const reg = /^[A-Za-z0-9]{2,20}$/; // $ means the text should be between 2-10 and shud end after the 10th character is entered

    if(!reg.test(name.value)) // if the test return true...
    {
        name.style.border = `2px solid red`;
        document.querySelector(`.desc`).style.display = `block`;
    }
    else // if the test returns false
    {
        document.querySelector(`.desc`).style.display = `none`;
        name.style.border = `2px solid lightgreen`;
    }
}

// DO THIS ALONG WITH ENABLED AND DISABLED BUTTON ON YOUR FORM

function checkPass() // 2. Password
{
    const pass = document.querySelector(`#pass`);
    const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?])[\w\d\W].{8,16}$/;

    if(!reg.test(pass.value))
    {
        pass.style.border = `2px solid red`;
        document.querySelector(`.passwrd`).style.display = `block`;
    }
    else
    {
        document.querySelector(`.passwrd`).style.display = `none`;
        pass.style.border = `2px solid lightgreen`;
    }
}

function confirmPass() // 2. Password
{
    const pass = document.querySelector(`#pass`);
    const cpass = document.querySelector('#cpass');

    if(pass.value !== cpass.value)
    {
        cpass.style.border = `2px solid red`;
        document.querySelector(`.c-passwrd`).style.display = `block`;
    }
    else
    {
        document.querySelector(`.c-passwrd`).style.display = `none`;
        cpass.style.border = `2px solid lightgreen`;
    }
}


function checkAddress() // 3. Address
{
    const addres = document.querySelector(`#adrs`);
    const reg = /^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})$/;

    if(!reg.test(addres.value))
    {
        addres.style.border = `2px solid red`;
        document.querySelector(`.ad-err`).style.display = `block`;
    }
    else
    {
        document.querySelector(`.ad-err`).style.display = `none`;
        addres.style.border = `2px solid lightgreen`;
    }
}


function checkEmail() // 4. Email
{
    const email = document.querySelector(`#mail`);
    const reg = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/;  // "+" means more characters after that certain group and '\' makes the next character a part of the values
    
    if(!reg.test(email.value)) // if the test returns true
    {
        email.style.border = `2px solid red`;
        document.querySelector(`.desc-eml`).style.display = `block`;
    }
    else // if the test returns false..
    {
        document.querySelector(`.desc-eml`).style.display = `none`;
        email.style.border = `2px solid lightgreen`;   
    }
}




