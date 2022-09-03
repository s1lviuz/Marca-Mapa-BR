async function startApp() {
    try {
        await getStatesDataFromJson()
        .then((statesDataArray) => statesDataArray.forEach(insertStateDataOnHTML))
        mapApiParameters.push(apiKey)
        mapImg.src = mapApiParameters.join('')
        document.querySelector('section').prepend(mapImg)
    } catch(error) {
        throw(error)
    }
}

async function getStatesDataFromJson() {
    try {
        const statesDataSorted = await fetch('estados.json')
        .then((statesData) => statesData.json())
        .then((statesDataJson) => statesDataJson.sort((state, nextState) => {
            let a = state.nome.toLowerCase()
            let b = nextState.nome.toLowerCase()
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }))
        return statesDataSorted
    } catch(error) {
        throw(error)
    }
}

function mapMarkerColor (stateRegion) {
    return  (stateRegion == 'Norte') ? 'green' : 
            (stateRegion == 'Nordeste') ? 'blue' :
            (stateRegion == 'Sudeste') ? 'yellow' :
            (stateRegion == 'Sul') ? 'orange' : 'red'; 
}

function insertStateDataOnHTML(stateData) {
    let stateNameElement = document.createElement('li')
    stateNameElement.innerText = `${stateData.nome} - ${stateData.uf}`
    document.querySelector('#statesList').append(stateNameElement)
    let markerColor = mapMarkerColor(stateData.regiao)
    mapApiParameters.push(`markers=color:${markerColor}%7Csize:small%7C${stateData.latitude},${stateData.longitude}&`)
}

var mapImg = document.createElement('img')
var mapApiParameters = ['https://maps.googleapis.com/maps/api/staticmap?center=Araguaiana,MT&zoom=4&size=500x500&']
var apiKey = 'key=AIzaSyBljqSOp1-UKoDe3d_GBdxrNPkJn43dXio'

document.addEventListener('DOMContentLoaded', startApp)