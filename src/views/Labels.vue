<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`labels/edit/${tag.id}`">
                <span>{{ tag.name }}</span>
                <Icon name="enter" />
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import { mixins } from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
    components: { Button },
    mixins: [],
})
export default class Labels extends mixins(TagHelper) {
    get tags() {
        return this.$store.state.tagList;

    }
    beforeCreate() {
        this.$store.commit('fetchTags');
    }

}


</script>

<style lang="scss" scoped>
.tags {
    background: #ffffff;
    font-size: 16px;
    padding-left: 16px;
    color: #3d6ee3;


    >.tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e3e3e5;

        svg {
            // color: #333;
            height: 24px;
            width: 24px;
            margin-right: 16px;
        }
    }
}


.createTag {
    background: #ebdf46;
    // color: #333;
    color: #3d6ee3;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;

    &-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;

    }
}
</style>