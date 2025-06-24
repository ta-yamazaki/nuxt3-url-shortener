<template>
  <div class="container is-max-desktop">
    <h1 class="title">短縮リンク一覧</h1>

    <div v-if="urls.length === 0" class="notification is-light">
      短縮リンクはまだありません。
    </div>

    <template v-for="url in urls" :key="url.uid" v-else>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <p class="is-size-4">{{ url.title }}</p>
            <p><NuxtLink :to="`${baseUrl}/${url.shortCode}`">{{ `${baseUrl}/${url.shortCode}` }}</NuxtLink></p>
            <p>{{ url.originalUrl }}</p>
            <p class="is-size-7 has-text-grey">作成日: {{ formatDate(url.createdAt) }}</p>
          </div>
        </div>
      </div>
    </template>

    <table class="table is-fullwidth is-striped">
      <thead>
      <tr>
        <th>タイトル</th>
        <th>短縮URL</th>
        <th>元URL</th>
        <th>クリック数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="url in urls" :key="url.uid">
        <td>{{ url.title }}</td>
        <td><a :href="`${baseUrl}/${url.shortCode}`" target="_blank">{{ `${baseUrl}/${url.shortCode}` }}</a></td>
        <td><a :href="url.originalUrl" target="_blank">{{ url.originalUrl }}</a></td>
        <td>{{ url.clickCount }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {useAuth} from '~/composables/useFirebase';
import {deleteDoc, getDocs, orderBy, query, where} from 'firebase/firestore'
import type {ShortUrl} from "~/types/ShortUrl";
import {useShortUrlCollection, useShortUrlDoc} from "~/composables/useShortUrlCollection";

const auth = useAuth();
const user = auth.currentUser

const urls = ref<ShortUrl[]>([])

const fetchUrls = async () => {
  const colRef = useShortUrlCollection()
  console.log(user)
  const q = query(colRef, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  urls.value = snapshot.docs.map(docSnap => docSnap.data())
}
await fetchUrls();

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const handleDelete = async (shortId: string) => {
  if (!confirm('本当に削除しますか？')) return
  const docRef = useShortUrlDoc(shortId);
  await deleteDoc(docRef)
  urls.value = urls.value.filter(item => item.shortCode !== shortId)
}

let baseUrl = ""
if (import.meta.client)
  baseUrl = window.location.origin

function copyToClipboard(shortId: string) {
  const fullUrl = `${baseUrl}/${shortId}`
  navigator.clipboard.writeText(fullUrl)
      .then(() => {
        alert('コピーしました ✅')
      })
      .catch((err) => {
        console.error('コピー失敗: ', err)
      })
}
</script>
