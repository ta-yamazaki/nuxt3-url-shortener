import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore'
import {connectAuthEmulator, getAuth} from "firebase/auth";

/**
 * Firestore へのアクセス
 */
export const useFirestore = () => {
    const db = getFirestore();

    // ローカル環境ならエミュレーターに接続
    if (process.env.NODE_ENV === 'development')
        connectFirestoreEmulator(db, 'localhost', 8080)

    return db
}

/**
 * Firebase Authentication へのアクセス
 */
export const useAuth = () => {
    const auth =  getAuth();

    // ローカル環境ならエミュレーターに接続
    if (process.env.NODE_ENV === 'development')
        connectAuthEmulator(auth, 'http://localhost:9099')

    return auth
}