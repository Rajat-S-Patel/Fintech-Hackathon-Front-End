let cg = null;
let cgData = null;
let cgIR = '';
var graphGradient4 = document.getElementById("performaneLine4").getContext('2d');
var graphGradient42 = document.getElementById("performaneLine4").getContext('2d');
var saleGradientBg4 = graphGradient4.createLinearGradient(5, 0, 5, 100);
var saleGradientBg42 = graphGradient42.createLinearGradient(100, 0, 50, 150);
let stocks = [];

async function fetchingData(interval, range) {
    let data = null;
    let path = setPath();
    if(path == "") path="AAPL?comparisons=MSFT%2C%5EVIX%2CDELL";

    await fetch(
        'https://yfapi.net/v8/finance/chart/'+path+'&range='+range+'&region=IN&interval='+interval+'&lang=en&events=div%2Csplit',{
        headers:{
            'Content-Type':'application/json',
            'X-API-KEY': 'gaTwKeugSDIAeHd6ahRA3Eday9su6d555DL4ELw9'
        }}
        // '../temp/chart-data.json'
    ).then(
        response => response.json()
    ).then(d => data = d);
    return data;
}
function setWatchlistMeta() {
    document.getElementById('watchlistMeta').innerHTML =
        'In ' + cgData.chart.result[0].meta.currency + ', as per ' + cgData.chart.result[0].meta.exchangeTimezoneName + ' Timezone';
}
function handlingCompareGraph() {
    cg.data = configComparisionData();
    cg.update();
}

async function changeCompChart(interval, range) {
    if (cgIR == interval + range) return;
    cgIR = interval + range;
    cgData = await fetchingData(interval, range);
    if (cg != null)
        handlingCompareGraph();
}
function configComparisionData() {
    let data = [];
    let length = cgData.chart.result[0].comparisons.length;
    let temp = 0;
    let colors = [
        'rgb(153, 102, 255)',
        'rgb(51, 203, 207)',
        '#003f5c',
        '#9a4f0c',
        '#665121',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
    ];
    data.push({
        fill: false,
        label: cgData.chart.result[0].meta.symbol,
        borderColor: colors[temp],
        backgroundColor: (colors[temp++]),
        data: cgData.chart.result[0].indicators.quote[0].close
    });
    cgData.chart.result[0].comparisons.forEach(e => {
        data.push({
            fill: false,
            label: e.symbol,
            data: e.close,
            borderColor: colors[temp],
            backgroundColor: (colors[temp++])
        });
    });
    console.log(data);
    let labelList = []
    cgData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
    console.log(cgData.chart.result[0].indicators.quote[0].volume);
    var salesTopData = {
        labels: labelList,
        datasets: data
    };
    return salesTopData;
}
async function comparisionGraph() {
    if ($("#performaneLine4").length) {
        saleGradientBg4.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
        saleGradientBg4.addColorStop(1, 'rgba(26, 115, 232, 0.02)');
        saleGradientBg42.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
        saleGradientBg42.addColorStop(1, 'rgba(0, 208, 255, 0.03)');

        var salesTop = await new Chart(graphGradient4, {
            type: 'line',
            data: configComparisionData(),
            options:{
                responsive:true,
                aspectRatio:4
            }
        });
        
        cg = await salesTop;
        console.log(salesTop);
        document.getElementById('performance-line-legend4').innerHTML = salesTop.generateLegend();
    }
}
function setPath(){
    // AAPL?comparisons=
    if(stocks.length == 0) return "";
    let path = stocks[0]+"?comparisons=";
    for(let i=1;i<stocks.length;i++) path+=stocks[i]+",";
    return path;
}
async function stockAdded(){
    let path = setPath();
    cgData = await fetchingData('1mo', '1y');
    if (cg != null)
        handlingCompareGraph();
}
function addToCompare(event){
    event.stopPropagation();
    let target = event.currentTarget;
    let stock = target.id;
    if(target.checked && stocks.indexOf(stock)== -1){
        stocks.push(stock);
    }
    else{
        stocks.splice(stocks.indexOf(stock),1);
    }
    stockAdded();
}

(function ($) {
    'use strict';
    $(async function () {
        await changeCompChart('1mo', '1y');
        comparisionGraph();
        setWatchlistMeta();
    });
})(jQuery);