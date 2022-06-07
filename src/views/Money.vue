<template>
    <Layout class-prefix="layout">
        {{ record }}
        <NumberPad @update:value="obUpdateAmount" />
        <!-- <Types :value="record.type" @update:value="onUpdateType" /> -->
        <Types :value.sync="record.type" />
        <Notes @update:value="onUpdateNotes" />
        <!-- <Tags :dataSource="tags" v-on:update:dataSource="tags = $event" /> -->
        <!-- 可简化为： -->
        <!-- <Tags :dataSource.sync="tags" @xxx="onUpdateTags" /> -->
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
    </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component } from 'vue-property-decorator';

type Record = {
    tags: string[], //字符串数组
    notes: string,
    type: string,
    amount: number
}

@Component({
    components: { Layout, NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
        tags: [], notes: '', type: '-', amount: 0
    };
    onUpdateTags(value: string[]) {
        this.record.tags = value;

    }
    onUpdateNotes(value: string) {
        this.record.notes = value;

    }
    // onUpdateType(value: string) {
    //     this.record.type = value;
    // }
    obUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);

    }


}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

