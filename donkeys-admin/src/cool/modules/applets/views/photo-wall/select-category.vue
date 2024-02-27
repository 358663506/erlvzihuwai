<template>
    <div class="demo-upsert">
        <cl-form :ref="setRefs('upsertRef')" />
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
            defaulte: () => {}
        }
    },
    setup(props) {
        const upsertRef = ref<UpsertRef>();
        const { refs, setRefs } = useCool();
        // 编辑分类
        function edit(list: any = {}, classifyId: number, ids: any[]) {
            console.log(list);
            console.log(refs.value.upsertRef);
            refs.value.upsertRef.open({
                title: '移动文件',
                width: '500px',
                items: [
                    {
                        label: '选择分类',
                        prop: 'classifyId',
                        value: classifyId || null,
                        component: {
                            name: 'el-select',
                            options: list.map((it: any) => ({
                                label: it.name,
                                value: it.id
                            })),
                            on: {
                                change: (v: number) => {}
                            }
                        }
                    }
                ],
                on: {
                    submit: (data: any, { done, close }: any) => {
                        // 分类 id
                        if (data.classifyId == classifyId) {
                            close();
                            return;
                        }
                        if (props?.onSubmit) {
                            // 照片 id 列表
                            data.ids = ids;
                            return props.onSubmit(data, { done, close });
                        }
                    }
                }
            });
        }
        return {
            upsertRef,
            setRefs,
            edit
        };
    }
});
</script>
