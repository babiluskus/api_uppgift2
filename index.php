<?php include 'inc/header.php' ?>
<!-- <ul>
    <li><button id="listCities">Fetch Cities</button></li>
    <li><button id="fetchCountries">Fetch Countries</button></li>
</ul> -->
<div id="addCityWrapper" class="hidden">
    <form id="addCityForm" action="#">
        <input type="text" name="Name" placeholder="City">
        <input type="text" name="CountryCode" placeholder="Country Code">
        <input type="text" name="District" placeholder="District">
        <input type="number" name="Population" placeholder="Population">
        <input type="text" name="api_key" placeholder="API key">
        <button type="submit">Save</button>
    </form>
</div>
<div id="formWrap" class="hidden">
    <div id="signupForm">
        <form id="apiRequestForm" method="POST" action="">
            <input type="text" placeholder="email" name="user[email]">
            <input type="text" placeholder="username" name="user[username]">
            <button id= "submitApiRequest" type="submit">Request api-key</button>
        </form>
    </div>
</div>
<div id="cityWrapper"></div>



<?php include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php' ?>