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
                value: 1,
                component: {
                    name: 'el-radio-group',
                    options: [
                        {
                            label: '开放签名',
                            value: 1,
                            type: 'success'
                        },
                        {
                            label: '禁用签名',
                            value: 2,
                            type: 'danger'
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
