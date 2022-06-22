<template>

    <Layout>
        <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart class="chart" :options="x" />

        </div>
        <!-- 用JS配置 height
            <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" height="48px" /> -->

        <ol v-if="groupedList.length > 0">

            <li v-for="(group, index) in groupedList" :key="index">

                <h3 class="title">{{ beautify(group.title) }} <span>¥{{ group.total }}</span></h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id" class="record">
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="note">{{ item.notes }}</span>
                        <span>¥{{ item.amount }}</span>
                    </li>
                </ol>
            </li>

        </ol>
        <div v-else class="noResult">
            目前没有相关记录
        </div>
    </Layout>
</template>


<script lang="ts">

import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';



@Component({
    components: { Tabs, Chart }
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
    }
    mounted() {
        (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
    }
    beautify(string: string) {
        const now = dayjs();
        const day = dayjs(string);
        if (day.isSame(now, 'day')) {
            return '今天';
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天';
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天';
        } else if (day.isSame(now, 'year')) {
            return day.format('M月D日');
        } else {
            return day.format('YYYY年M月D日');
        }

    }
    get x() {
        return {
            grid: {
                left: 0,
                right: 0
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                ],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                }
            },
            yAxis: {
                type: 'value',
                show: false,
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320,
                    820, 932, 901, 934, 1290, 1330, 1320,
                    820, 932, 901, 934, 1290, 1330, 1320,
                    820, 932, 901, 934, 1290, 1330, 1320, 1, 2
                ],
                type: 'line',
                symbol: 'circle',
                symbolSize: 12,
                itemStyle: {
                    color: "#9295f3",
                    borderWidth: 1,
                    borderColor: "#9295f3"
                }
            }],
            tooltip: {
                show: true, triggerOn: 'click',
                position: 'top',
                formatter: '{c}'
            }
        };
    }
    get recordList() {
        return (this.$store.state as RootState).recordList;
    }
    get groupedList() {
        const { recordList } = this;

        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
        if (newList.length === 0) { return [] as Result; }

        type Result = { title: string, total?: number, items: RecordItem[] }[];
        const result: Result = [{ title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]] }];
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
                last.items.push(current);
            } else {
                result.push({ title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current] })
            }
        }
        result.map(group => {
            group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
        });

        return result;

    }

    beforeCreate() {
        this.$store.commit('fetchRecords')
    }
    type = '-';

    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult {
    padding: 16px;
    text-align: center;
}

::v-deep {
    .type-tabs-item {
        // background: #f7f4bb;
        // background: white;
        background: lighten($color: #f7f4bb, $amount: 10%);




        &.selected {
            // background: #ede35b;
            background: lighten($color: #f7f4bb, $amount: 5%);




            // &::after {
            //     display: none;
            // }
        }
    }

    .interval-tabs-item {
        height: 48px;
        background: #ede35b;
    }
}

%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.title {
    @extend %item;
    background: lighten($color: #f7f4bb, $amount: 8%);

    // background: lighten($color: #9094ff, $amount: 15%);
    color: #3d6ee3;



}

.record {
    @extend %item;

    background: white;

}

.note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
}

.chart {
    width: 430%;

    &-wrapper {
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
