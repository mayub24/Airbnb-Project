const hotels = document.querySelectorAll(`.htl`);
const search = document.querySelector(`.inp`);

search.addEventListener(`keyup`, searchItem);

function searchItem()
{
    
    let val = search.value;

    console.log(val);

    
    hotels.forEach(itm => {
        if(itm.childNodes[3].childNodes[1].textContent.toLowerCase().indexOf(val) !== -1 || itm.childNodes[3].childNodes[3].textContent.toLowerCase().indexOf(val) !== -1 || itm.childNodes[3].childNodes[5].textContent.toLowerCase().indexOf(val) !== -1)
        {
            itm.style.display = `block`;
        }
        else
        {
            itm.style.display = `none`;
        }

    })
}
