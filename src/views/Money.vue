<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
        <div class="createdAt">
            <FormItem fieldName="日期" type="date" placeholder="在这里输入日期" :value.sync="record.createAt" />
        </div>
        <div class="notes">
            <!-- <FormItem fieldName="备注" placeholder="在这里输入备注" :value = "record.notes" @update:value="onUpdateNotes" /> -->
            <FormItem fieldName="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
        </div>


        <Tags @update:value="record.tags = $event" />

    </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";

import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component } from 'vue-property-decorator';
import Tabs from '../components/Tabs.vue';
import recordTypeList from "@/constants/recordTypeList";



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




@Component({
    components: { NumberPad, FormItem, Tags, Tabs },
})
export default class Money extends Vue {
    get recordList() {
        return this.$store.state.recordList;//computed: 当 recordList 变化时会通知外面的 recordList

    }
    recordTypeList = recordTypeList;
    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createAt: new Date().toISOString()
    };
    created() {
        this.$store.commit('fetchRecords')
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;

    }

    onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);

    }
    saveRecord() {
        if (!this.record.tags || this.record.tags.length === 0) {
            return window.alert('请至少选择一个标签')

        }
        this.$store.commit('createRecord', this.record);
        if (this.$store.state.createRecordError === null) {
            window.alert('已保存');
            this.record.notes = '';
        }

    }



}
</script>

<style lang="scss" >
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.notes {
    padding: 12px 0;
}
</style>

