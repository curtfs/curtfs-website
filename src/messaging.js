console.log("from fcm");

importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "696144332508"
});

const messaging = firebase.messaging();

self.addEventListener("notificationclick", async ev => {
  console.log(ev, "caught from notificationclick");
});
