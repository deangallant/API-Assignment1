
// 1. Streets endpoint
// a.  query a street name
// b.  get key # from response - this key represents the street name

// 2. Stops endpoint
// a.  use street key obtained in 1B and use that to query Stops endpoint to find all
// stops along respective street.

// 3.  Stop Schedule endpoint
// a. from 2A I can get the Stops "key" to find the next 2 bus arrival times by querying the STOP SCHEDULE endpoint.


const streetQueryList = document.querySelector('.streets')
const search = document.querySelector('.search')
let table = document.querySelector('.table')
const title = document.querySelector('#street-name')

const streets = async (streetsUrl) => {
  const request = await fetch(streetsUrl);
  const data = await request.json();
  streetListRender(data.streets)
}

const stopLocations = async (streetKey, streetName) => {
  title.innerHTML = '';
  title.insertAdjacentHTML('afterbegin', `
  Displaying results for ${streetName}
  `)
  const stopLocations = await fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=yXm1l1BHCfXG4tZHyorJ&street=${streetKey}`);
  const individualStopLocations = await stopLocations.json();
  console.log(individualStopLocations)
  return stopSchedules(individualStopLocations)
}

const stopSchedules = async (individualStopSchedules) => {
  console.log(typeof individualStopSchedules)
  console.log(individualStopSchedules)
  let stopNum = []
  individualStopSchedules.stops.forEach(ele => {
    stopNum.push(ele.key)
  })
  stopListRender(stopNum)
}

const streetListRender = (streets) => {
  streetQueryList.innerHTML = ''
  streets.forEach(street => {
    streetQueryList.insertAdjacentHTML('afterbegin', `
    <a href="#" class='list' data-street-key="${street.key}">${street.name}</a>
    `)
  });

  const atags = document.querySelectorAll('.list')
  atags.forEach(ele => {
    ele.addEventListener('click', (e) => {
      stopLocations(e.target.dataset.streetKey, e.target.innerHTML)
    })
  })
}

const stopListRender = (stopLocations) => {
  console.log(stopLocations)
  console.log(typeof stopLocations)
  table.innerHTML = ''
  stopLocations.forEach(async stopNum => {
    
    const stopScheduleRequest = await fetch(`https://api.winnipegtransit.com/v3/stops/${stopNum}/schedule.json?api-key=yXm1l1BHCfXG4tZHyorJ`)
    const stopScheduleData = await stopScheduleRequest.json()

    table.insertAdjacentHTML('afterbegin', `
    <tr>
            <td>${stopScheduleData['stop-schedule']['stop']['name']}</td>
            <td>${stopScheduleData['stop-schedule']['stop']["cross-street"].name}</td>
            <td>${stopScheduleData['stop-schedule']['stop']['direction']}</td>
            <td>${stopScheduleData['stop-schedule']['route-schedules'][0]['route']['number']}</td>
            <td>${stopScheduleData['stop-schedule']['route-schedules'][0]['scheduled-stops'][0]['times']['arrival']['estimated']}</td>
            <td>${stopScheduleData['stop-schedule']['route-schedules'][0]['scheduled-stops'][1]['times']['arrival']['estimated']}</td>

          </tr>
    `)
  })
}

search.addEventListener('keydown', (e) => {
  
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if (e.target.value !== '') {
    let mychoice = e.target.value;
    const streetsUrl = `https://api.winnipegtransit.com/v3/streets.json?api-key=yXm1l1BHCfXG4tZHyorJ&name=${mychoice}`;
    streets(streetsUrl)
} e.target.value = ''
  e.preventDefault()
}
})