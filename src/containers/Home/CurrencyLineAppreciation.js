import React from "react";
import {Line} from 'react-chartjs-2';

export default function CurrencyLineAppreciation(props) {
    //Handle the data, make it suitable to be presented.
    const lineData = {
        labels: [props.day_one, props.day_two, props.day_three, props.day_four, props.day_five, props.day_six, props.day_seven],
        datasets: [
          {
            //label: props.data.currency + " Change (" + props.day_one + "-" + props.day_seven + ")",
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: props.data.values
          }
        ]
    };

    var lineOptions = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    display: false,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    //Only include the first and last ticks
                    callback: function(value, index, values) {
                        if (index === 0 || index === values.length - 1) {
                            return value;
                        } else {
                            return "";
                        }
                    }
                }   
            }]
        }
    }

    return (
        <div className="chart-container">
            <Line 
                width={300}
                height={80}
                options={lineOptions} 
                data={lineData} 
            />
        </div>
        
    )
}