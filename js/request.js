'use strict';

window.addEventListener('load', () => {

    // event för att visa alla städer
    const listCities = document.querySelector('#fetchCities');
    listCities.addEventListener('click', function () {
        allCities();
    })

    // event för att visa formuläret för api nyckel
    const showApiForm = document.querySelector('#showApiForm');
    // gömmer och visar formuläret mha en klass hidden
    showApiForm.addEventListener('click', () => {
        formWrap.classList.toggle('hidden');
    })

    // hantera form submit
    const form = document.querySelector('#apiRequestForm');
    form.addEventListener('click', () => {
        handleForm();
    })

    // event för att visa formulär för att lägga till stad
    const showCityForm = document.querySelector("#showCityForm");
    const addCityWrapper = document.querySelector("#addCityWrapper");
    showCityForm.addEventListener("click", () => {
        addCityWrapper.classList.toggle('hidden');
    })
})

// hämtar alla städer
function allCities() {
    let uri = 'http://rest.babiluskus.se/cities';
    let options = {
        method: "GET",
}
    let request = new Request(uri, options);
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then((json) => {
            cityData(json);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// info för enskild stad
function cityInfo(id) {

    fetch('http://rest.babiluskus.se/city/' + id)
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            showInfo(data);
        })
        .catch(function (error) {
            console.log(error);
        });

};

// skapa element och innehåll för alla städer
const cityData = (data) => {
    cityDiv(data);
}

// bygger div för varje stad
const cityDiv = (data) => {
    for (let i = 0; i < data.length; i++) {
        
        const wrapper = document.getElementById('cityWrapper');

        // h2 rubrik
        let textContent = document.createElement('h2');
        textContent.innerText = data[i].Name;
        // div för varje stad
        const divElement = document.createElement('div');
        divElement.className = 'cityDiv';
        divElement.id = 'city'+data[i].ID;

        //knapp för uppdatera
        const editButton = document.createElement('button');
        editButton.innerText = "Edit";
        editButton.id = "editbutton";

        // infoknapp
        const infoButton = document.createElement('button');
        infoButton.innerText = "Info";
        infoButton.id = "infobutton";

        // deleteknapp
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.id = "deletebutton";

        //Bygg 
        divElement.appendChild(textContent);
        divElement.appendChild(infoButton);
        divElement.appendChild(editButton);
        divElement.appendChild(deleteButton);
        wrapper.appendChild(divElement);

        // event listener för att visa mer info
        infoButton.addEventListener('click', () => {
            cityInfo(data[i].ID);
        })

        // event listener för att ändra data
        editButton.addEventListener('click', () => {
            createForm(data[i].ID);
        })

        // event listener för delete
        deleteButton.addEventListener('click', () => {
            authForm(data[i].ID);
        })
    }
}

// skapa li för mer info
const showInfo = (data) => {
    const element = document.getElementById('city'+data.ID);
    const uList = document.createElement('ul');
    uList.id = 'ul'+data.ID;
    
        
        for (const value in data)
        {
            if (value == 'ID' || value == 'Name') {
                continue;
            }
            let li = document.createElement('li');

            if (value == 'Population') {
                li.id = 'population'+data.ID;                
            }
            li.innerText = value + ": " +data[value];
            uList.appendChild(li);
        }
    
    if (!document.getElementById('ul'+data.ID)) {
        element.appendChild(uList);
    }
    
}

const hideCityWrap = () => {
    const cityWrapper = document.querySelector('#cityWrapper');

    if (cityWrapper.innerHTML.length > 0) {
        cityWrapper.style.display = 'none';
    }
}

/***** signup för att få API-nyckel ******/

const handleForm = () => {
    const requestKeyForm = document.querySelector('#formWrap');

    hideCityWrap();
    if (requestKeyForm.style.display == 'none') {
        requestKeyForm.style.display = 'grid';
    }

    requestKeyForm.addEventListener('submit', function(event){
        
        //console.log("stoppat");
        // stoppa submit på formuläret
        event.preventDefault();

        // kör funktionen som skickar datan till servern
        apiKeyRequest();
    } );
}



// skicka värden till servern
const apiKeyRequest = () => {

    let email = document.querySelector('[name="user[email]"]').value;
    let username = document.querySelector('[name="user[username]"]').value;

    let postBody = {email: email, username: username};

    const uri = 'http://rest.babiluskus.se/user';
    const options = {
        method: 'POST',
        mode: 'cors',
        headers : {
            'Content-Type': 'Application/x-www-form-urlencoded',
        },
        body: JSON.stringify(postBody),
    };
    let request = new Request(uri, options);
    fetch(request)
        .then((response) => {
            return response.json();
        })
        .then( (response) =>{
            handleMailResponse(response);
        })
        .catch((error) => {
            console.log(error);
        })

}

// ge respons på om servern lyckades skicka mail med api-nyckel
const handleMailResponse = (response) => {
    const requestKeyForm = document.querySelector('#formWrap');

    if (response.mailStatus) {
        requestKeyForm.style.display = 'none';
        alert('Mail sent!')
        allCities();
    } else {
        alert('Failed to send email');
    }
}

