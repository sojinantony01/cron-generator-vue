<template>
    <select :disabled="disabled" className="hours" @change="$emit('change', $event)" :value="value">
            <option v-for="(n,index)  in 24" :key="index" :value="index">
                {{index}}
            </option>
        </select>
</template>
<script>

export default {
    props:['disabled','value'],
}
</script>
