// drop down ID no.
var select = d3.select('select');
// demographic info section
var pnl = d3.select('.panel-body');
var data;

d3.json('samples.json').then(jsonData => {
    data = jsonData;

// cycle thru name data for dropdown menu
    var names = data.names;
    names.forEach(name => {
        select.append('option').text(name).property('value', name);
    });
// pass name data for each visual
    showDemo(names[0]);
    showBars(names[0]);
    showBubble(names[0]);
    showGauge(names[0]);

    
});

// sync charts when name data is change
function optionChanged(name) {
    showBubble(name);
    showBars(name);
    showDemo(name);
    showGauge(name);
};

// insert demo data into panel
function showDemo(name) {
    pnl.html('')
    var metadata = data.metadata.filter(obj => obj.id == name)[0];
    Object.entries(metadata).forEach(([key, val]) => {
        pnl.append('h5').text(`${key.toUpperCase()}: ${val}`);
    });
};

function showBars(name) {

    var { sample_values, otu_ids, otu_labels } = data.samples.filter(obj => obj.id == name)[0];

    var barData = [
        {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(val => `OTU ${val}`),
            label: otu_labels,
            type: 'bar',
            orientation: 'h'
        }
    ];
// plot the data in bar graphy
    Plotly.newPlot('bar', barData);
};
// create function for bubblechart
function showBubble(name) {
    var results = data.samples.filter(obj => obj.id == name)[0]

    // bubble w/ a color dimension
    var trace1 = [{
        x: results.otu_ids,
        y: results.sample_values,
        mode: "markers",
        marker: {
            size: results.sample_values,
            color: results.otu_ids
        },
        text: results.otu_labels
    }];

    // set the layout for the bubble plot
    var layout = {
        xaxis: { title: "OTU ID" },
        height: 600,
        width: 1300
    };


    // Plot the data
    Plotly.newPlot("bubble", trace1, layout);
};

// create gauge function
function showGauge(name) {
    var frq = data.metadata.filter(obj => obj.id == name)[0].wfreq;

    // Add steps, threshold, and delta
    var gaugeData = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: frq,
          title: { text: "Wash Frequency" },
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 400 },
          gauge: { axis: { range: [0, 9] } }
        }
      ];
      
    //   Plot the data
      var layout = { width: 600, height: 400 };
      Plotly.newPlot('gauge', gaugeData, layout);
};