import React from "react";
import {Doughnut} from 'react-chartjs-2';

export default function ActionsDonut(props) {
    const data = {
        labels: [
            'Creations',
            'Edits',
            'Deletions'
        ],
        datasets: [{
            data: [props.data.creation_count, props.data.edit_count, props.data.delete_count],
            backgroundColor: [
            '#1ec72c',
            '#f0c024',
            '#d14836'
            ],
            hoverBackgroundColor: [
            '#1ec72c',
            '#f0c024',
            '#d14836'
            ]
        }]
    };

    var donutOptions = {
        legend: {
            display: false
        }
    }

    return (
        <div className="donut-container flex justify-start" style={{width: "100%"}}>
            <Doughnut 
                data={data}
                options={donutOptions}
            />
        </div> 
    )
}