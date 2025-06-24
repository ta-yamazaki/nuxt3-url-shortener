import type { FirestoreDataConverter } from 'firebase/firestore'
import type { ShortUrl } from '~/types/ShortUrl'

export const shortUrlConverter: FirestoreDataConverter<ShortUrl> = {
    toFirestore(data: ShortUrl) {
        return {
            uid: data.uid,
            title: data.title,
            originalUrl: data.originalUrl,
            createdAt: data.createdAt
        }
    },
    fromFirestore(snapshot, options): ShortUrl {
        const data = snapshot.data(options)
        return {
            uid: data.uid,
            title: data.title,
            shortCode: snapshot.id,
            originalUrl: data.originalUrl,
            createdAt: data.createdAt.toDate()
        }
    }
}
