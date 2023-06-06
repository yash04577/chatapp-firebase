importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAre6-nL2Di67eAWEWJY_cfWt8_PkuBdlg",
    authDomain: "chat-app-f93c4.firebaseapp.com",
    projectId: "chat-app-f93c4",
    storageBucket: "chat-app-f93c4.appspot.com",
    messagingSenderId: "218706756214",
    appId: "1:218706756214:web:a31113f84fed321b3d5557",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});



