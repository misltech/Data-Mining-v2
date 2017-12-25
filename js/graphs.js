var exe = false, 
myChart;

function startGraph() {
    if (!exe) {
        initGraph();
    }
    else {
        myChart.destroy();
        initGraph();
    }

    exe = true;
}

function initGraph() {
        var ctx = document.getElementById("myChart").getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar', //bar chart
            data: {
                labels: Chartlabel, //gets label from global variable
                datasets: [{
                    label: 'Average Smile',
                    data: graphdata,  //get background from global variable
                    backgroundColor: bckg //gets background color from global variable
                }]
            },
            options: {

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

