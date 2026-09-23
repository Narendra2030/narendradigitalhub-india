// ========================================
// NK DIGITAL HUB
// Firebase Authentication
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {
  apiKey: "AIzaSyCIjsySkhok2u7qzFgMHqK9wfULrKgsYvY",
  authDomain: "nk-digital-hub.firebaseapp.com",
  projectId: "nk-digital-hub",
  storageBucket: "nk-digital-hub.firebasestorage.app",
  messagingSenderId: "313625666009",
  appId: "1:313625666009:web:43b0ea0c6f0db74134b9c8",
  measurementId: "G-SKNYC5BC1H"
};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ========================================
// SIGN UP
// ========================================

window.signup = async function () {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email === "" || password === "") {
    if (msg) msg.textContent = "Please enter email and password.";
    return;
  }

  if (password.length < 6) {
    if (msg) msg.textContent = "Password must be at least 6 characters.";
    return;
  }

  try {

    if (msg) msg.textContent = "Creating account...";

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (msg) {
      msg.textContent = "Account created successfully!";
    }

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);

  } catch (error) {

    console.error(error);

    if (msg) {
      msg.textContent = getFirebaseError(error);
    }
  }
};


// ========================================
// LOGIN
// ========================================

window.login = async function () {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email === "" || password === "") {
    if (msg) msg.textContent = "Please enter email and password.";
    return;
  }

  try {

    if (msg) msg.textContent = "Logging in...";

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (msg) {
      msg.textContent = "Login successful!";
    }

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);

  } catch (error) {

    console.error(error);

    if (msg) {
      msg.textContent = getFirebaseError(error);
    }
  }
};


// ========================================
// LOGOUT
// ========================================

window.logout = async function () {

  try {

    await signOut(auth);

    window.location.href = "login.html";

  } catch (error) {

    console.error("Logout error:", error);
  }
};


// ========================================
// AUTHENTICATION STATE
// ========================================

onAuthStateChanged(auth, (user) => {

  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase();

  // Dashboard protection
  if (currentPage === "dashboard.html") {

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const userEmail =
      document.getElementById("userEmail");

    if (userEmail) {
      userEmail.textContent = user.email;
    }
  }

});


// ========================================
// FIREBASE ERROR MESSAGE
// ========================================

function getFirebaseError(error) {

  switch (error.code) {

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
}