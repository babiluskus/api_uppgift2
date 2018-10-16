<?php include '../inc/header.php' ?>
<div id="formWrap">
    <div id="signupForm">
        <form id="apiRequestForm" method="POST" action="">
            <input type="text" placeholder="email" name="user[email]">
            <input type="text" placeholder="username" name="user[username]">
            <button id= "submitApiRequest" type="submit">Request api-key</button>
        </form>
</div>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php' ?>
