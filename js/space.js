// Grupo: Agustín Cabrera, Agustín Vimercatti, Cristian Pérez, Luis Hernández, Mauro Rodríguez

const URL = "https://images-api.nasa.gov/search?q=";

function getJSONData(url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

function mostrarContenido(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let item = array[i];

        if (item.links != undefined) {

            htmlContentToAppend +=
                `<div class="card">
                  <img src="${item.links[0].href}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${item.data[0].title}</h5>
                    <p class="card-text">${item.data[0].description}</p>
                  </div>
                  <p class="fecha">${item.data[0].date_created}</p>
                </div>`

        } else {

            htmlContentToAppend +=
                `<div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${item.data[0].title}</h5>
                    <p class="card-text">${item.data[0].description}</p>
                  </div>
                  <p class="fecha">${item.data[0].date_created}</p>
                </div>`

        }
    }

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;

}

document.getElementById("btnBuscar").addEventListener("click", function () {
    getJSONData(URL + document.getElementById("inputBuscar").value).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mostrarContenido(resultObj.data.collection.items);
        }
    });
});