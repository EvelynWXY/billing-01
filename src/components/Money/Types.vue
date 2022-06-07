import Types from '@/components/Money/Types.vue';
<template>
    <div>
        <ul class="types">
            <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
            <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { component } from "vue/types/umd";
import { Component, Prop, Watch } from 'vue-property-decorator';

//TS 的好处
//1. 类型提示：更智能的提示
//2. 编译时报错：还没运行代码就知道自己写错了
//3. 类型检查：无法点出错误的属性
@Component
export default class Types extends Vue {
    // type = '-' ////'-'表示支出 '+'表示收入
    @Prop() readonly type!: string;//从外部传过来 type 的值

    selectType(type: string) {  // type 只能是 '+' 和 '-' 中的一个
        if (type !== '-' && type !== '+') {
            throw new Error('type is unknown')
        }
        this.$emit('update:value', type);
        // this.type = type;
    }
    // @Watch('type')
    // onTypeChanged(value: string) {
    //     this.$emit('update:value', value)
    // }


}
</script>

<style lang="scss" scoped>
.types {
    // background: #c4c4c4;
    // background: #f8feec;
    background: #f8f1bc;
    display: flex;
    text-align: center;
    font-size: 24px;

    >li {
        width: 50%;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
            // background: #37342d;

        }
    }
}
</style>