import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';
import { Container } from 'react-bootstrap';

// Register necessary components
Chart.register(...registerables);

const ScatterChart = ({ data, options }) => {
    return (
        <Container>
            <Scatter data={data} options={options} />
        </Container>
    );
};

export default ScatterChart;
