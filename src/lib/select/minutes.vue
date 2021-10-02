<template>
    <select :disabled="disabled" className="hours" @change="$emit('change', $event)" :value="value">
            <option v-for="(n,index) in 60" :key="index">
                {{index}}
            </option>
        </select>
</template>
<script>

export default {
    props:['disabled','value'],
}
</script>
