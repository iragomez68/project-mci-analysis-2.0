function optionChanged(wardnumber){
    var wfreq = 0;
         d3.json("resources/Ward_MCI_Data.json").then((data) => {
        var warddata = data.ward_data.filter(function(warddata){
            return warddata.ward_number == wardnumber;
        })[0];
        
        var samplePanel = d3.select("#sample-warddata"); 
        samplePanel.html("");
        samplePanel.append("p").text(warddata.ward_name );
         var mcis= warddata.MCI;

          var crime = warddata.MCI.map((item) => {
            return item.name
       
    
        });

    


     
        var crimeCount = warddata.MCI.map((item) => {
            return item.count
       
    
        });




        console.log(warddata.location)
        
        var trace1 = {
             x: crimeCount,
            y: crime,
            orientation: "h",
            hoverinfo: "text",
            type: "bar",
            marker: {
                      color: 'rgba(255,153,51,0.6)',
                      width: 1
                    }
          };
          
        var bardata = [trace1];
          
        Plotly.newPlot("bar", bardata);

        var data = [{
            values: crimeCount,
            labels: crime,
            type: "pie"
          }];
          
          var layout = {
            height: 400,
            width: 500
          };
          
          Plotly.newPlot("pie", data, layout);

    });

};


function init(){
    var dropDown = d3.select("#selDataset");

         d3.json("resources/Ward_MCI_Data.json").then((data) => {
        var firstWard = data.ward_number[0];
        // Populate the dropdown with subjectIDs
        data.ward_number.forEach((id) => {
            dropDown
                .append("option")
                .text(id)
                .property("value",id);
        });
        optionChanged(firstWard);
    });

    
};  

init();


