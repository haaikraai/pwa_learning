async function registarSW() {
    console.log('hellos')
    // if ('serviceWorker' in navigator) {
        try {
            console.log('I am trying ');
            const swReg = await navigator.serviceWorker.register('/sw.js');
            await swReg.showNotification('Service worker registered', { body: 'Service worker registered' });
            if (swReg.installing) {
                console.log('Service worker installing phase');
            } else if (swReg.waiting) {
                console.log('Service worker waiting phase');
            } else if (swReg.active) {
                console.log('Service worker active phase');
            } else {
                console.log('Service worker registration failed');
            }
        } catch (error) {
            console.log(`Service worker registration failed with ${error}`);
        }
    // } else {
    //     console.log('Service worker not hnn supported');
    
    // }
}

registarSW();

let currentFlight;

async function airport() {
    const flight_data = fetch('/assets/flight_data.json').then(respone => {
        return respone.json();
    }).then(data => {
        console.log('goths the json resp');
        console.log(data.arrivals);
        return data;
    }).catch(err => console.log('FML: ' + err))
    console.log(flight_data);
    return flight_data;
}

async function addFlights() {
    console.log('in func');
    const flightDOM = document.querySelector('#templatecontainer');
    // const testDOM = document.querySelector('#heading');
    // console.log('to mod')
    // console.log(flightDOM);

    let jsondata = await airport();
    // let flights = Array.from(await jsondata.arrivals);
    let flights = jsondata.arrivals;
    // console.log(await flights);
    // const templateHTML = '<span id="city">${city}</span>\
    // <span id="status">${status}</span>\
    // <span id="time">${time}</span>'

    // flights = Array.from(flights);
    // flights.forEach((flight) => {
    //     for (let key of Object.keys(flight)) {
    //         console.log(key + ':::' +flight[key])
    //         // add flight to the template
    //         let clone = flightlist.content.cloneNode(true);
    //         clone.querySelector('#city').textContent = flight.city;
    //         clone.querySelector('#status').textContent = flight.status;
    //         clone.querySelector('#time').textContent = flight.time;


    //         document.querySelector('#flighttemplate').appendChild(clone);
    //         console.log(document.querySelector('#flighttemplate').innerHTML);
    //     }




    console.log(flights.length)
    flights.forEach((flight, index) => {
        let flightclone = document.querySelector('#flighttemplate').cloneNode(true);

        console.log('ogging flight')
        console.log(flight);

        flightclone.children.city.textContent = flight.origin;
        flightclone.children.status.textContent = flight.status;
        flightclone.children.time.textContent = flight.time;
        // add flight to the template
        flightclone.addEventListener('click', () => {
            selectFlight(index);
        });
        // let clone = flight.content.cloneNode(true);



        // console.log('the clone' + flightclone);
        // console.log(flight.origin);
        // console.log(flightclone)
        // flightclone.childNodes.querySelector('#city').textContent = flight.origin;
        // flightclone.querySelector('#status').textContent = flight.status;
        // flightclone.querySelector('#time').textContent = flights;`

        // flightitem.textContent = flight.origin;

        flightDOM.appendChild(flightclone);
        console.log("clone");
        console.log(flightclone);


    })
    return jsondata;
}

async function addFlights2() {
    console.log('in func');
    const flightDOM = document.querySelector('#templatecontainer');
    // const testDOM = document.querySelector('#heading');
    // console.log('to mod')
    // console.log(flightDOM);

    let jsondata = await airport();
    // let flights = Array.from(await jsondata.arrivals);
    let flights = jsondata.arrivals;
    // console.log(await flights);
    // const templateHTML = '<span id="city">${city}</span>\
    // <span id="status">${status}</span>\
    // <span id="time">${time}</span>'

    // flights = Array.from(flights);
    // flights.forEach((flight) => {
    //     for (let key of Object.keys(flight)) {
    //         console.log(key + ':::' +flight[key])
    //         // add flight to the template
    //         let clone = flightlist.content.cloneNode(true);
    //         clone.querySelector('#city').textContent = flight.city;
    //         clone.querySelector('#status').textContent = flight.status;
    //         clone.querySelector('#time').textContent = flight.time;


    //         document.querySelector('#flighttemplate').appendChild(clone);
    //         console.log(document.querySelector('#flighttemplate').innerHTML);
    //     }




    console.log(flights.length)
    flights.forEach(({ origin, time, status }, index) => {

        let flightHTML = ""
        flightHTML += `<div>
        <span class="flight-entry" id="city">${origin}</span>
        <span class="flight-entry" id="status">${status}</span>
        <span class="flight-entry" id="time">${origin}</span>
        </div>`
    });
    flightDOM.append
}



/**
 * @param {number} flight - The index of the flight in the list.
 *                        +2 is added to account for the test flight and for the Heading that is part of the templatecontainer
 *                       This could be a temporary solution to the problem of the heading being counted as a flight, but going to keep it as is.
 */
function selectFlight(flightIndex) {
    // flight.style.backgroundColor = 'rgb(0, 153, 255)'
    flightIndex += 2;
    const flightList = document.querySelector('#templatecontainer');
    console.log(flightIndex);
    console.log(flightList.children);
    // flightList.children[flight].className="selectedFlight";
    flightList.children[flightIndex].classList.toggle('selectedFlight');
    // currentFlight = flightList.
}

function modifyDom() {
    console.log('modifying dom');
    let template = document.createElement('div');
    template.innerHTML = `
    <h1>DYNAMIC</h1>
    `;
    document.body.appendChild(template);
    console.log('appended');

    const tit = document.querySelector('#heading');
    console.log(tit);
    tit.innerHTML = 'SAILING';
}

function savedTime(startTime) {
    setInterval((startTime) => {
        startTime += 10000;
        console.log('10 seconds happened. Save it or so');
    }, 10000)    ;
}

document.addEventListener('DOMContentLoaded', async () => {
    // console.log('modifying dom');
    // modifyDom();
    const savedTime = 0;
    console.log('loaded:');
    startTimer(savedTime);
    let theseflights = await addFlights();
    console.log(theseflights);
});
