async function startApp() {
    try {
        await getStatesData()
        .then((statesData) => statesData.forEach(showStateName))
        await getStatesData()
        .then((statesData) => statesData.forEach(setStateCoords))
        mapApiParameters.push(mapKey)
        mapImg.src = mapApiParameters.join('')
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
          })
    } catch(error) {
        throw(error)
    }
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function showStateName(stateData) {
    let li = document.createElement('li')
    li.innerText = stateData.nome
    mainElement.append(li)
}

function setStateCoords(stateData) {
    mapApiParameters.push(`markers=color:red%7Csize:small%7C${stateData.latitude},${stateData.longitude}&`)
}

var mainElement = document.querySelector('main')
var mapImg = document.querySelector('img')
var mapApiParameters = ['https://maps.googleapis.com/maps/api/staticmap?center=Araguaiana,MT&zoom=4&size=500x500&']
var mapKey = 'key=AIzaSyC39rZDwEWy_MRhDaqyTJzk6zjFfWv4bJo'

startApp();



