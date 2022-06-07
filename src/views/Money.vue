<template>
    <Layout class-prefix="layout">
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
// import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component, Watch } from 'vue-property-decorator';
import model from "@/model";


// const version = window.localStorage.getItem('version') || '0';
// const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
// if (version === '0.0.1') {
//     //数据库升级，数据迁移
//     recordList.forEach(record => {
//         record.createAt = new Date(2020, 0, 1);
//     })
//     //迁移后要保存数据
//     window.localStorage.setItem('recordList', JSON.stringify(recordList));
// }
// //把版本号置为 0.0.2
// window.localStorage.setItem('version', '0.0.2');

//将 js 文件引入到 ts 文件中
// const model = require('@/model.js').model;
//等价于 const {model} = require('@/model.js'); 析构赋值
// console.log(model);
//const recordList: Record[] = model.fetch();

const recordList = model.fetch();

// type RecordItem = {
//     tags: string[], //字符串数组
//     notes: string,
//     type: string,
//     amount: number, //数据类型 object ｜ string （类型是对所有数据的分类）
//     createAt?: Date, // 类 / 构造函数 （类是对 object 的分类）
// }

@Component({
    components: { NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
    recordList: RecordItem[] = recordList;
    tags = ['衣', '食', '住', '行'];
    record: RecordItem = {
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
        // const record2: RecordItem = JSON.parse(JSON.stringify(this.record));
        const record2: RecordItem = model.clone(this.record);
        record2.createAt = new Date();
        this.recordList.push(record2);
    }
    @Watch('recordList')
    onRecordListChange() {
        // window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        model.save(this.recordList);
    }


}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

