<template>
     <div class='cron_builder'>
            <ul class="nav nav-tabs" >
                <li class="nav-item" v-for="d in headers" :key="d">
                    <a class="nav-link " :class="selectedTab == d ? 'active' : ''"   v-on:click="changeTab(d)" >
                        {{ translate(d) }}
                    </a>  
                </li>
            </ul>
            <div className="cron_builder_bordering">
                <Minutes v-if="selectedTab == headerValues.MINUTES" :value="value" @change-val="changeVal"/>
                <Hourly v-if="selectedTab == headerValues.HOURLY" :value="value" @change-val="changeVal"/>
                <Daily v-if="selectedTab == headerValues.DAILY" :value="value" @change-val="changeVal"/>
                <Weekly v-if="selectedTab == headerValues.WEEKLY" :value="value" @change-val="changeVal"/>

            </div>
             <div className="cron-builder-bg" v-if="showResultText">
                {{ getVal() }}
            </div>
            <div v-if="showResultCron" className="cron-builder-bg">
                {{value.toString().replace(/,/g,' ').replace(/!/g, ',')}}
            </div>
        </div>
</template>

<script>
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders, translateFn, HEADER_VALUES } from './meta';
import Minutes from './cron-tab/minutes.vue';
import Hourly from './cron-tab/hourly.vue';
import Daily from './cron-tab/daily.vue';
import Weekly from './cron-tab/weekly.vue'
export default {
    components: {
        Minutes,
        Hourly,
        Daily,
        Weekly
    },
    data() {
        return {
            value: ['*','*','*','*','*','*','*'],
            locale:'en',
            headers:loadHeaders(this.options),
            selectedTab:loadHeaders(this.options)[0],
            metadata:metadata,
            headerValues:HEADER_VALUES
        };
    },
    props:['showResultCron', 'showResultText', 'options','translateFn'],
    methods: {
        getVal() {
            let val = cronstrue.toString(this.value.toString().replace(/,/g,' ').replace(/!/g, ','), { throwExceptionOnParseError: false, locale: this.locale })
            if(val.search('undefined') === -1) {
                return val;
            }
            return '-';   
        },
        translate(key) {
            return translateFn(key)
        },
        changeTab(tab) {
            this.value = this.metadata.find(me => me.name == tab).initialCron;
            this.selectedTab = tab;
        },
        changeVal(val) {
            this.value = val;
        }
    }
}
</script>

<style >
.cron_builder_bordering {
    border: 1px solid #ddd;
    border-top: none;
    text-align: center;
    padding: 10px;
    background: #fff;
}
.cron_builder_bordering input, .cron_builder_bordering select {
    width: 100px;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    padding-left: 5px;
    cursor: pointer;
}
.df {
    display: flex;
}
.cron-builder-bg {
    background-color: #086090;
    color: white;
    text-align: center;
    margin-bottom: 4px;
    padding: 8px 0px;
}
.cron_builder_bordering select {
    background-color: white;
    width: 75px;
    cursor: pointer;
    padding: 4px 2px;
    border-radius: 4px;
}
.cron_builder_bordering select option:hover {
    background-color: #086090;
}
.well-small input {
    width: auto !important;
}
.cron_builder_bordering  input[type='radio'] {
    margin-top: 0px;
    vertical-align: middle;
}
.cron_builder {
    border: 1px solid #d0cbcb;
    padding: 5px;
    background-color: #dddef13d;
    width: 100%;
    max-width: 600px;
}
.text_align_left {
    text-align: left;
}
.cron_builder .nav li {
    cursor: pointer;
    flex: 0 0 85px;
    text-align: center;
}
.cron_builder .nav li a {
    color:#337ab7;

}
.cron_builder .nav-tabs .nav-link:focus, .cron_builder .nav-tabs .nav-link:hover {
    border-color: transparent transparent transparent;
    background-color: #eeeeee;
}
.cron_builder .nav-tabs .nav-item.show .nav-link, .cron_builder .nav-tabs .nav-link.active {
    border-color: #dee2e6 #dee2e6 #fff;
    background-color: #ffffff;
}
.cron_builder { 
    font-size: 14px;
}
.cron_builder .well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 5%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 5%);
}
@media screen and (max-width:767px) {
    .cron_builder .nav li {
        cursor: pointer;
        flex: 0 0 65px;
        text-align: center;
    }
}
</style>