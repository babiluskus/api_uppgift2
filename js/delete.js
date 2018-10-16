'use strict'

const deleteCity = (id, apiKey, cityName) => {
    let uri = "http://rest.babiluskus.se/city";
    let postBody = {ID: id, apiKey: apiKey};
    let options = { 
        method: "delete",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(postBody),
    }
    let request = new Request(uri, options);

    fetch(request)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                alert(cityName+" deleted");
                clearCityList();
                allCities();
            }
            console.log(response);

        })
        .catch((error) => {
            console.error(error);
        })
}

const authForm = (id) => {
    // diven för staden
    const div = document.getElementById('city'+id);

    // formuläret
    const form = document.createElement('form');

    // input för "api-nyckel"
    const apiInput = document.createElement('input');
    apiInput.value = "API-key";
    apiInput.id = 'apiInput'+id;
    apiInput.type = 'text';

    // submitknapp
    const submitknapp = document.createElement('button');
    submitknapp.innerText = 'Confirm';
    submitknapp.id = 'confirmButton'+id;
    submitknapp.type = 'submit';

    // namnet på staden
    const cityName = div.firstChild.innerText;

    if (!document.getElementById('apiInput'+id)) {
        form.appendChild(apiInput);
        form.appendChild(submitknapp);
        div.appendChild(form);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        getApiKey(id, apiInput, cityName);
    })
}

const getApiKey = (id, apiInput, cityName) => {
    let apiKey = apiInput.value;
    deleteCity(id, apiKey, cityName);
}

const clearCityList = () => {
    const cityWrapper = document.querySelector('#cityWrapper');
    while (cityWrapper.firstChild) {
        cityWrapper.removeChild(cityWrapper.firstChild);
      }
}

const updateCityList = () => {
    allCities();
}