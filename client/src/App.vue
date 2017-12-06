<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <bot/>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bot from '@/components/bot'
export default {
  components: {
    navbar,
    bot
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
