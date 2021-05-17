
// 1. Streets endpoint
// a.  query a street name
// b.  get key # from response - this key represents the street name

// 2. Stops endpoint
// a.  use street key obtained in 1B and use that to query Stops endpoint to find all
// stops along respective street.

// 3.  Stop Schedule endpoint
// a. from 2A I can get the Stops "key" to find the next 2 bus arrival times by querying the STOP SCHEDULE endpoint.

const mychoice = 'water';
const streetsUrl = `https://api.winnipegtransit.com/v3/streets.json?api-key=yXm1l1BHCfXG4tZHyorJ&name=${mychoice}`;


const requestStreetData = async (streetsUrl) => {
 
  const request = await fetch(streetsUrl);
  const data = await request.json();
  return data.streets;
}

requestStreetData(streetsUrl)
.then((data) => {
  console.log(data)
})
