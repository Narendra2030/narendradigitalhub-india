/* =========================================================
   NK DIGITAL HUB 2030
   CORE SECURITY & AUTHENTICATION ENGINE (FIREBASE)
   Version: 5.0.0
========================================================= */

import { initializeApp } from "https://gstatic.com";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyCIjsySkhok2u7qzFgMHqK9wfULrKgsYvY",
  authDomain: "://firebaseapp.com",
  projectId: "nk-digital-hub",
  storageBucket: "nk-digital-hub.firebasestorage.app",
  messagingSenderId: "313625666009",
  appId: "1:313625666009:web:43b0ea0c6f0db74134b9c8",
  measurementId: "G-SKNYC5BC1H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM लोड होने के बाद इवेंट लिसनर्स को सीधे फ़ॉर्म से जोड़ना
document.addEventListener("DOMContentLoaded", () => {
  
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const msg = document.getElementById("msg");

      try {
        if (msg) { msg.style.color = "#52667d"; msg.textContent = "Verifying credentials..."; }
        await signInWithEmailAndPassword(auth, email, password);
        if (msg) { msg.style.color = "#16a34a"; msg.textContent = "Success! Access granted."; }
        setTimeout(() => { window.location.href = "dashboard.html"; }, 500);
      } catch (error) {
        if (msg) { msg.style.color = "#b91c1c"; msg.textContent = getFirebaseError(error); }
      }
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const msg = document.getElementById("msg");

      if (password.length < 6) {
        if (msg) { msg.style.color = "#b91c1c"; msg.textContent = "Password requires at least 6 characters."; }
        return;
      }

      try {
        if (msg) { msg.style.color = "#52667d"; msg.textContent = "Creating secure account..."; }
        await createUserWithEmailAndPassword(auth, email, password);
        if (msg) { msg.style.color = "#16a34a"; msg.textContent = "Account created! Redirecting..."; }
        setTimeout(() => { window.location.href = "dashboard.html"; }, 800);
      } catch (error) {
        if (msg) { msg.style.color = "#b91c1c"; msg.textContent = getFirebaseError(error); }
      }
    });
  }

  // ऑटोमैटिक लॉगआउट इंटरसेप्टर
  const interactionNodes = document.querySelectorAll("button, a");
  interactionNodes.forEach((node) => {
    const label = node.textContent.trim().toLowerCase();
    if (label === "logout" || label === "log out" || label === "logout session") {
      node.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          await signOut(auth);
          window.location.href = "login.html";
        } catch (err) {
          alert("Logout failed. Please check your network.");
        }
      });
    }
  });
});

// ग्लोबल लॉगआउट फॉलबैक बाइंडिंग
window.logout = async function () {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (err) {
    alert("Logout failed.");
  }
};

// राउट प्रोटेक्शन गार्ड (Route Guard)
onAuthStateChanged(auth, (user) => {
  const pathString = window.location.pathname.toLowerCase();
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

function getFirebaseError(error) {
  switch (error.code) {
    case "auth/email-already-in-use": return "This email address is already registered.";
    case "auth/invalid-email": return "Please input a valid email address.";
    case "auth/weak-password": return "Password criteria failed. Minimum 6 characters required.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Invalid email credentials or incorrect password.";
    case "auth/too-many-requests": return "Security Block: Too many attempts. Try again later.";
    case "auth/network-request-failed": return "Network error. Check your internet connection.";
    default: return "An authentication error occurred. Please try again.";
  }
}
