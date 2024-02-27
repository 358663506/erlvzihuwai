<template>
    <div class="system-user">
        <div class="pane">
            <!-- 成员列表 -->
            <div class="user">
                <div class="header">
                    <span>首页轮播图</span>
                </div>
                <div class="container">
                    <cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
                        <el-row type="flex">
                            <cl-refresh-btn />
                            <cl-add-btn />
                            <cl-flex1 />
                            <cl-search-key />
                        </el-row>
                        <el-row>
                            <cl-table :ref="setRefs('table')" v-bind="table">
                                <!-- 图片 -->
                                <template #column-img="{ scope }">
                                    <!-- <img :src="scope.row.img" alt="" @click.stop="_onPreview(scope.row.img)" /> -->
                                    <el-image :preview-src-list="[scope.row.img]" :src="scope.row.img" :style="{ width: '100px', marginTop: '8px' }" />
                                    <!-- <cl-avatar shape="square" size="large" :src="scope.row.img" :style="{ margin: 'auto' }" @onClick="_onPreview(scope.row.img)" /> -->
                                </template>
                            </cl-table>
                        </el-row>

                        <el-row type="flex">
                            <cl-flex1 />
                            <cl-pagination />
                        </el-row>

                        <cl-upsert :ref="setRefs('upsert-role')" v-bind="upsert" :on-submit="onUpsertSubmit">
                            <template #slot-img="{ scope }">
                                <cl-upload-space v-show="!scope.img" :limit="1" @confirm="(file) => (scope.img = file)" />
                                <div class="icon-img-box">
                                    <i v-if="scope.img" class="el-icon-error" style="color: f40" @click="scope.img = ''"></i>
                                    <el-image :preview-src-list="[scope.img]" v-if="scope.img" :src="scope.img" :style="{ width: '100px', marginRight: '10px' }" />
                                </div>
                            </template>
                        </cl-upsert>
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
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useCool } from '/@/cool';
import { Table, Upsert } from '@cool-vue/crud/types';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
    name: 'applets-user',

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
                    prop: 'img',
                    label: '图片',
                    minWidth: 140
                },
                {
                    prop: 'name',
                    label: '名称',
                    minWidth: 120
                },
                {
                    prop: 'sort',
                    label: '排序',
                    minWidth: 90,
                    sortable: 'custom'
                },
                {
                    prop: 'url',
                    label: '链接',
                    minWidth: 200
                },
                {
                    prop: 'remark',
                    label: '备注',
                    minWidth: 150
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    sortable: 'custom',
                    minWidth: 150
                },
                {
                    type: 'op',
                    buttons: ['edit', 'delete'],
                    width: 100
                }
            ]
        });

        // 新增、编辑配置
        const upsert = reactive<Upsert>({
            dialog: {
                width: '800px'
            },
            items: [
                {
                    prop: 'img',
                    label: '图片',
                    span: 24,
                    component: {
                        name: 'slot-img'
                    },
                    // component: {
                    //     name: 'cl-upload',
                    //     props: {
                    //         fileDir: 'applets/slider',
                    //         text: '图片',
                    //         icon: 'el-icon-picture'
                    //     }
                    // },
                    rules: {
                        required: true,
                        message: '请上传图片'
                    }
                },
                {
                    prop: 'name',
                    label: '标题',
                    span: 24,
                    component: {
                        name: 'el-input',
                        props: {
                            placeholder: '请填写标题'
                        }
                    },
                    rules: {
                        required: true,
                        message: '请填写标题'
                    }
                },
                {
                    prop: 'url',
                    label: '链接',
                    span: 24,
                    component: {
                        name: 'el-input',
                        props: {
                            placeholder: '请填写跳转链接'
                        }
                    },
                    rules: {
                        pattern: /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
                        message: '请输入网址(URL)'
                    }
                },
                {
                    prop: 'sort',
                    label: '排序',
                    span: 12,
                    value: 1,
                    component: {
                        name: 'el-input-number',
                        props: {
                            placeholder: '请填写排序',
                            min: 1
                        }
                    }
                },

                {
                    prop: 'status',
                    label: '状态',
                    span: 12,
                    value: 1,
                    component: {
                        name: 'el-radio-group',
                        options: [
                            {
                                label: '开启',
                                value: 1
                            },
                            {
                                label: '关闭',
                                value: 0
                            }
                        ]
                    }
                },
                {
                    prop: 'remark',
                    label: '备注',
                    span: 24,
                    component: {
                        name: 'el-input',
                        props: {
                            placeholder: '请填写备注',
                            type: 'textarea',
                            rows: 4
                        }
                    }
                }
            ]
        });

        // crud 加载
        function onLoad({ ctx, app }: any) {
            ctx.service(service.applets.carousel).done();
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

        // 修改角色
        async function toRole(e?: any) {
            refs.value['upsert-role'].edit(e);
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
            upsert,
            setRefs,
            onLoad,
            refresh,
            onRefresh,
            onUpsertSubmit,
            toRole,
            preview,
            _onPreview
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
.icon-img-box {
    width: initial !important;
    position: relative;
    display: inline-block;
    .el-icon-error {
        position: absolute;
        right: 0;
        font-size: 20px;
        z-index: 4;
        top: -10px;
        background: #fff;
        color: #f40;
        border-radius: 50%;
        display: block;
    }
}
</style>
