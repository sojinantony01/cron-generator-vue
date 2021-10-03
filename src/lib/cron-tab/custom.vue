<template>
    <div className="well">   
        {{$parent.translate('Expression')}} <input type="text" @input="onChange" :value="this.value.toString().replace(/,/g,' ').replace(/!/g, ',')" />
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
        onChange(e) {
            let val = e.target.value.replace(/,/g, '!').split(" ");
            this.$emit("change-val", val);
        },
    }
}
</script>
