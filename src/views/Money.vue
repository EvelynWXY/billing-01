<template>
    <Layout class-prefix="layout">
        {{ record }}
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
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
import { Component, Watch } from 'vue-property-decorator';

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
    recordList: Record[] = [];
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
    onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);

    }
    saveRecord() {
        const record2 = JSON.parse(JSON.stringify(this.record));
        this.recordList.push(record2);
        console.log(this.recordList);

    }
    @Watch('recordList')
    onRecordListChange() {
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }


}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

