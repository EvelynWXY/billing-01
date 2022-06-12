<template>
    <div class="tags">

        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in dataSource" :key="tag.id" @click="toggle(tag)"
                :class="{ selected: selectedTags.indexOf(tag) >= 0 }">{{ tag.name }}</li>

        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';

@Component
export default class Tags extends Vue {
    @Prop() readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];
    toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag)
        if (index >= 0) {
            this.selectedTags.splice(index, 1)
        } else {
            this.selectedTags.push(tag);
        }
        this.$emit('update:value', this.selectedTags);

    }
    create() {
        const name = window.prompt('请输入标签名');
        if (name === '') {
            window.alert('标签名不能为空')
        } else if (this.dataSource) {
            this.$emit('update:dataSource', [...this.dataSource, name])
            //$emit 触发 update 更新 dataSource,并将第二个参数$event 传到 Money.vue 的Tags 里赋值给 tag 
            //[...this.dataSource, name] 则是展开 dataSource 并把 name 加进去
        }


    }
}
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;

    >.current {

        display: flex;
        flex-wrap: wrap;
        // overflow: auto;

        >li {
            // background: #9094ff;
            // background: #ffdf39;
            // background: #feefaa;
            $bg: #f8f1bc;
            background: $bg;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: $h/2;
            padding: 0 16px;
            margin-right: 12px;
            margin-top: 4px;

            &.selected {
                background: darken($color: $bg, $amount: 50%);
                color: white;
            }
        }
    }

    >.new {
        padding-top: 16px;

        button {
            background: transparent;
            border: none;
            color: #999;
            // color: #9094ff;
            border-bottom: 1px solid;
            padding: 0 4px;
        }
    }
}
</style>