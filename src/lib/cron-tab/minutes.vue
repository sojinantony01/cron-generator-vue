<template>
    <div className="well">   
        {{$parent.translate('Every')}} <input type="Number" @input="onChange" :value="value[1].split('/')[1]" min="1" max="60" /> 
        {{$parent.translate('minute(s)')}}
    </div>
</template>
<script>

export default {
    props:['value'],
    methods: {
        onChange(e) {
            if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
                let val = this.value;
                val[1] = e.target.value ? `0/${e.target.value}` : val[1];  
                this.$emit("change-val", val);
            }  
        }
    }
}
</script>
