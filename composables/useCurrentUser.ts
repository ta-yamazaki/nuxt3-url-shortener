import {useAuth} from "~/composables/useFirebase";

export const useCurrentUser = () => {
    const auth = useAuth()
    return auth.onAuthStateChanged((user) => {
        return user;
    })
}
