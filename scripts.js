async function startApp() {
    try {
        await getStatesDataFromApi()
        .then((statesDataArray) => statesDataArray
        .forEach((stateData) => {
            statesList.push({
                "nome": stateData.nome,
                "sigla": stateData.sigla,
                "regiao": stateData.regiao.nome,
            })
            getStatesCoordinateByName(stateData.nome)
            .then((statesCoodinateDada) => {
            let statesCoodinate = statesCoodinateDada.results
            console.log(statesCoodinateDada)
            coordinatesList.push({
                "latitude": statesCoodinate[0].geometry.location.lat.toFixed(3),
                "longitude" : statesCoodinate[0].geometry.location.lng.toFixed(3),
            })
        })
        }))
        insertStateDataOnHTML(statesList,coordinatesList)
        mapApiParameters.push(googleApiKey)
        mapImg.src = mapApiParameters.join('')
        document.querySelector('section').prepend(mapImg)
    } catch(error) {
        throw(error)
    }
}
 

async function getStatesDataFromApi() {
    try {
        const response = await fetch(ibgeApiURL)
        const responseJson = await response.json()
        return responseJson
    } catch(error) {
        throw(error)
    }
}

async function getStatesCoordinateByName(stateName) {
    let apiUrlRequest = `${geoApiParameters.replace(' ',stateName.replaceAll(' ','+'))}${googleApiKey}`
    console.log(apiUrlRequest)
    try {
        const response = await fetch(apiUrlRequest)
        const responseJson = await response.json()
        return responseJson
    } catch(error) {
        throw error
    }
}

function timeoutLoading() {
    setTimeout(() => {
        if (statesList.length != coordinatesList.length) {
            timeoutLoading()
        }
      }, "1000")
}

function mapMarkerColor (stateRegion) {
    return  (stateRegion == 'Norte') ? 'green' : 
            (stateRegion == 'Nordeste') ? 'blue' :
            (stateRegion == 'Sudeste') ? 'yellow' :
            (stateRegion == 'Sul') ? 'orange' : 'red'; 
}

function insertStateDataOnHTML(statesNameList, statesCoodinateList) {
    console.log(statesNameList)
    statesNameList
    .forEach((element) => {
        let stateNameElement = document.createElement('li')
        stateNameElement.innerText = `${element.nome} - ${element.sigla}`
        document.querySelector('#statesList').append(stateNameElement)
    })
    console.log(statesCoodinateList)
    for (coordinate of statesCoodinateList) {
        console.log(statesCoodinateList)
    }
    // let stateNameElement = document.createElement('li')
    // stateNameElement.innerText = `${stateData.nome} - ${stateData.sigla}`
    // document.querySelector('#statesList').append(stateNameElement)
    // let stateCoordinate = getStateCoordinateByName(stateData.nome)
    // let markerColor = mapMarkerColor(stateData.regiao.nome)
    // mapApiParameters.push(`markers=color:${markerColor}%7Csize:small%7C${stateCoordinate.latitude},${stateCoordinate.longitude}&`)
}

var statesList = []
var coordinatesList = []

var mapImg = document.createElement('img')
var mapApiParameters = ['https://maps.googleapis.com/maps/api/staticmap?center=Araguaiana,MT&zoom=4&size=500x500&']
var geoApiParameters = 'https://maps.googleapis.com/maps/api/geocode/json?components=locality: &'
var googleApiKey = 'key=AIzaSyA4cTSxU1P2UygFzCl0NwCiD7mlZFTVnRg'

var ibgeApiURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

document.addEventListener('DOMContentLoaded', startApp)
