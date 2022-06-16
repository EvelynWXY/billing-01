<template>
    <div class="tags">

        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)"
                :class="{ selected: selectedTags.indexOf(tag) >= 0 }">{{ tag.name }}</li>

        </ul>
    </div>
</template>

<script lang="ts">

import TagHelper from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component, Prop } from 'vue-property-decorator';


@Component
export default class Tags extends mixins(TagHelper) {
    get tagList() {
        return this.$store.state.tagList;
    }
    selectedTags: string[] = [];
    created() {
        this.$store.commit('fetchTags')
    }
    toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag)
        if (index >= 0) {
            this.selectedTags.splice(index, 1)
        } else {
            if (this.selectedTags.length < 1) {
                this.selectedTags.push(tag);
            }
        }
        this.$emit('update:value', this.selectedTags);



    }
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.tags {
    background: white;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    color: #3d6ee3;


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
            border-radius: math.div($h, 2);
            padding: 0 16px;
            margin-right: 12px;
            margin-top: 4px;

            &.selected {
                // background: darken($color: $bg, $amount: 50%);

                background: #c2bdfe;

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