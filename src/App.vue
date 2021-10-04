<template>
  <Cron  showResultCron="true" :cron="cron" showResultText="true" @cron-change="valChanged"/>
</template>

<script>
import Cron from './lib/cron.vue'
import './lib/cron.css'
export default {
  name: 'App',
  components: {
    Cron
  },
  data() {
    return {
      cron : '0 0 4 ? * MON *',
    }
  },
  methods: {
    valChanged(val) {
      this.cron = val
    }
  },
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
