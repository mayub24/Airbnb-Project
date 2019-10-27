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
document.querySelector(`#userName`).addEventListener(`blur`, checkName);
document.querySelector(`#pass`).addEventListener(`blur`, checkPass);
document.querySelector(`#adrs`).addEventListener(`blur`, checkAddress);
document.querySelector(`#num`).addEventListener(`blur`, checkPhone);
document.querySelector(`#mail`).addEventListener(`blur`, checkEmail);

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
    const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?])[\w\d\W].{8,16}/;

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


function checkAddress() // 3. Address
{
    const addres = document.querySelector(`#adrs`);
    const reg = /^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})/;

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

function checkPhone()  // 5. Phone Number
{
    const phon = document.querySelector(`#num`);
// To explain the bottom line, the value MUST start with 3 digits, the "( )" are optional as they have question marks after them
// Then we say that "[-. ]" dash, dot and a space are optional by putting ? in front of them
// then we end of with 4 more digits
    const reg = /^\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/; 

    if(!reg.test(phon.value)) // if the test return false...
    {
        phon.style.border = `2px solid red`;
        document.querySelector(`.desc-num`).style.display = `block`;
    }
    else // if the test returns true...
    {
        
        phon.style.border = `2px solid lightgreen`;
        document.querySelector(`.desc-num`).style.display = `none`;
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




