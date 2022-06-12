<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <!-- <Types :value="record.type" @update:value="onUpdateType" /> -->
        <Types :value.sync="record.type" />
        <div class="notes">
            <FormItem fieldName="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes" />

        </div>
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
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component, Watch } from 'vue-property-decorator';
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";


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

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch()

@Component({
    components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
    recordList: RecordItem[] = recordList;
    tags = tagList;
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
        recordListModel.create(this.record);
    }
    @Watch('recordList')
    onRecordListChange() {
        // window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        recordListModel.save();
    }


}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.notes {
    padding: 12px 0;
}
</style>

