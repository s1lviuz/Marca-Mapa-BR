async function startApp() {
    try {
        await fetch('estados.json')
        .then(statesData => statesData.json())
        .then(statesDataJson => statesDataJson.sort((state, nextState) => {
            let a = state.nome.toLowerCase()
            let b = nextState.nome.toLowerCase()
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }))
        .then(statesDataSorted => statesDataSorted.forEach(renderStateData))
    } catch(error) {
        throw(error)
    }
    mapApiParameters.push(apiKey)
    mapImg.src = mapApiParameters.join('')
    document.querySelector('section').prepend(mapImg)
}

function setMarkerColorByRegion(stateRegion) {
    return  (stateRegion == 'Norte') ? 'green' : 
            (stateRegion == 'Nordeste') ? 'blue' :
            (stateRegion == 'Sudeste') ? 'yellow' :
            (stateRegion == 'Sul') ? 'orange' : 'red'; 
}

function renderStateData(stateData) {
    let stateNameElement = document.createElement('li')
    stateNameElement.innerText = `${stateData.nome} - ${stateData.uf}`
    document.querySelector('#statesList').append(stateNameElement)
    let mapMarkerColor = setMarkerColorByRegion(stateData.regiao)
    mapApiParameters.push(`markers=color:${mapMarkerColor}%7Csize:small%7C${stateData.latitude},${stateData.longitude}&`)
}

var mapImg = document.createElement('img')
var mapApiParameters = ['https://maps.googleapis.com/maps/api/staticmap?center=Araguaiana,MT&zoom=4&size=500x500&']
var apiKey = 'key=AIzaSyBljqSOp1-UKoDe3d_GBdxrNPkJn43dXio'

document.addEventListener('DOMContentLoaded', startApp)