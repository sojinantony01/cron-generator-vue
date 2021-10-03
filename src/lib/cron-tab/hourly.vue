<template>
    <div className="tab-content">              
        <div className="tab-pane active">
            <div className="well well-small">
                <input type="radio" @change="everyHour" :checked="value[2].indexOf('/') != -1" />
                <span>{{$parent.translate('Every')}}</span>
                <input :disabled="value[2].indexOf('/') == -1"  type="number" @input="onHourChange" :value="this.value[2].split('/')[1] ? this.value[2].split('/')[1] : ''" :max="24" maxLength="2" />
                <span>{{$parent.translate('hour(s)')}}</span>
            </div>
            <div className="well well-small margin-right-0 margin-left-0">
            <div className="text_align_right w-100">
                <input type="radio" @change="atHour" :checked="value[2].indexOf('/') == -1"  />
                <span className="">{{$parent.translate('At')}}</span> 
                <Hour :disabled="value[2].indexOf('/') != -1"  @change="onAtHourChange" :value="value[2]" />
                <Minutes :disabled="value[2].indexOf('/') != -1"  @change="onAtMinuteChange" :value="value[1]" />
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import Minutes from '../select/minutes.vue';
import Hour from '../select/hour.vue';
export default {
    props:['value'],
    components: {
        Hour,
        Minutes
    },
    methods: {
        everyHour() {
            let val = ['0','0','0/1','1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        atHour() {
            let val = ['0','0','0','1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        onHourChange(e) {
            if((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
                let val = this.value;
                val[2] = `0/${e.target.value ? e.target.value : '*'}`;
                this.$emit("change-val", val);
            } 
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
