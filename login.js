let credentials=[
    {username:"F337751",password:"F337751"},
    {username:"F337752",password:"F337752"}
];

//To Check Credentials
function check_cred(username,password) {
    for(let i=0;i<credentials.length;i++){
        if(credentials[i].username==username && credentials[i].password===password){
            return true;
        }
    }
    return false;

}


//Login : Submit-Button Event
document.getElementById("mainBtn").addEventListener("click", redirectFunction);
function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return false;
    }
}

function redirectFunction() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (check_cred(username,password)) {
        window.location.href = "form.html";
    }
    else {
        alert("Wromg UserId or Password")
        window.location.href = "login.html";
    }
}


//DropDown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}