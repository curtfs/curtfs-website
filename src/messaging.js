console.log("from fcm");

importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "696144332508"
});

const messaging = firebase.messaging();

self.addEventListener("notificationclick", function(event) {
  console.log("On notification click: ", event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("https://www.amazon.in");
          event.notification.close();
        }
      })
  );
});
