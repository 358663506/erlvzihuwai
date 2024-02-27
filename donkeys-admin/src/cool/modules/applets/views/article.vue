<template>
    <div class="system-user">
        <div class="pane">
            <!-- 成员列表 -->
            <div class="user">
                <div class="header">
                    <span>活动文章</span>
                </div>
                <div class="container">
                    <cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
                        <el-row type="flex">
                            <cl-refresh-btn />
                            <cl-add-btn />
                            <cl-flex1 />
                            <cl-search-key field="tilet" :field-list="[{ label: '文章标题', value: 'tilet' }]" />
                        </el-row>

                        <el-row>
                            <cl-table :ref="setRefs('table')" v-bind="table">
                                <!-- 图片 -->
                                <template #column-link="{ scope }">
                                    <el-button v-copy="'/pages/post/detail?id=' + scope.row.id" size="small">{{ '/pages/post/detail?id=' + scope.row.id }}</el-button>
                                </template>
                                <!-- 图片 -->
                                <template #column-articleCover="{ scope }">
                                    <el-image :preview-src-list="[scope.row.articleCover]" :src="scope.row.articleCover" :style="{ width: '100px', marginTop: '8px' }" />
                                </template>

                                <!-- 修改状态 -->
                                <template #slot-status-btn="{ scope }">
                                    <el-button v-permission="service.applets.post.permission.status" type="text" size="mini" @click="toStatus(scope.row)">状态</el-button>
                                </template>
                            </cl-table>
                        </el-row>

                        <el-row type="flex">
                            <cl-flex1 />
                            <cl-pagination />
                        </el-row>
                        <article-upsert v-bind="upsert" :on-submit="onUpsertSubmit" />
                    </cl-crud>
                </div>
            </div>
        </div>
        <cl-dialog
            v-model="preview.visible"
            title="图片预览"
            :props="{
                width: '800px'
            }"
        >
            <img style="width: 100%" :src="preview.url" alt="" />
        </cl-dialog>
        <article-status-upsert :ref="setRefs('upsert-status')" :on-submit="onUpsertStatusSubmit" :on-info="onInfoStatusSubmit" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useCool } from '/@/cool';
import { Table } from '@cool-vue/crud/types';
import ArticleUpsert from './article/upsert.vue';
import ArticleStatusUpsert from './article/upsert-status.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
    name: 'applets-user',
    components: {
        'article-upsert': ArticleUpsert,
        'article-status-upsert': ArticleStatusUpsert
    },
    setup() {
        const { refs, setRefs, store, service } = useCool();
        const preview = reactive<any>({
            visible: false,
            url: ''
        });
        // 表格配置
        const table = reactive<Table>({
            props: {
                'default-sort': {
                    prop: 'createTime',
                    order: 'descending'
                }
            },
            columns: [
                {
                    label: 'ID',
                    prop: 'id',
                    width: 60
                },
                {
                    prop: 'title',
                    label: '标题',
                    minWidth: 140
                },
                {
                    prop: 'articleCover',
                    label: '封面',
                    minWidth: 140
                },
                {
                    prop: 'top',
                    label: '置顶',
                    minWidth: 100,
                    dict: [
                        {
                            label: '是',
                            value: 1,
                            type: 'success'
                        },
                        {
                            label: '否',
                            value: 0,
                            type: 'info'
                        }
                    ]
                },
                {
                    prop: 'status',
                    label: '状态',
                    headerAlign: 'center',
                    minWidth: 120,
                    dict: [
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
                },
                {
                    prop: 'link',
                    label: '跳转链接',
                    minWidth: 180
                },
                {
                    prop: 'content',
                    label: '文章内容',
                    showOverflowTooltip: true,
                    minWidth: 250
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    sortable: 'custom',
                    minWidth: 150
                },
                {
                    type: 'op',
                    buttons: ['slot-status-btn', 'edit', 'delete'],
                    width: 160
                }
            ]
        });

        // crud 加载
        function onLoad({ ctx, app }: any) {
            ctx.service(service.applets.post).done();
            app.refresh();
        }

        // 刷新列表
        function refresh(params: any) {
            refs.value.crud.refresh(params);
        }

        // 刷新监听
        async function onRefresh(params: any, { next, render }: any) {
            const { list } = await next(params);
            render(list);
        }

        // 提交钩子
        function onUpsertSubmit(_: boolean, data: any, { next, done, close }: any) {
            next(data);
        }

        // 状态
        function toStatus(e: any) {
            refs.value['upsert-status'].upsertRef.edit(e);
        }

        function onInfoStatusSubmit(data: any, { next, done, close }: any) {
            done(data);
        }

        // 状态提交钩子
        function onUpsertStatusSubmit(_: boolean, data: any, { next, done, close }: any) {
            service.applets.post
                .status(data)
                .then(() => {
                    ElMessage.success(`状态修改成功`);
                    close();
                    refs.value.crud.refresh();
                })
                .catch((err: any) => {
                    ElMessage.error(err);
                    done();
                });
        }

        // 预览图片
        function _onPreview(url: string | undefined) {
            if (url) {
                preview.visible = true;
                preview.url = url;
            }
        }

        return {
            service,
            refs,
            table,
            setRefs,
            onLoad,
            refresh,
            onRefresh,
            onUpsertSubmit,
            onInfoStatusSubmit,
            onUpsertStatusSubmit,
            toStatus,
            _onPreview,
            preview
        };
    }
});
</script>

<style lang="scss" scoped>
.system-user {
    .pane {
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .dept {
        height: 100%;
        width: 300px;
        max-width: calc(100% - 50px);
        background-color: #fff;
        transition: width 0.3s;
        margin-right: 10px;
        flex-shrink: 0;

        &._collapse {
            margin-right: 0;
            width: 0;
        }
    }

    .user {
        width: calc(100% - 310px);
        flex: 1;

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            position: relative;
            background-color: #fff;

            span {
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
            }

            .icon {
                position: absolute;
                left: 0;
                top: 0;
                font-size: 18px;
                cursor: pointer;
                background-color: #fff;
                height: 40px;
                width: 80px;
                line-height: 40px;
                padding-left: 10px;
            }
        }
    }

    .dept,
    .user {
        overflow: hidden;
        .container {
            height: calc(100% - 40px);
        }
    }

    @media only screen and (max-width: 768px) {
        .dept {
            width: calc(100% - 100px);
        }
    }
}
</style>
