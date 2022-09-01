async function startApp() {
    try {
        await getStatesData()
        .then((statesData) => statesData.forEach(showStateData))
        mapApiParameters.push(apiKey)
        mapImg.src = mapApiParameters.join('')
        document.querySelector('section').prepend(mapImg)
    } catch(error) {
        throw(error)
    }
}

async function getStatesData() {
    try {
        const response = await fetch('estados.json')
        const responseJson = await response.json()
        return responseJson.sort((a, b) => {
            return compareStrings(a.nome, b.nome);
        });
    } catch(error) {
        throw(error)
    }
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function regionColor (stateData) {
    const region = stateData.regiao
    return  (region == 'Norte') ? 'green' : 
            (region == 'Nordeste') ? 'blue' :
            (region == 'Sudeste') ? 'yellow' :
            (region == 'Sul') ? 'orange' : 'red'; 
}

function showStateData(stateData) {
    let li = document.createElement('li')
    li.innerText = stateData.nome
    document.querySelector('#statesList').append(li)
    let color = regionColor(stateData)
    mapApiParameters.push(`markers=color:${color}%7Csize:small%7C${stateData.latitude},${stateData.longitude}&`)
}

var mapImg = document.createElement('img')
var mapApiParameters = ['https://maps.googleapis.com/maps/api/staticmap?center=Araguaiana,MT&zoom=4&size=500x500&']
var apiKey = 'key=AIzaSyA4cTSxU1P2UygFzCl0NwCiD7mlZFTVnRg'

startApp();
