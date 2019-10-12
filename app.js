function optionChanged(wardnumber){
    var wfreq = 0;
    d3.json("resources/Ward_Data_array.json").then((data) => {
        var warddata = data.ward_data.filter(function(warddata){
            return warddata.ward_number == wardnumber;
        })[0];
        
        // var samples = data.samples.filter(function(samples){
        //     return samples.wardnumber == wardnumber;
        // })[0];

        // wfreq = warddata.wfreq;

        // // Update the sample-warddata
        var samplePanel = d3.select("#sample-warddata"); 
        samplePanel.html("");
        // Object.entries(warddata).forEach(([key, value]) => {
        //     samplePanel.append("p").text(`${key} : ${value}`)
        // });
        samplePanel.append("p").text(warddata.ward_name );
// var mapArrow1 = theStagesOfJS.map((item) => {
//   return item;
// });



        // // * Use `sample_values` as the values for the bar chart.
        var crimeIds = warddata.crimes.map((item) => {
            return parseFloat(item/10000)
        }); 
        // // * Use `otu_ids` as the labels for the bar chart.
        var mcis = warddata.mci;
        // //* Use `otu_labels` as the hovertext for the chart.
        var occurrenceyears = warddata.occurrenceyear;
        
        // var trace1 = {
        //     x: sampleValues.slice(0,10).reverse(),
        //     y: otuIds.slice(0,10).map(function(e){return "OTU " + e.toString()}).reverse(),
        //     hovertext: otuLabels.slice(0,10).reverse(),
        //     orientation: "h",
        //     hoverinfo: "text",
        //     type: "bar"
        //   };
          
        // var bardata = [trace1];
          
        // Plotly.newPlot("bar", bardata);

        var trace2 = {
            // * Use `otu_ids` for the x values.
            y: crimeIds,
            // * Use `sample_values` for the y values.
            x: warddata.occurrencedayofweek ,//parseInt(warddata.occurrenceyears),
            // * Use `sample_values` for the marker size.
            // * Use `otu_ids` for the marker colors.
            mode: "markers",
            marker:{
              size: crimeIds,
              color: warddata.occurrencedayofweek // parseInt(warddata.occurrenceyears)
            },
            // * Use `otu_labels` fomcir the text values.
            text: mcis
            };

        bubbleData = [trace2];

        var bubbleLayout = {
              xaxis:{title: "OTU ID"}
            };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      
        // buildGauge(wfreq);

    });
};

// function buildGauge(wfreq) {
//     // Enter the Washing Frequency Between 0 and 180
//     let level = parseFloat(wfreq) * 20;
//     // Trigonometry to Calculate Meter Point
//     let degrees = 180 - level;
//     let radius = 0.5;
//     let radians = (degrees * Math.PI) / 180;
//     let x = radius * Math.cos(radians);
//     let y = radius * Math.sin(radians);
//     // Path May Have to Change to Create a Better Triangle
//     let mainPath = "M-.0 -0.05 L  .0 0.05 L";
//     let pathX = String(x);
//     let space = " ";
//     let pathY = String(y);
//     let pathEnd = " Z";
//     let path = mainPath.concat(pathX, space, pathY, pathEnd);
    
//     let data = [
//         {
//             type: "scatter",
//             x:[0],
//             y:[0],
//             marker: { size: 12, color: "850000" },
//             showlegend: false,
//             text: level,
//             hoverinfo: "text+name"
//         },
//         {
//             values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
//             rotation: 90,
//             text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//             textinfo: "text",
//             textposition: "inside",
//             marker: {
//                 colors: [
//                     "rgba(0,105,11,.5)",
//                     "rgba(10,120,22,.5)",
//                     "rgba(14,127,0,.5)",
//                     "rgba(110,154,22,.5)",
//                     "rgba(170,202,42,.5)",
//                     "rgba(202,209,95,.5)",
//                     "rgba(210,206,145,.5)",
//                     "rgba(232,226,202,.5)",
//                     "rgba(240, 230,215,.5)",
//                     "rgba(255,255,255,0)"
//                 ]
//             },
//             labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
//             hoverinfo: "label",
//             hole: 0.5,
//             type: "pie",
//             showlegend: false
//         }
//     ]
//     var layout = {
//         shapes: [
//             {
//                 type: "path",
//                 path: path,
//                 fillcolor: "850000",
//                 line: {
//                     color: "850000"
//                 }
//             }
//         ],
//         title: "Belly Button Washing Frequency <br> Scrubs per Week",
//         height: 500,
//         width: 500,
//         xaxis: {
//             zeroline:false,
//             showticklabels: false,
//             showgrid: false,
//             range: [-1, 1]
//         },
//         yaxis: {
//             zeroline: false,
//             showticklabels: false,
//             showgrid: false,
//             range: [-1, 1]
//         }
//     }
//     Plotly.newPlot("gauge", data, layout);
// };

function init(){
    var dropDown = d3.select("#selDataset");
    
    d3.json("resources/Ward_Data_array.json").then((data) => {
        var firstWard = data.ward_number[0];
        // Populate the dropdown with subjectIDs
        data.ward_number.forEach((id) => {
            dropDown
                .append("option")
                .text(id)
                .property("value",id);
        });

        // Refresh page with data from firstWard
        optionChanged(firstWard);
    });
};  

init();