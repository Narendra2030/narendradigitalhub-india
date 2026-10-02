/* =========================================================
   NK DIGITAL HUB 2030
   CORE SECURITY & AUTHENTICATION ENGINE (FIREBASE)
   Version: 4.0.0
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Professional Infrastructure Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIjsySkhok2u7qzFgMHqK9wfULrKgsYvY",
  authDomain: "nk-digital-hub.firebaseapp.com",
  projectId: "nk-digital-hub",
  storageBucket: "nk-digital-hub.firebasestorage.app",
  messagingSenderId: "313625666009",
  appId: "1:313625666009:web:43b0ea0c6f0db74134b9c8",
  measurementId: "G-SKNYC5BC1H"
};

// Initialize Application Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Handle Secure Platform Registration
 */
window.signup = async function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    if (msg) msg.textContent = "Please enter both email and password.";
    return;
  }

  if (password.length < 6) {
    if (msg) msg.textContent = "Password security requires at least 6 characters.";
    return;
  }

  try {
    if (msg) msg.textContent = "Creating your secure account...";
    await createUserWithEmailAndPassword(auth, email, password);
    
    if (msg) msg.textContent = "Account created successfully! Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  } catch (error) {
    console.error("Registration Error Context:", error);
    if (msg) msg.textContent = getFirebaseError(error);
  }
};

/**
 * Handle Secure Platform Authentication Gateway
 */
window.login = async function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    if (msg) msg.textContent = "Please enter both email and password.";
    return;
  }

  try {
    if (msg) msg.textContent = "Verifying credentials...";
    await signInWithEmailAndPassword(auth, email, password);
    
    if (msg) msg.textContent = "Success! Access granted.";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);
  } catch (error) {
    console.error("Authentication Error Context:", error);
    if (msg) msg.textContent = getFirebaseError(error);
  }
};

/**
 * Execute Secure Session Terminations
 */
async function performLogout() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Session Termination Error:", error);
    alert("Unable to safely log out. Please verify your connection status.");
  }
}

// Global Binding for Explicit Interactions
window.logout = function () {
  performLogout();
};

/**
 * Intercept DOM Layout Elements for Logout Directives
 */
document.addEventListener("DOMContentLoaded", () => {
  const interactionNodes = document.querySelectorAll("button, a");
  
  interactionNodes.forEach((node) => {
    const label = node.textContent.trim().toLowerCase();
    if (label === "logout" || label === "log out") {
      node.addEventListener("click", (event) => {
        event.preventDefault();
        performLogout();
      });
    }
  });
});

/**
 * State Authorization Route Guard
 */
onAuthStateChanged(auth, (user) => {
  const pathString = window.location.pathname.toLowerCase();
  
  // Array defining secure pages requiring valid sessions
  const restrictedRoutes = ["dashboard.html", "profile.html", "online-classes.html"];
  const isRestricted = restrictedRoutes.some(route => pathString.includes(route));

  if (isRestricted) {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const targetElement = document.getElementById("userEmail");
    if (targetElement) {
      targetElement.textContent = user.email || "Profile Email Unspecified";
    }
  }
});

/**
 * Translate System Error Codes to Human Language
 */
function getFirebaseError(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email address is already registered.";
    case "auth/invalid-email":
      return "Please input a structurally valid email address.";
    case "auth/weak-password":
      return "Password criteria failed. Minimum 6 characters required.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email credentials or verification matching failed.";
    case "auth/too-many-requests":
      return "Security Block: Too many attempts. Try again later.";
    case "auth/network-request-failed":
      return "Network interruption detected. Check your internet connection.";
    case "auth/operation-not-allowed":
      return "System configuration error: Authentication providers disabled.";
    default:
      return error.message || "An unexpected infrastructure error occurred.";
  }
}
