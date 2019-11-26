let showNav = false;

const bar = document.querySelector('#barz').addEventListener('click', displayNav);

function displayNav()
{
    if(showNav == false)
    {
        document.querySelector('.chng').classList.add('show');
        showNav = true;
    }
    else
    {
        document.querySelector('.chng').classList.remove('show');
        showNav = false;
    }
}