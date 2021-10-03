# cron-generator-vue

Simple vue component to generate cron expression
This package is developed using same logic in [React cron generator](https://www.npmjs.com/package/react-cron-generator)

## Getting Started

Package helps to build linux scheduler cron expression.

Make sure you have include bootstrap(4.x) in your project. 


```
data = '* * * * * * *'
```
```
npm install cron-generator-vue

```
## demo
[Live demo](https://sojinantony01.github.io/cron-generator-vue/)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-31.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-57.png)


```
<template>
  <Cron showResultCron="true" :cron="cron" showResultText="true" @cron-change="valChanged"/>
</template>

<script>
import Cron from 'cron-generator-vue'


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


```
## props

| Prop | Description | Default | Mandatory
| --- | --- | -- | -- |
| cron | cron expression  |  |  No |
| cron-change |  |  | Yes
| showResultText | show in readable text format | false | No
| showResultCron | show cron expression | false | No
| translation | translation object | default translation(en) | No
| locale | locale for cronstrue | en | No
| options | Options for Cron component, *Must pass a valid cron value for available headers | All available headers | No


**translattion**

Expects a method. Use this prop for localization support. `cron-generator-vue` will use this values for every key. List of keys are available [here](https://github.com/sojinantony01/cron-generator-vue/tree/master/src/lib/localization/translation.json)

`locale` option should be set for correct `ResultText` translation. Please visit [cronstrue](https://github.com/bradymholt/cRonstrue) for supported locales.

## Options

**options.headers**

```
import { HEADER } from 'cron-generator-vue';

const options = {
  headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.MINUTES, HEADER.HOURLY, HEADER.DAILY, HEADER.CUSTOM]
};

```


[Sojin Antony](https://github.com/sojinantony01)

## Acknowledgments

**cronstrue**

