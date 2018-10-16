window.addEventListener("load", () => {

    // förhindra att formuläret "submittas"
    const addCityForm = document.querySelector("#addCityForm");
    addCityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddCityForm();
    })
    
})

// hantera formuläret
const handleAddCityForm = () => {
    // skapar en nodelist av input-elementen
    let formInputs = document.querySelectorAll('#addCityForm input');
    // objekt för att hålla datan som skall skickas till servern
    let postBody = new Object;

    // populera objektet med namn och värde från input
    formInputs.forEach((element) => {
        postBody[element.name] = element.value;
    })
    
    let uri = "http://rest.babiluskus.se/city";

    let options = {
        method: "put",
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
        if (response.success) {
            alert("New city saved! ID: "+response.id);
            const addCityWrapper = document.querySelector("#addCityWrapper");
            addCityWrapper.classList.toggle('hidden');
        }
    })
    .catch(function (error) {
    console.log(error);
    });
}