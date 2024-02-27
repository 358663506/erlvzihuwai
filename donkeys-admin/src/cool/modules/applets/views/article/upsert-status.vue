<template>
    <div class="demo-upsert">
        <cl-upsert ref="upsertRef" :items="items" :dialog="dialog" :on-submit="onSubmit" :on-info="onInfo" />
    </div>
</template>

<script lang="ts">
import { UpsertItem, UpsertRef } from '@cool-vue/crud/types';
import { defineComponent, ref } from 'vue';
import { useCool } from '/@/cool';

export default defineComponent({
    props: {
        onSubmit: {
            type: Function,
            default: () => {}
        },
        onInfo: {
            type: Function,
            default: () => {}
        }
    },
    setup() {
        const upsertRef = ref<UpsertRef>();
        const { refs } = useCool();

        const dialog = {
            props: {
                fullscreen: false,
                width: '500px'
            }
        };

        const items = ref<UpsertItem[]>([
            {
                prop: 'status',
                span: 24,
                label: '状态',
                value: 1, // 状态: 1:报名中 2:结束报名 3:活动开始 4:活动取消 5:活动结束
                component: {
                    name: 'el-radio-group',
                    options: [
                        {
                            label: '隐藏',
                            value: 0
                        },
                        {
                            label: '报名中',
                            value: 1
                        },
                        {
                            label: '结束报名',
                            value: 2
                        },
                        {
                            label: '活动开始',
                            value: 3
                        },
                        {
                            label: '活动取消',
                            value: 4
                        },
                        {
                            label: '活动结束',
                            value: 5
                        }
                    ]
                }
            }
        ]);

        return {
            items,
            upsertRef,
            dialog
        };
    }
});
</script>
