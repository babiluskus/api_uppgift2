'use strict';

const createForm = (id) => {
    // formuläret
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '#';
    form.id = 'form'+id;

    // input elementet
    const popInput = document.createElement('input')
    popInput.id = 'popInput'+id;
    popInput.value = 'Population';

    // submit knapp
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Save';

    // diven för staden
    const cityDiv = document.getElementById('city'+id);

    // bygg ihop
    form.appendChild(popInput);
    form.appendChild(submitButton);

    if(!document.getElementById('form'+id))
    {
    cityDiv.appendChild(form);

    }
    
    submitButton.addEventListener('click', () => {
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        processInput(id, popInput);

    });
}


const processInput = (id, popInput) => {
    const form = document.getElementById('form'+id);

    const population = popInput.value;
    form.action = +id+'/'+population;
    //console.log(population);
    
    let postBody = {ID: parseInt(id), pop: parseInt(population)};

    postData(postBody);

}

// fetch-funktion för POST
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
// https://www.youtube.com/watch?v=gL8M9Sl5QLs&index=5&list=PLyuRouwmQCjkWu63mHksI9EA4fN-vwGs7
const postData = (postBody) => {
    let uri = "http://rest.babiluskus.se/city";

    let options = {
        method: "post",
        mode: 'cors',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(postBody),
    }

    let request = new Request(uri, options);
    console.log(options.body);
    fetch(request)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        updateInfoLi(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
}

// funktion som ser till att uppdatera li-elementet i diven för varje stad
const updateInfoLi = (data) => {
    const populationLi = document.getElementById('population'+data.ID);

    if (populationLi.innerText != null) {
        populationLi.innerText = 'Population: ' + data.pop;
    }
};

// funktion för att uppdatera listan (div'ar)  med städer

const updateCityDivs = () => {
    
}



