import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  } from 'recharts';
import React, { useState, useEffect } from 'react'
import '../App.css';

const ChartB = (props) => {

    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      setChartData(props.data);
    }, [props]);
  
  
    return (
      <div className="Chart">
        <LineChart
        width={380}
        height={300}
        data={chartData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="readyInMinutes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="readyInMinutes"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
            />
        </LineChart>
    </div>   
    );
  }
  
  export default ChartB;