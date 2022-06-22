<template>
    <div class="wrapper" ref="wrapper">
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
// import echarts, { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts/core';
import { ECharts, EChartsOption } from 'echarts';

@Component
export default class Chart extends Vue {
    @Prop() options?: EChartsOption;
    chart?: ECharts;
    mounted() {
        if (this.options === undefined) {
            return console.log('options 为空');
        }
        const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
        chart.setOption(this.options!)
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 400px;
}
</style>