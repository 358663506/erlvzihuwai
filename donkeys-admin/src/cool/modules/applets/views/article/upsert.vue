<template>
    <div class="demo-upsert">
        <cl-upsert ref="upsertRef" :items="items" :dialog="dialog">
            <template #slot-article-cover="{ scope }">
                <el-image v-if="scope.articleCover" :src="scope.articleCover" :style="{ width: '100px', marginRight: '10px' }" />
                <cl-upload-space :bottomTxt="scope.articleCover ? '替换图片' : '上传图片'" :limit="1" @confirm="onUploadSpaceConfirm" />
            </template>
        </cl-upsert>
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
                label: '文章标题',
                span: 24,
                component: {
                    name: 'el-input',
                    props: {
                        placeholder: '请填写文章标题'
                    }
                },
                rules: {
                    required: true,
                    message: '文章标题不能为空'
                }
            },
            {
                label: '文章封面',
                prop: 'articleCover',
                component: {
                    name: 'slot-article-cover'
                }
            },
            {
                prop: 'departureTime',
                label: '出行时间',
                span: 12,
                value: new Date(),
                component: {
                    name: 'el-date-picker',
                    props: {
                        type: 'datetime',
                        valueFormat: 'YYYY-MM-DD HH:mm:ss'
                    }
                },
                rules: {
                    required: true,
                    message: '出行时间不能为空'
                }
            },
            {
                prop: 'destinationPos',
                label: '出行目的地',
                span: 12,
                component: {
                    name: 'el-input',
                    props: {
                        placeholder: '请填写出行目的地'
                    }
                },
                rules: {
                    required: true,
                    message: '出行目的地不能为空'
                }
            },
            {
                prop: 'lanscapeLevel',
                label: '风景级别',
                span: 12,
                value: 5,
                component: {
                    name: 'el-radio-group',
                    options: [
                        {
                            label: '1星',
                            value: 1
                        },
                        {
                            label: '2星',
                            value: 2
                        },
                        {
                            label: '3星',
                            value: 3
                        },
                        {
                            label: '4星',
                            value: 4
                        },
                        {
                            label: '5星',
                            value: 5
                        }
                    ]
                }
            },
            {
                prop: 'difficulty',
                label: '活动难度',
                span: 12,
                value: 1,
                component: {
                    name: 'el-radio-group',
                    options: [
                        {
                            label: '1星',
                            value: 1
                        },
                        {
                            label: '2星',
                            value: 2
                        },
                        {
                            label: '3星',
                            value: 3
                        },
                        {
                            label: '4星',
                            value: 4
                        },
                        {
                            label: '5星',
                            value: 5
                        }
                    ]
                }
            },

            {
                prop: 'status',
                label: '状态',
                span: 14,
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
            },
            {
                prop: 'top',
                label: '置顶',
                span: 8,
                value: 0,
                component: {
                    name: 'el-radio-group',
                    options: [
                        {
                            label: '是',
                            value: 1
                        },
                        {
                            label: '否',
                            value: 0
                        }
                    ]
                }
            },
            {
                prop: 'content',
                label: '文章内容',
                span: 24,
                component: {
                    name: 'cl-editor-quill',
                    props: {
                        placeholder: '请填写文章内容',
                        height: '400px',
                        fileDir: 'applets/posts'
                    }
                },
                rules: {
                    required: true,
                    message: '文章内容不能为空'
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
