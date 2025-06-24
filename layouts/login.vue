<template>
  <div style="user-select: none" @click.right.prevent="">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 has-text-primary">Shorty</h1>
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
