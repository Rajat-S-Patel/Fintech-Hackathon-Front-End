const source = document.getElementById('watchlist-input');
let dropdown_element = document.getElementById("city-drop");


const inputHandler = async function(e) {
    const stock = e.target.value;
    console.log(e.target);
    get_stock(stock)
    //console.log(stock)
}


source.addEventListener('input', inputHandler);

source.addEventListener('change',function(e) {
    console.log('You selected: ',e.target.value);
});



async function get_stock(stock){
    if(stock!=""){
    let ret = await fetch(`https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${stock}`,{
        headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'gaTwKeugSDIAeHd6ahRA3Eday9su6d555DL4ELw9'
        },
    })

    .then(res => res.json())
    .then(data => {
        dropdown_element.innerHTML = '';
        for (let i = 0; i < data["ResultSet"]["Result"].length; i++) {
            let element = data["ResultSet"]["Result"][i]["name"];
            let option = document.createElement('option');
            option.id=data["ResultSet"]["Result"][i]["symbol"];
            option.value = element + "(" + data["ResultSet"]["Result"][i]["symbol"] + ")";
            dropdown_element.appendChild(option);
        }
    });
    
    }   
}
