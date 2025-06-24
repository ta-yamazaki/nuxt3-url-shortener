<!-- pages/index.vue -->
<template>
  <div>
    <GoogleLoginButton @login="handleLogin"/>
  </div>
</template>

<script setup lang="ts">
import GoogleLoginButton from '~/components/GoogleLoginButton.vue'
import type {User} from "firebase/auth";

definePageMeta({
  layout: 'login'
})

// グローバルな authUser 状態（useState で保持）
const authUser = useState<User>('authUser', () => null)

const handleLogin = (user: any) => {
  authUser.value = user
  useRouter().push('/') // ログイン後にトップへ遷移
}
</script>
