import {initializeApp} from 'firebase/app'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyCh3AsSBGnyxK_5pDD6tqpO1i2cYLxZD3Q",
        authDomain: "nuxt3-url-shortener.firebaseapp.com",
        projectId: "nuxt3-url-shortener",
        storageBucket: "nuxt3-url-shortener.firebasestorage.app",
        messagingSenderId: "474750001331",
        appId: "1:474750001331:web:77d993fbf52694868990c6",
        measurementId: "G-7LWBQEM4NR"
    }

    const app = initializeApp(firebaseConfig)
})