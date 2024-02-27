<template>
    <div class="demo-upsert">
        <cl-upsert ref="upsertRef" :items="items" :dialog="dialog"></cl-upsert>
    </div>
</template>

<script lang="ts">
import { UpsertItem, UpsertRef } from '@cool-vue/crud/types';
import { defineComponent, ref } from 'vue';
import { useCool } from '/@/cool';

export default defineComponent({
    setup() {
        const upsertRef = ref<UpsertRef>();
        const { refs } = useCool();

        const dialog = {
            props: {
                fullscreen: false,
                width: '1200px',
                top: '10px'
            }
        };

        const items = ref<UpsertItem[]>([
            {
                prop: 'title',
                label: '协议标题',
                span: 24,
                component: {
                    name: 'el-input',
                    props: {
                        placeholder: '请填写协议章标题'
                    }
                },
                rules: {
                    required: true,
                    message: '协议标题不能为空'
                }
            },
            {
                prop: 'status',
                label: '状态',
                span: 24,
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
                },
                rules: {
                    required: true,
                    message: '协议状态不能为空'
                }
            },
            {
                prop: 'content',
                label: '文章内容',
                span: 24,
                component: {
                    name: 'cl-editor-quill',
                    props: {
                        placeholder: '请填写协议内容',
                        height: '400px',
                        fileDir: 'applets/agreement'
                    }
                },
                rules: {
                    required: true,
                    message: '协议内容不能为空'
                }
            }
        ]);

        // 文件确认
        function onUploadSpaceConfirm(file: any) {
            upsertRef.value?.setForm('articleCover', file);
        }

        return {
            items,
            upsertRef,
            dialog,
            onUploadSpaceConfirm
        };
    }
});
</script>
