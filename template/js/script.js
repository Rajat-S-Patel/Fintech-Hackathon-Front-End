

function setData(data){
        console.log('data',data["quoteResponse"]);
        document.getElementById("stock-name").innerHTML = data["quoteResponse"]["result"][0]["longName"];
        document.getElementById("stock-price").innerHTML = data["quoteResponse"]["result"][0]["regularMarketPrice"] + '$'; 
        document.getElementById("today-high").innerHTML = data["quoteResponse"]["result"][0]["regularMarketDayHigh"]+'$';
        document.getElementById("today-low").innerHTML = data["quoteResponse"]["result"][0]["regularMarketDayLow"]+'$';
        document.getElementById("52week-high").innerHTML = data["quoteResponse"]["result"][0]["fiftyTwoWeekHigh"]+'$';
        document.getElementById("52week-low").innerHTML = data["quoteResponse"]["result"][0]["fiftyTwoWeekLow"]+'$';
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
        let stockPriceChange = document.getElementById('stock-percentage');
        if(data.quoteResponse.result[0].regularMarketChange < 0){
            stockPriceChange.classList.add('text-danger');
            stockPriceChange.innerHTML = `<i class="mdi mdi-menu-down"></i>${Math.round(data.quoteResponse.result[0].regularMarketChange*1000)/1000}`;
        }
        else{
            stockPriceChange.classList.add('text-success');
            stockPriceChange.innerHTML = `<i class="mdi mdi-menu-up"></i>${data.quoteResponse.result[0].regularMarketChange}`;
        }
}
function readMore(event){
    let data = event.target.getAttribute('data-arg1');
    let p = document.getElementById('company-info');
    p.innerHTML = data;
    p.innerHTML+=`<a href="#" onclick=readLess(event) data-arg1="${data}"> read less</a>`;
    p.style.textAlign="justify";
}
function readLess(event){
    let data = (event.target) ? event.target.getAttribute('data-arg1'): event;
    let p = document.getElementById('company-info');
    p.innerHTML = data.slice(0,200);
    p.innerHTML+="<span>...</span>";
    p.innerHTML+=`<a href='#' onclick=readMore(event) data-arg1="${data}">read more</a>`;
    p.style.textAlign="justify";
}
function setSummaryInfo(data){
    let companyFinanceData = data.quoteSummary.result[0].financialData;
    document.getElementById("company-sector").innerHTML = data.quoteSummary.result[0].assetProfile.industry;
    document.getElementById('total-debt').innerHTML = companyFinanceData.totalDebt.fmt;
    document.getElementById('total-revenue').innerHTML=companyFinanceData.totalRevenue.fmt;
    document.getElementById('earning-growth').innerHTML=companyFinanceData.earningsGrowth.fmt;
    document.getElementById('revenue-growth').innerHTML=companyFinanceData.revenueGrowth.fmt;
    document.getElementById('debt-to-equity').innerHTML=companyFinanceData.debtToEquity.fmt;
    document.getElementById('return-on-equity').innerHTML=companyFinanceData.returnOnEquity.fmt;
    document.getElementById('revenue-per-share').innerHTML=companyFinanceData.revenuePerShare.fmt;

    let info = data.quoteSummary.result[0].assetProfile.longBusinessSummary;
    readLess(info);
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

function setRecommendations(data){
    let list = document.getElementById('recommendation-list');
    console.log('data:',data);
    data.sort((a,b)=>{
        return a.score - b.score;
    });
    for(let recommendation of data){
        let child = document.createElement('li');
        child.innerHTML=`<div class="w-100">
        <a href = 'index.html?stock=${recommendation.symbol}' class="d-flex">
        <label class="form-check-label">${recommendation.symbol}</label>
        </a>
        </div>`;
        list.appendChild(child);
    }
}

function setWatchList(data){
    let ul = document.getElementById('stock-watchlist');
    
    for(let stock of data){
        console.log('stock: ',stock);
        let li = getWatchListElement(stock);
        ul.appendChild(li);
    }
}

function tickerTapeSetData(data){
    
    let symbols = [];
   
    for(x of data){
        symbols.push({proName:x.stockId,title:x.name});
    }
    
    
    let tickerScript = document.createElement('script');
    tickerScript.src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    tickerScript.async=true;
    tickerScript.innerHTML=
    `{
        "symbols":`+ JSON.stringify(symbols) +`,
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": true,
        "displayMode": "adaptive",
        "largeChartUrl": "http://index.html?stock=AAPL",
        "locale": "in"
    }
    `;
    
    document.getElementById('tickertape-container').appendChild(tickerScript);
}
function setTechnicalWidget(stock){
    let technicalScript = document.createElement('script');
    technicalScript.src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    technicalScript.async=true;
    console.log('stock:',stock);
    technicalScript.innerHTML=`
    {
        "interval": "1m",
        "width": 340,
        "isTransparent": false,
        "height": 450,
        "symbol": "NASDAQ:${stock}",
        "showIntervalTabs": true,
        "locale": "in",
        "colorTheme": "light"
    }
    `;
    document.getElementById('technical-widget-container').appendChild(technicalScript);

}

function getWatchListElement(stock){
    let li = document.createElement('li');
    li.innerHTML = `
    <div class="container-fluid watchlist-item" id=${stock.stockId} >
      <input type="checkbox" class="form-check-input"  name="optionsRadios" id="optionsRadios1" value="">
      <label class="form-check-label">${stock.name + ' (' + stock.stockId + ')'}</label>
      <div style = "float:right;">
        <button class=" btn btn-icons btn-rounded btn-secondary" onclick="deleteStock(event)"><i class="mdi mdi-delete" onclick=""></i></button>
      </div>
    </div>
    `;
    return li;
}

async function getTrendingStocks(region="US"){
    const trendingStocks = await fetch('http://localhost:8080/get-trending-stocks/'+region)
    .then(response => response.json())

    return trendingStocks;
}

