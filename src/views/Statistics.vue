<template>

    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
        <div>
            type:{{ type }}
            <br />
            interval:{{ interval }}
        </div>
    </Layout>

</template>

<script lang="ts">

import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '../constants/recordTypeList';



@Component({
    components: { Tabs }
})
export default class Statistics extends Vue {
    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
    // background: #f7f4bb;


    &.selected {
        background: #ede35b;

        &::after {
            display: none;
        }
    }
}

::v-deep .interval-tabs-item {
    height: 48px;
    background: #ede35b;
}
</style>