<template>
  <div class="container is-max-desktop">
    <h1 class="title">URLを短縮する</h1>

    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input v-model="originalUrl" class="input" type="url" placeholder="https://example.com" required>
      </div>
    </div>

    <div class="field">
      <label class="label">タイトル（任意）</label>
      <div class="control">
        <input v-model="title" class="input" type="text" placeholder="例：公式サイトなど">
      </div>
    </div>

    <div class="field mt-4">
      <div class="control">
        <button
            class="button is-primary"
            :class="{'is-loading': loading}"
            @click="shortenUrl()"
            :disabled="loading"
        >
          短縮する
        </button>
      </div>
    </div>

    <div v-if="shortUrl" class="notification is-success mt-4">
      短縮URL：<a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {v4 as uuidv4} from "uuid";
import {useShortUrlDoc} from "~/composables/useShortUrlCollection";
import {getDoc, setDoc} from "firebase/firestore";
import {useAuth} from "~/composables/useFirebase";

const auth = useAuth();
const user = auth.currentUser

const originalUrl = ref('');
const title = ref('');
const shortUrl = ref('');
const loading = ref(false);

let baseUrl = ""
if (import.meta.client)
  baseUrl = window.location.origin

async function shortenUrl() {
  if (!originalUrl.value) {
    alert('URLを入力してください')
    return
  }

  loading.value = true;
  try {
    const generated = await createShortUrl(originalUrl.value, title.value, user.uid)
    shortUrl.value = generated;
  } catch (e) {
    console.error(e)
    alert('短縮に失敗しました');
  } finally {
    loading.value = false;
  }
}

async function createShortUrl(originalUrl: string, customTitle: string | null, uid: string): Promise<string> {
  const shortCode = await generateUniqueShortCode();
  const fullShortUrl = `${baseUrl}/${shortCode}`;
  const titleToSave = customTitle?.trim() || fullShortUrl;

  const urlDoc = useShortUrlDoc(shortCode);
  await setDoc(urlDoc, {
    uid,
    title: titleToSave,
    originalUrl,
    createdAt: new Date()
  });

  return fullShortUrl;
}

async function generateUniqueShortCode(): Promise<string> {
  let shortCode = '';
  let exists = true;

  // 短縮コードがすでに存在する限りループし、ユニークなコードなら返却
  while (exists) {
    shortCode = generateShortCode();
    const docRef = useShortUrlDoc(shortCode);
    const snapshot = await getDoc(docRef)
    exists = snapshot.exists();
  }

  return shortCode;
}

function generateShortCode(length = 6): string {
  return uuidv4().slice(0, length);
}
</script>
