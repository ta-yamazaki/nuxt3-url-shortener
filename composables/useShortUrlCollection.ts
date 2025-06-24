import {collection, doc} from 'firebase/firestore'
import {shortUrlConverter} from '@/converters/shortUrlConverter'
import {useFirestore} from '~/composables/useFirebase';

/**
 * Short URL
 */
export const useShortUrlCollection = () => {
    const db = useFirestore()
    return collection(db, 'urls').withConverter(shortUrlConverter)
}

export const useShortUrlDoc = (docId: string) => {
    return doc(useShortUrlCollection(), docId);
}
