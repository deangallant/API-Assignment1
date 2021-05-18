
// 1. Streets endpoint
// a.  query a street name
// b.  get key # from response - this key represents the street name

// 2. Stops endpoint
// a.  use street key obtained in 1B and use that to query Stops endpoint to find all
// stops along respective street.

// 3.  Stop Schedule endpoint
// a. from 2A I can get the Stops "key" to find the next 2 bus arrival times by querying the STOP SCHEDULE endpoint.

// let mychoice = '';
// const streetsUrl = `https://api.winnipegtransit.com/v3/streets.json?api-key=yXm1l1BHCfXG4tZHyorJ&name=${mychoice}`;

const streetQueryList = document.querySelector('.streets')
const search = document.querySelector('.search')

const streets = async (streetsUrl) => {
  
  const request = await fetch(streetsUrl);
  const data = await request.json();
  
  
  streetListRender(data.streets)
}

const stopLocations = async (streetNum) => {
  const streetKey = streetNum[0].key
  const stopLocations = await fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=yXm1l1BHCfXG4tZHyorJ&street=${streetKey}`);
  const individualStopData = await stopLocations.json();
  //console.log(individualStopData)
  return individualStopData;
}

const stopSchedules = async (stopKey) => {
  const stopNum = stopKey.stops[0].key;
  //console.log(`stop number ${stopNum}`)
  const stopScheduleRequest = await fetch(`https://api.winnipegtransit.com/v3/stops/${stopNum}/schedule.json?api-key=yXm1l1BHCfXG4tZHyorJ`)
  const stopScheduleData = await stopScheduleRequest.json()
  const nextBus = stopScheduleData
  
  //console.log(nextBus)
  
}

const streetListRender = (streets) => {
  console.log(streets)
  streets.forEach(street => {
    streetQueryList.insertAdjacentHTML('afterbegin', `
    <a href="#" data-street-key="${street.key}">${street.name}</a>
    `)
  });


}
// streets(streetsUrl)
// .then(stopLocations)
// .then(stopSchedules)


search.addEventListener('keydown', (e) => {
  //console.log(e.target)
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if (e.target.value !== '') {
    let mychoice = e.target.value;
    const streetsUrl = `https://api.winnipegtransit.com/v3/streets.json?api-key=yXm1l1BHCfXG4tZHyorJ&name=${mychoice}`;
    streets(streetsUrl)
} e.target.value = ''
  e.preventDefault()
}
})

//<a href="#" data-street-key="4499">Kenaston Common Drive</a>
// e.target.value = ''
// e.preventDefault()

//event.target.nodeName === 'INPUT'