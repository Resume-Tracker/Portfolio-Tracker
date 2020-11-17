import React from 'react';
import {ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export const Pageloads = ({ pageloads }) => {
  // convert timestamps into local time format (mm/dd/yyyy) for the graph
  let timestamps = pageloads.map(d => {
    const date = new Date(d.timestamp);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  })

  // count the number of occurences for each timestamp
  let occurrences = {};
  for (var i = 0; i < timestamps.length; i++) {
    occurrences[timestamps[i]] = (occurrences[timestamps[i]] || 0) + 1;
  }

  // put ouccurences into data format
  let dates = Object.keys(occurrences);
  let visits = Object.values(occurrences);
  var data = [];
  for (i = 0; i < Object.keys(occurrences).length; i++) {
    var temp = {};
    temp.date = dates[i];
    temp.visits = visits[i];
    data.push(temp);
  }

  console.log(data);

  // only render the line chart if there are data
  if (Object.keys(data).length === 0) {
    return (
      <div id="pageloads">
      </div>
    );
  } 
  else {
    return (
      <div id="pageloads">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" allowDuplicatedCategory={false}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="visits" stroke="#ff7300" legendType="none"/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default Pageloads;
