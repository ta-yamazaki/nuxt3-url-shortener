<template>
  <div v-if="!loading">
<!--  <div style="user-select: none" @click.right.prevent="" v-if="!loading">-->
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <NuxtLink to="/" class="navbar-item">
            <h1 class="title is-4 has-text-primary">Shorty</h1>
          </NuxtLink>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <NuxtLink to="/" class="navbar-item">作成</NuxtLink>
            <NuxtLink to="/manage" class="navbar-item">短縮URL一覧</NuxtLink>
            <a class="navbar-item" @click="logout">ログアウト</a>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
        <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
import {useAuth} from "~/composables/useFirebase";

const loading = ref(true);

const auth = useAuth();
auth.onAuthStateChanged(user => {
  if (user == null) useRouter().replace("/login")
  else loading.value = false
})

const logout = async () => {
  await auth.signOut()
  await useRouter().push("/login")
}
</script>

<style scoped>
</style>
