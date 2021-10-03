<template>
    <div className="container-fluid">
        <div className="well well-small row">
            <div className="span6 col-sm-6">
                <div className="text_align_left">
                    <input type="checkbox" value="MON" @change="onCheck" :checked="this.value[5].search('MON') !== -1  ? true : false" />{{$parent.translate('Monday')}}<br/>
                    <input type="checkbox" value="WED" @change="onCheck" :checked="this.value[5].search('WED') !== -1 ? true : false"  />{{$parent.translate('Wednesday')}}<br/>
                    <input type="checkbox" value="FRI" @change="onCheck" :checked="this.value[5].search('FRI') !== -1  ? true : false"/>{{$parent.translate('Friday')}}<br/>
                    <input type="checkbox" value="SUN" @change="onCheck" :checked="this.value[5].search('SUN') !== -1 ? true : false"/>{{$parent.translate('Sunday')}}
                </div>
            </div>
            <div className="span6 col-sm-6">
                <div className="text_align_left">
                    <input type="checkbox" value="TUE" @change="onCheck" :checked="this.value[5].search('TUE') !== -1 ? true : false"/>{{$parent.translate('Tuesday')}}<br />
                    <input type="checkbox" value="THU" @change="onCheck" :checked="this.value[5].search('THU') !== -1 ? true : false"/>{{$parent.translate('Thursday')}}<br />
                    <input type="checkbox" value="SAT" @change="onCheck" :checked="this.value[5].search('SAT') !== -1 ? true : false"/>{{$parent.translate('Saturday')}}
                </div><br /><br />
            </div>
        </div>
        {{$parent.translate('Start time')}}
            <Hour :disabled="value[2].indexOf('/') != -1"  @change="onAtHourChange" :value="value[2]" />
            <Minutes :disabled="value[2].indexOf('/') != -1"  @change="onAtMinuteChange" :value="value[1]" />
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
        onAtHourChange(e) {
            let val = this.value;
            val[0] = '0';
            val[2] = `${e.target.value}`;
            this.$emit("change-val", val);
        },
        onAtMinuteChange(e) {
            let val = this.value
            val[0] = '0';
            val[1] = `${e.target.value}`;
            this.$emit("change-val", val);
        },
        onCheck(e) {
            let val = this.value;
            val[0] = '0';
            if(e.target.checked) {
                val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
                val[3] = '?';
                val[4] = '*';
                if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
                    val[5] = e.target.value;
                } else {
                    val[5] = val[5] + '!' + e.target.value;
                }
            } else {
                val[5] = val[5].split('!');
                if (val[5].length > 1) {
                    val[5].splice(val[5].indexOf(e.target.value), 1);
                    val[5] = val[5].toString().replace(/,/g, '!');
                }
                else {
                    val[5] = '*';
                }           
            }
            this.$emit("change-val", val);
        }
    }
}
</script>
