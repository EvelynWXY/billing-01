<template>
    <div>
        <label class="formItem">
            <span class="name">{{ fieldName }}</span>
            <template v-if="type === 'date'">
                <input :type="type || 'text'" :value="x(value)" @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
            </template>
            <template v-else>
                <input :type="type || 'text'" :value="value" @input="onValueChanged($event.target.value)"
                    :placeholder="placeholder">
            </template>



        </label>

    </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop, Watch } from 'vue-property-decorator';
@Component
export default class FormItem extends Vue {

    @Prop({ default: '' }) readonly value!: string;
    @Prop({ required: true }) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop() type?: string;
    // onChange(event: KeyboardEvent) {
    //     const input = event.target as HTMLInputElement;
    //     this.value = input.value;
    // }

    onValueChanged(value: string) {
        this.$emit('update:value', value);
    }
    x(isoString: string) {

        return dayjs(isoString).format('YYYY-MM-DD')
    }
}
</script>

<style lang="scss" scoped>
.formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    color: #3d6ee3;



    .name {
        padding-right: 16px;
    }

    input {
        height: 40px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
        color: #3d6ee3;

    }
}
</style>