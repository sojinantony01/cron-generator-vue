<template>
   <div className="tab-pane" >
        <div className="well well-small">
            <input type="radio" @change="everyMonthDay" value="1" name="MonthlyRadio" :checked="value[4] == '1/1'" />
            {{ $parent.translate('Day') }}
            <input :disabled="value[4] != '1/1'"  type="number" :value="this.value[3]" @input="onDayChange" />
            {{ $parent.translate('of every month(s)') }}
        </div>

        <div className="well well-small">
            <input @change="lastDayOfMonth"  type="radio" value="2" name="DailyRadio" :checked="value[3] == 'L'"/>
            {{$parent.translate('Last day of every month')}}
        </div>
        <div className="well well-small">
            <input @change="lastWeekDayOfMonth"  type="radio" value="3" name="WeekRadio" :checked="value[3] == 'LW'"/>
            {{$parent.translate('On the last weekday of every month')}}
        </div>
        <div className="well well-small">
            <input type="radio"  @input="oneDayBeforeEnd" value="4" name="MonthlyRadio" :checked="value[3].startsWith('L-')"/>
            <input :disabled="!value[3].startsWith('L-')" type="number" :value="this.value[3].split('-')[1]" @input="dayBeforeEnd" />
            {{$parent.translate('day(s) before the end of the month')}}
        </div>
                
        <span>{{$parent.translate('Start time')}}</span>
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
        everyMonthDay() {
            let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'1','1/1', '?','*'];
            this.$emit("change-val", val);
        },
        lastDayOfMonth() {
            let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'L','*', '?','*'];
            this.$emit("change-val", val);
        },
        lastWeekDayOfMonth() {
            let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'LW','*', '?','*'];
            this.$emit("change-val", val);
        },
        oneDayBeforeEnd() {
            let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'*','*', '?','*'];
            val[3] = `L-1`;
            this.$emit("change-val", val);
        },
        dayBeforeEnd(e) {
            let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'*','*', '?','*'];
            val[3] = `L-${e.target.value}`;
            this.$emit("change-val", val);
        },
        onDayChange(e) {
             if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
                let val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),this.value[3],'1/1', '?','*'];
                val[3] = `${e.target.value}`;
                this.$emit("change-val", val);
            }
        },
        getValueByIndex(index) {
            return this.value[index] === '*' ? '0' : this.value[index];
        },
        onAtHourChange(e) {
            let val = this.value;
            val[2] = `${e.target.value}`;
            this.$emit("change-val", val);
        },
        onAtMinuteChange(e) {
            let val = this.value;
            val[1] = `${e.target.value}`;
            this.$emit("change-val", val);
        }
    }
}
</script>
