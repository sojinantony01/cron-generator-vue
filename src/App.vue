<template>
  <Cron showResultCron="true" showResultText="true"/>
</template>

<script>
import Cron from './lib/cron.vue'
export default {
  name: 'App',
  components: {
    Cron
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
