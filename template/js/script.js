function setData(data){
        console.log('data',data["quoteResponse"]);
        document.getElementById("stock-name").innerHTML = data["quoteResponse"]["result"][0]["longName"];
        document.getElementById("stock-price").innerHTML = data["quoteResponse"]["result"][0]["regularMarketPrice"]; 
        document.getElementById("stock-percentage").innerHTML = data["quoteResponse"]["result"][0]["regularMarketChange"].toFixed(2);
        document.getElementById("today-high").innerHTML = data["quoteResponse"]["result"][0]["regularMarketDayHigh"];
        document.getElementById("today-low").innerHTML = data["quoteResponse"]["result"][0]["regularMarketDayLow"];
        document.getElementById("52week-high").innerHTML = data["quoteResponse"]["result"][0]["fiftyTwoWeekHigh"];
        document.getElementById("52week-low").innerHTML = data["quoteResponse"]["result"][0]["fiftyTwoWeekLow"];
        document.getElementById("market-cap").innerHTML = data["quoteResponse"]["result"][0]["marketCap"];
        document.getElementById("ask-price").innerHTML = data["quoteResponse"]["result"][0]["ask"]; 
        document.getElementById("market-open").innerHTML = data["quoteResponse"]["result"][0]["regularMarketOpen"];
        document.getElementById("fifty-day-range").innerHTML = data["quoteResponse"]["result"][0]["fiftyDayAverage"];
        document.getElementById("pe-ratio").innerHTML = data["quoteResponse"]["result"][0]["trailingPE"];
        document.getElementById("no-of-share").innerHTML = data["quoteResponse"]["result"][0]["sharesOutstanding"];
        document.getElementById("bid-price").innerHTML = data["quoteResponse"]["result"][0]["bid"];
        document.getElementById("market-close").innerHTML = data["quoteResponse"]["result"][0]["regularMarketPreviousClose"];
        document.getElementById("two-hundred-day-range").innerHTML = data["quoteResponse"]["result"][0]["twoHundredDayAverage"];
        document.getElementById("market-volume").innerHTML = data["quoteResponse"]["result"][0]["regularMarketVolume"];

}

async function recommedation_value(){

    fetch("./js/recommendation.json")
    .then(response => response.json())
    .then(data =>{
        console.log(data["finance"]["result"]) 
        document.getElementById("stock-rec-1").innerHTML = data["finance"]["result"][0]["recommendedSymbols"][0]["symbol"];
        document.getElementById("stock-rec-2").innerHTML = data["finance"]["result"][0]["recommendedSymbols"][1]["symbol"];
        document.getElementById("stock-rec-3").innerHTML = data["finance"]["result"][0]["recommendedSymbols"][2]["symbol"];
    })

}

function setNews(data){
    let table = document.getElementById('news-table');
    for(let news of data["news"]){
        let row = document.createElement("tr");
        
        row.innerHTML = `<td id="${news.uuid}">

        <div class="d-flex news-div" onclick="window.open('${news.url}','_blank')">
        <img  src="${news['imageUrl']}" style="padding-right: 5px;">
          <p  >${news['title']}</p>
        <div>
          
      </td>`
      table.appendChild(row);
    }
    
}

function setMoreInfo(data){
    document.getElementById("market-cap").value=data["marketCap"];
    document.getElementById("ask-price").value=data["ask"];
    document.getElementById("market-open").value=data["regularMarketOpen"];
    document.getElementById("fifty-day-range").value=data["fiftyDayAverage"];
    document.getElementById("pe-ratio").value=data["trailingPE"];
    document.getElementById("no-of-share").value=data["sharesOutstanding"];
    document.getElementById("bid-price").value=data["bid"];
    document.getElementById("market-close").value=data["regularMarketPreviousClose"];
    document.getElementById("two-hundred-day-range").value=data["twoHundredDayAverage"];
    document.getElementById("market-volume").value=data["regularMarketVolume"];
    
}