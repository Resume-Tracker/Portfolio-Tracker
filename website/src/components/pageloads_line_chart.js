import React from 'react'
import Plot from 'react-plotly.js';

const PageloadsLineChart = ({ pageloads }) => {
  // convert timestamps into ISO format for plotly
  let timestamps = pageloads.map(d => (new Date(d.timestamp)).toISOString().slice(0,10))

  // count the number of occurences of each timestamp
  let occurrences = {};
  for (var i = 0, j = timestamps.length; i < j; i++) {
    occurrences[timestamps[i]] = (occurrences[timestamps[i]] || 0) + 1;
  }

  // separate timestamp(key) and count(value) pairs into 2 arrays
  let lineChartX = Object.keys(occurrences)
  let lineChartY = Object.values(occurrences)

  // only render the line chart if there are data
  if (lineChartX.length && lineChartY.length) {
    return (
      <div id="pageloadsLineChart">
        <Plot
          data = {[
            {
              x: lineChartX,
              y: lineChartY,
              type: 'scatter'
            }
          ]}
          layout = {
            { xaxis: {
                tickformat: '%m/%d/%Y'
              },
              autosize: true
            }
          }
          useResizeHandler
          style = {{ width: '100%', height: '100%' }}
        />
      </div>
    );
  } else {
    return (
      <div id="pageloadsLineChart">
      </div>
    );
  }
};

export default PageloadsLineChart
