import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyCIjsySkhok2u7qzFgMHqK9wfULrKgsYvY",

authDomain: "nk-digital-hub.firebaseapp.com",

projectId: "nk-digital-hub",

storageBucket: "nk-digital-hub.firebasestorage.app",

messagingSenderId: "313625666009",

appId: "1:313625666009:web:78c7cfdda635c51034b9c8"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

window.signup = function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

createUserWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

document.getElementById("msg").innerHTML =
"Account Created Successfully";

window.location = "login.html";

})

.catch((error)=>{

document.getElementById("msg").innerHTML =
error.message;

});

};

window.login = function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

signInWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

window.location = "dashboard.html";

})

.catch((error)=>{

document.getElementById("msg").innerHTML =
error.message;

});

};
createUserWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

document.getElementById("msg")
.innerHTML =
"Account Created Successfully";

window.location =
"login.html";

})

.catch((error)=>{

document.getElementById("msg")
.innerHTML =
error.message;

});

};

window.login = function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

signInWithEmailAndPassword(
auth,
email,
password
)

.then(()=>{

window.location =
"dashboard.html";

})

.catch((error)=>{

document.getElementById("msg")
.innerHTML =
error.message;

});

};
