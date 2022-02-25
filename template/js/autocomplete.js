const source = document.getElementById('watchlist-input');
let dropdown_element = document.getElementById("city-drop");

const searchInput = document.getElementById('search-input');
let searchRes = document.getElementById('stock-drop');


const inputHandler = async function(e) {
    const stock = e.target.value;
    console.log(e.target);
    get_stock(stock,dropdown_element);
    //console.log(stock)
}
const searchInputHandler = async function(e) {
    const stock = e.target.value;
    console.log(e.target);
    get_stock(stock,searchRes);
    //console.log(stock)
}

source.addEventListener('input', inputHandler);
searchInput.addEventListener('input',searchInputHandler);

searchInput.addEventListener('change',function(e) {
    let stock = e.target.value;
    let ticker = stock.slice(stock.indexOf("(")+1,stock.indexOf(")"));
    window.location.href="index.html?stock="+ticker;
});



async function get_stock(stock,dropdown){
    if(stock!=""){
    let ret = await fetch(`https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${stock}`,{
        headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'D19GOrOMZA8ymrT7LoUL3aEogUSsaSVt8Iq9SnQq'
        },
    })

    .then(res => res.json())
    .then(data => {
        dropdown.innerHTML = '';
        for (let i = 0; i < data["ResultSet"]["Result"].length; i++) {
            let element = data["ResultSet"]["Result"][i]["name"];
            let option = document.createElement('option');
            option.id=data["ResultSet"]["Result"][i]["symbol"];
            option.value = element + "(" + data["ResultSet"]["Result"][i]["symbol"] + ")";
            dropdown.appendChild(option);
        }
    });
    
    }   
}
