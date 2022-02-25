let currency;
let stockSymbol;
let exchangeTimezoneName;
let gData=null;
let st=null;
let vpg=null;
let vpData=null;
let vpIR='';
let gIR='';
let vpRadio='Volume';
const stock = new URL(window.location.href).searchParams.get("stock");
let vpoptions={
  tooltips:{
    callbacks:{label:(label)=>{
      // console.log(label);
      return (label.value/1000000<1)? ((label.value/1000).toFixed(2)+'K') : ((label.value/1000000).toFixed(2)) + 'M';
      // return label.value;
    }}
  },
  scales:{
    yAxes: [{
      ticks:{
        callback:(label,index,labels)=>{
          return (label/1000000<1)? ((label/1000).toFixed(2)+'K') : ((label/1000000).toFixed(2)) + 'M';
        }
      }
    }]
  }
};
var graphGradient = document.getElementById("performaneLine2").getContext('2d');
var graphGradient2 = document.getElementById("performaneLine2").getContext('2d');
var saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
var saleGradientBg2 = graphGradient2.createLinearGradient(100, 0, 50, 150)
var graphGradient3 = document.getElementById("performaneLine3").getContext('2d');
var graphGradient32 = document.getElementById("performaneLine3").getContext('2d');
var saleGradientBg3 = graphGradient.createLinearGradient(5, 0, 5, 100);
var saleGradientBg32 = graphGradient2.createLinearGradient(100, 0, 50, 150);
async function fetchingData(interval,range){
  const headers = getHeader();
  const data = await fetch(
    `http://localhost:8080/get-chart-data/${stock}?range=${range}&region=IN&interval=${interval}&lang=en&events=div%2Csplit`,{
    headers:headers
  }
    // '../temp/chart-data.json'
  ).then(response => response.json());
  return data;
}
async function changeChartData(interval, range) {
  if(gIR==interval+range) return gData;
  gIR=interval+range;
  gData = await fetchingData(interval,range);
  document.getElementById('progress-line-chart')?.remove();
  if(st!=null)
  handlingGraph1();
  return gData;
}
function handlingGraph1(){
  let labelList = [];
  gData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
  console.log('chart-data,',gData.chart.result[0].indicators.quote[0].low);
  var salesTopData = {
    labels: labelList,
    datasets: [{
      label: 'Low',
      data: gData.chart.result[0].indicators.quote[0].low,
      backgroundColor: saleGradientBg,
      borderColor: [
        '#1F3BB3',
      ],
      borderWidth: 1.5,
      fill: true, // 3: no fill
      pointBorderWidth: 1,
      pointRadius: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill(4),
      pointHoverRadius: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill(2),
      pointBackgroundColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#1F3BB3'),
      pointBorderColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#fff)'),
    }, {
      label: 'High',
      data: gData.chart.result[0].indicators.quote[0].high,
      backgroundColor: saleGradientBg2,
      borderColor: [
        '#52CDFF',
      ],
      borderWidth: 1.5,
      fill: true, // 3: no fill
      pointBorderWidth: 1,
      pointRadius: new Array(gData.chart.result[0].indicators.quote[0].open.length).fill(4),
      pointHoverRadius: new Array(gData.chart.result[0].indicators.quote[0].open.length).fill(2),
      pointBackgroundColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#52CDFF'),
      pointBorderColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#fff'),
    }]
  };
  st.data=salesTopData;
  st.update();
}
async function handlingGraph(){
  document.getElementById('performance-line-legend2').innerHTML = '';
  document.getElementById('performaneLine2').innerHTML=''
  if ($("#performaneLine2").length) {    
    saleGradientBg.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
    saleGradientBg.addColorStop(1, 'rgba(26, 115, 232, 0.02)');
    saleGradientBg2.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
    saleGradientBg2.addColorStop(1, 'rgba(0, 208, 255, 0.03)');
    let labelList = []
    gData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
    console.log(labelList);
    var salesTopData = {
      labels: labelList,
      datasets: [{
        label: 'Low',
        data: gData.chart.result[0].indicators.quote[0].low,
        backgroundColor: saleGradientBg,
        borderColor: [
          '#1F3BB3',
        ],
        borderWidth: 1.5,
        fill: true, // 3: no fill
        pointBorderWidth: 1,
        pointRadius: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill(4),
        pointHoverRadius: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill(2),
        pointBackgroundColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#1F3BB3'),
        pointBorderColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#fff)'),
      }, {
        label: 'High',
        data: gData.chart.result[0].indicators.quote[0].high,
        backgroundColor: saleGradientBg2,
        borderColor: [
          '#52CDFF',
        ],
        borderWidth: 1.5,
        fill: true, // 3: no fill
        pointBorderWidth: 1,
        pointRadius: new Array(gData.chart.result[0].indicators.quote[0].open.length).fill(4),
        pointHoverRadius: new Array(gData.chart.result[0].indicators.quote[0].open.length).fill(2),
        pointBackgroundColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#52CDFF'),
        pointBorderColor: new Array(gData.chart.result[0].indicators.quote[0].close.length).fill('#fff'),
      }]
    };
    var salesTopOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            drawBorder: false,
            color: "#F0F0F0",
            zeroLineColor: '#F0F0F0',
          },
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            maxTicksLimit: 4,
            fontSize: 10,
            color: "#6B778C"
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            maxTicksLimit: labelList.length,
            fontSize: 10,
            color: "#6B778C"
          }
          
        }],
      },
      legend: false,
      legendCallback: function (chart) {
        var text = [];
        text.push('<div class="chartjs-legend"><ul>');
        for (var i = 0; i < chart.data.datasets.length; i++) {
          console.log(chart.data.datasets[i]); // see what's inside the obj.
          text.push('<li>');
          text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
          text.push(chart.data.datasets[i].label);
          text.push('</li>');
        }
        text.push('</ul></div>');
        return text.join("");
      },
      elements: {
        line: {
          tension: 0.4,
        }
      },
      tooltips: {
        backgroundColor: 'rgba(31, 59, 179, 1)',
      }
    }
    var salesTop = await new Chart(graphGradient, {
      type: 'line',
      data: salesTopData,
      options: salesTopOptions
    });
    st=await salesTop;
    console.log(salesTop);
    document.getElementById('performance-line-legend2').innerHTML = salesTop.generateLegend();
  }
}
async function changeVolPriceChartData(interval,range){
  if(vpIR==interval+range) return;
  vpIR=interval+range;
  vpData = await fetchingData(interval,range);
  if(vpg!=null)
  handlingGraphVP();
  return data;
}
function handlingGraphVP(){
  let labelList = [];
  vpData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
  var salesTopData = {
    labels: labelList,
    datasets: [{
        data:vpRadio==='Price'? vpData.chart.result[0].indicators.quote[0].close : vpData.chart.result[0].indicators.quote[0].volume,
        label:vpRadio,
        backgroundColor:'#3494e6'
      }]
  };
  console.log(vpg);
  vpg.config.options.tooltips.callbacks.label=(label)=>{
    // console.log(label);
    return (label.value/1000000<1)? ((label.value/1000).toFixed(2)+'K') : ((label.value/1000000).toFixed(2)) + 'M';
    // return label.value;
  };
  vpg.data=salesTopData;
  vpg.update();
}
async function changeVolPriceGraph(value){
  if(value==vpRadio) return;
  vpRadio=value;
  let length = vpData.chart.result[0].indicators.quote[0].close.length;
    let labelList = []
    vpData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
    var salesTopData = {
      labels: labelList,
      datasets: [{
          data: vpRadio==='Price'? vpData.chart.result[0].indicators.quote[0].close : vpData.chart.result[0].indicators.quote[0].volume,
          label:vpRadio,
          backgroundColor:'#3494e6'
        }]
    };
    vpg.config.options=vpoptions;
    vpg.data = salesTopData;
    vpg.update();
    console.log(vpg);
}
async function volPriceGraph(){
  if ($("#performaneLine3").length) {    
    saleGradientBg3.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
    saleGradientBg3.addColorStop(1, 'rgba(26, 115, 232, 0.02)');
    saleGradientBg32.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
    saleGradientBg32.addColorStop(1, 'rgba(0, 208, 255, 0.03)');
    let length = vpData.chart.result[0].indicators.quote[0].close.length;
    let labelList = []
    vpData.chart.result[0].timestamp.forEach(e => labelList.push(((new Date(e * 1000)).toLocaleDateString())));
    console.log(vpData.chart.result[0].indicators.quote[0].volume);
    var salesTopData = {
      labels: labelList,
      datasets: [{
          data:vpData.chart.result[0].indicators.quote[0].volume,
          label:'Volume',
          backgroundColor:'#3494e6'
        }]
    };
    var salesTop = await new Chart(graphGradient3, {
      type: 'bar',
      data: salesTopData,
      options:vpoptions,
      // options: {
      //   plugins: {
      //     legend: false,
      //   },
      //   elements: {
      //     bar: {
      //       backgroundColor:'#3494e6',
      //       borderColor: '#c5effd',
      //       borderWidth: 2
      //     }
      //   }
      // }
    });
    vpg=salesTop;
    document.getElementById('progress-bar-chart')?.remove();
    
    // document.getElementById('performance-line-legend3').innerHTML = salesTop.generateLegend();
  }
}
(function ($) {
  'use strict';
  $(async function () {
    vpData = await changeChartData('1mo','1y');
    // currency = vpData.chart.result.meta.currency;
    // stockSymbol = vpData.chart.result.meta.symbol;
    // exchangeTimezoneName = vpData.chart.result.meta.exchangeTimezoneName;
    handlingGraph();
    volPriceGraph();
  });
})(jQuery);