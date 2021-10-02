<template>
    <div className="tab-pane" >
        <div className="well well-small">
            <input type="radio" @change="everyDay" :checked="value[3].indexOf('/') != -1" />
            <span>{{translate('Every')}}</span>
            <input :disabled="value[3].indexOf('/') == -1"  type="number" @input="onDayChange" :value="this.value[3].split('/')[1] ? this.value[3].split('/')[1] :''" :max="31" maxLength="2" />
            <span>{{translate('days(s)')}}</span>
        </div>
        <div className="well well-small">
            <input @change="weekDay" type="radio"  name="DailyRadio" :checked="value[3].indexOf('/') == -1"/>
            <span>{{translate('Every week day')}}</span>
        </div>
        <span>{{translate('Start time')}}</span>
            <Hour :disabled="value[2].indexOf('/') != -1"  @change="onAtHourChange" :value="value[2]" />
            <Minutes :disabled="value[2].indexOf('/') != -1"  @change="onAtMinuteChange" :value="value[1]" />
    </div>
</template>
<script>
import { translateFn } from '../meta'
import Minutes from '../select/minutes.vue';
import Hour from '../select/hour.vue';
export default {
    props:['value'],
    components: {
        Hour,
        Minutes
    },
    methods: {
        translate(key) {
            return translateFn(key)
        },
        everyDay() {
            let val = ['0',this.value[1],this.value[2],'1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        weekDay() {
            let val = ['0', this.value[1], this.value[2],'?','*', 'MON-FRI','*'];
            this.$emit("change-val", val);
        },
        onDayChange(e) {
            if(!e.target.value || (e.target.value > 0 && e.target.value < 32 )) {
                let val = ['0', this.getValueByIndex(1), this.getValueByIndex(1),'*','*','?','*'];
                val[3]= (e.target.value ? `1/${e.target.value}` : e.target.value);
                this.$emit("change-val", val);
            }
        },
        getValueByIndex(index) {
            return this.value[index] === '*' ? '0' : this.value[index];
        },
        onAtHourChange(e) {
            let val = ['0',this.value[1],'*','1/1','*','?','*']
            val[2] = `${e.target.value}`;
            this.$emit("change-val", val);
        },
        onAtMinuteChange(e) {
            let val = ['0','*', this.value[2],'1/1','*','?','*']
            val[1] = `${e.target.value}`;
            this.$emit("change-val", val);
        }
    }
}
</script>
