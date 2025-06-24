// import {getDoc} from 'firebase/firestore';
// import {useShortUrlDoc} from "~/composables/useShortUrlCollection";
//
// export default defineEventHandler(async (event) => {
//     const shortCode = event.context.params?.shortCode;
//     if (!shortCode)
//         return sendRedirect(event, "/", 302);
//
//     const urlRef = useShortUrlDoc(shortCode);
//     const snap = await getDoc(urlRef);
//     if (!snap.exists())
//         throw createError({statusCode: 404, message: 'URLが見つかりません'});
//
//     const data = snap.data();
//
//     // クリック数を更新（失敗してもリダイレクトは継続）
//     // try {
//     //     await updateDoc(urlRef, { clickCount: increment(1) });
//     // } catch (e) {
//     //     console.warn('クリック数更新に失敗:', e);
//     // }
//
//     // リダイレクト（302 Found）
//     return sendRedirect(event, data.originalUrl, 302);
// });
