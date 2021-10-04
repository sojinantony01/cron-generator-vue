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
                <Monthly v-if="selectedTab == headerValues.MONTHLY" :value="value" @change-val="changeVal"/>
                <Custom v-if="selectedTab == headerValues.CUSTOM" :value="value" @change-val="changeVal"/>
            </div>
             <div className="cron-builder-bg" v-if="showResultText">
                {{ getVal() }}
            </div>
            <div v-if="showResultCron" className="cron-builder-bg">
                {{getCronString(value)}}
            </div>
        </div>
</template>

<script>
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders, translateFn, HEADER_VALUES } from './meta';
import Minutes from './cron-tab/minutes.vue';
import Hourly from './cron-tab/hourly.vue';
import Daily from './cron-tab/daily.vue';
import Weekly from './cron-tab/weekly.vue';
import Monthly from './cron-tab/monthly.vue';
import Custom from './cron-tab/custom.vue'

export default {
    components: {
        Minutes,
        Hourly,
        Daily,
        Weekly,
        Monthly,
        Custom
    },
    data() {
        return {
            value: ['*','*','*','*','*','*','*'],
            headers:loadHeaders(this.options),
            selectedTab:loadHeaders(this.options)[0],
            metadata:metadata,
            headerValues:HEADER_VALUES
        };
    },
    props:['showResultCron', 'showResultText', 'options', 'translations', 'cron', 'locale'],
    methods: {
        getVal() {
            let val = cronstrue.toString(this.value.toString().replace(/,/g,' ').replace(/!/g, ','), { throwExceptionOnParseError: false, locale: this.locale ? this.locale : 'en' })
            if(val.search('undefined') === -1) {
                return val;
            }
            return '-';   
        },
        translate(key) {
            return translateFn(key, this.translations)
        },
        changeTab(tab) {
            this.value = this.getDefaultVal(tab);
            this.selectedTab = tab;
            this.parentChange(this.value)
        },
        changeVal(val) {
            this.value = val;
            this.parentChange(val)
        },
        parentChange(val) {
            this.$emit('cron-change', this.getCronString(val))
        },
        getDefaultVal(tab) {
            return this.metadata.find(me => me.name == tab).initialCron;
        },
        setTab(tab) {
            let index = this.headers.indexOf(tab);
            if(index != -1) {
                this.selectedTab = tab;
            } else {
                this.selectedTab = HEADER_VALUES.CUSTOM;
            }
        },
        setValue(value) {
            let val = value;
            if(val  && val.split(' ').length === 6) {
                val += ' *'
            }
            if(!val  || val.split(' ').length !== 7) {
                this.selectedTab = this.headers[0];
                this.value = this.getDefaultVal(this.headers[0])
                this.parentChange(this.value);
                return;
            }
            val = val.replace(/,/g, '!').split(' ');
            if((val[1].search('/') !== -1) && (val[2] === '*')) {
                this.setTab(HEADER_VALUES.MINUTES)
            } else if((val[3] === '1/1')) {
                 this.setTab(HEADER_VALUES.HOURLY)
            } else if((val[3].search('/') !== -1) || (val[5] === 'MON-FRI')) {
                 this.setTab(HEADER_VALUES.DAILY)
            } else if (val[3] === '?') {
                this.setTab(HEADER_VALUES.WEEKLY)
            } else if (val[3].startsWith('L') || val[4] === '1/1') {
                this.setTab(HEADER_VALUES.MONTHLY)
            } else {
                 this.setTab(HEADER_VALUES.CUSTOM)
            }
            this.value = val;
        },
        getCronString(val) {
            let newVal = val.toString().replace(/,/g,' ');
            newVal = newVal.replace(/!/g, ',');
            return newVal;
        }
    },
    created() {
        if(this.cron) {
            this.setValue(this.cron)
        }
        if(this.translations && !this.locale) {
            console.log('Warning !!! locale not set while using translations');
        }
    },
    watch: {
        cron: {
            immediate: true, 
            handler (val) {
                if(val && (val != this.getCronString(this.value))) {
                    this.setValue(this.cron)
                }
            }
        }
    }
}
</script>
