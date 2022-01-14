<template>
  <v-app class="app">
    <v-main>
      <v-container>
        <div class="container">
          <nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Navless'
}
</script>

<style scoped>
  .app {
    background-color: #FFFFFF55;
    background-image: url(../static/background.png);
    background-repeat: repeat-y;
    background-size: cover;
    font-family: Roboto;
  }
</style>
