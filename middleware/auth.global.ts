import {onAuthStateChanged} from "firebase/auth";
import {useAuth} from "~/composables/useFirebase";

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return // クライアント限定（Firebase Auth はブラウザ専用）

    onAuthStateChanged(useAuth(), (user) => {
        // Firebase 認証が完了するまで少し待つ必要がある場合がある
        if (!user.value)
            return navigateTo('/login')
    })
})
