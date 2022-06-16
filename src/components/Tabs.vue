<template>
    <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
        <li v-for="item in dataSource" :key="item.value" class="tabs-item" :class="liClass(item)" @click="select(item)">
            {{ item.text }}</li>
        <!-- 用JS配置 height
            <li v-for="item in dataSource" :key="item.value" class="tabs-item" :style="{ height: height }"
            :class="liClass(item)" @click="select(item)">
            {{ item.text }}</li> -->

    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';

type DataSourceItem = {
    text: string,
    value: string
}

@Component
export default class Tabs extends Vue {
    @Prop({ required: true, type: Array })
    dataSource!: DataSourceItem[];
    @Prop(String)
    readonly value!: string;//从外部传过来 type 的值 表示选中的是哪一项
    @Prop(String)
    classPrefix?: string;//表示 类 的前缀
    // 用JS配置 height
    @Prop({ type: String, default: '64px' })
    height!: string;


    liClass(item: DataSourceItem) {
        return {
            [this.classPrefix + '-tabs-item']: this.classPrefix,
            selected: item.value === this.value
        }

    }

    select(item: DataSourceItem) {
        this.$emit('update:value', item.value);
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    // background: #c4c4c4;
    // background: #f8feec;
    background: #f8f1bc;
    display: flex;
    text-align: center;
    font-size: 24px;
    color: #3d6ee3;


    &-item {
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
            // background: #333;
            // background: #37342d;
            // background: #c5bd89;
            // background: darken($color: #f8f1bc, $amount: 30%)
            background: lighten($color: #8e92fb, $amount: 10%)
        }
    }
}
</style>