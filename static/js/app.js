// drop down ID no.
var select = d3.select('select');
// demographic info section
var pnl = d3.select('.panel-body');


d3.json('samples.json').then(data => {
    console.log(data.samples[0]);

    var names = data.names;

    names.forEach(name => {
        select.append('option').text(name).property('value',name);
    });

    showDemo(names[0]);
    
    function showDemo(name) {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        Object.entries(metadata).forEach(([key,val]) => {
            pnl.append('h5').text(`${key.toUpperCase()}: ${val}`);
        });
    };

    showBars(names[0]);

    function showBars(name) {
        
        var { sample_values, otu_ids, otu_labels } = data.samples.filter(obj => obj.id == name)[0];

        var barData = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(val => `OTU ${val}`),
              label: otu_labels,  
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', barData);
    }
    
    
            // create the trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },              
            text: samples.otu_labels

    };

        // set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // create the data variable 
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout); 



});