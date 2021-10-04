<template>
    <div className="well">   
        {{$parent.translate('Expression')}} <input type="text" @input="onChange" :value="this.value.toString().replace(/,/g,' ').replace(/!/g, ',')" />
    </div>
</template>
<script>

export default {
    props:['value'],

    methods: {
        onChange(e) {
            let val = e.target.value.replace(/,/g, '!').split(" ");
            this.$emit("change-val", val);
        },
    }
}
</script>
