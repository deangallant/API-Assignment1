
// 1. Streets endpoint
// a.  query a street name
// b.  get key # from response - this key represents the street name

// 2. Stops endpoint
// a.  use street key obtained in 1B and use that to query Stops endpoint to find all
// stops along respective street.

// 3.  Stop Schedule endpoint
// a. from 2A I can get the Stops "key" to find the next 2 bus arrival times by querying the STOP SCHEDULE endpoint.

const mychoice = 'ferry road';
const streetsUrl = `https://api.winnipegtransit.com/v3/streets.json?api-key=yXm1l1BHCfXG4tZHyorJ&name=${mychoice}`;


const streets = async (streetsUrl) => {
  const request = await fetch(streetsUrl);
  const data = await request.json();
  return data.streets;
}

const stopLocations = async (streetNum) => {
  const streetKey = streetNum[0].key
  const stopLocations = await fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=yXm1l1BHCfXG4tZHyorJ&street=${streetKey}`);
  const individualStopData = await stopLocations.json();
  console.log(individualStopData)
  return individualStopData;
}

const stopSchedules = async (stopKey) => {
  const stopNum = stopKey.stops[0].key;
  console.log(`stop number ${stopNum}`)
  const stopScheduleRequest = await fetch(`https://api.winnipegtransit.com/v3/stops/${stopNum}/schedule.json?api-key=yXm1l1BHCfXG4tZHyorJ`)
  const stopScheduleData = await stopScheduleRequest.json()
  const nextBus = stopScheduleData
  
  console.log(nextBus)
  
}

streets(streetsUrl)
.then(stopLocations)
.then(stopSchedules)