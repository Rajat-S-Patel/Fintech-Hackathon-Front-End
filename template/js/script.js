async function basic_value(){

    fetch("./js/reliance.json")
    .then(response => response.json())
    .then(data => {
        
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
    });

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

function get_news(){
    fetch("./js/newsresponse.json")
    .then(response => response.json())
    .then(data => {
        console.log(data["data"][0]);
        document.getElementById("news-1-title").innerHTML = data["data"][0]["title"];
        document.getElementById("news-2-title").innerHTML = data["data"][1]["title"];
        document.getElementById("news-3-title").innerHTML = data["data"][2]["title"];
        document.getElementById("news-1-img").src = data["data"][0]["image_url"];
        document.getElementById("news-2-img").src = data["data"][1]["image_url"];
        document.getElementById("news-3-img").src = data["data"][2]["image_url"];
    })
}

basic_value();
recommedation_value();
get_news();