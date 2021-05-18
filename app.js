
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

const stopLocations = async (streetKey) => {
  //const streetKey = streetNum[0].key
  console.log(streetKey)
  const stopLocations = await fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=yXm1l1BHCfXG4tZHyorJ&street=${streetKey}`);
  const individualStopData = await stopLocations.json();
  console.log(individualStopData)
  stopListRender(individualStopData)
  return individualStopData;
}

const stopSchedules = async (stopKey) => {
  //const stopNum = stopKey.stops[0].key;
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
    <a href="#" class='list' data-street-key="${street.key}">${street.name}</a>
    `)
    
  });
  const atags = document.querySelectorAll('.list')
  atags.forEach(ele => {
    ele.addEventListener('click', (e) => {
      console.log(e.target.dataset.streetKey)
      stopLocations(e.target.dataset.streetKey)
    })
  })
}

const stopListRender = (stopLocations) => {

}

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

// <tr>
//             <td>Kenaston Boulevard</td>
//             <td>Rothwell Road</td>
//             <td>Northbound</td>
//             <td>74</td>
//             <td>02:25 PM</td>
//           </tr>