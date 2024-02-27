<template>
    <div class="system-user">
        <div class="pane">
            <!-- 成员列表 -->
            <div class="user">
                <div class="header">
                    <span>微信小程序用户</span>
                </div>

                <div class="container">
                    <cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
                        <el-row type="flex">
                            <cl-refresh-btn />
                            <cl-flex1 />
                            <cl-search-key />
                        </el-row>

                        <el-row>
                            <cl-table :ref="setRefs('table')" v-bind="table">
                                <!-- 头像 -->
                                <template #column-avatarUrl="{ scope }">
                                    <cl-avatar shape="square" size="medium" :src="scope.row.avatarUrl" :style="{ margin: 'auto' }" />
                                </template>

                                <!-- 修改角色 -->
                                <template #slot-role-btn="{ scope }">
                                    <el-button v-permission="service.applets.user.permission.role" type="text" size="mini" @click="toRole(scope.row)">修改角色</el-button>
                                </template>
                            </cl-table>
                        </el-row>

                        <el-row type="flex">
                            <cl-flex1 />
                            <cl-pagination />
                        </el-row>

                        <cl-upsert :ref="setRefs('upsert-role')" v-bind="upsert" :on-submit="onUpsertSubmit" />
                    </cl-crud>
                </div>
            </div>
        </div>
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
                    prop: 'avatarUrl',
                    label: '头像'
                },
                {
                    prop: 'username',
                    label: '用户名',
                    minWidth: 120
                },
                {
                    prop: 'nickName',
                    label: '昵称',
                    minWidth: 120
                },
                {
                    prop: 'role',
                    label: '角色',
                    headerAlign: 'center',
                    minWidth: 120,
                    dict: [
                        {
                            label: '管理员',
                            value: 0,
                            type: 'success'
                        },
                        {
                            label: '会员',
                            value: 1,
                            type: 'info'
                        },
                        {
                            label: '普通用户',
                            value: 99,
                            type: 'danger'
                        }
                    ]
                },
                {
                    prop: 'openId',
                    label: 'openId',
                    minWidth: 150
                },
                {
                    prop: 'phone',
                    label: '手机号码',
                    minWidth: 150
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
                    buttons: ['slot-role-btn'],
                    width: 160
                }
            ]
        });

        // 新增、编辑配置
        const upsert = reactive<Upsert>({
            dialog: {
                width: '500px'
            },
            items: [
                {
                    prop: 'nickName',
                    label: '昵称',
                    span: 12,
                    component: {
                        name: 'el-input',
                        props: {
                            placeholder: '请填写昵称',
                            disabled: true
                        }
                    },
                    rules: {
                        required: true,
                        message: '昵称不能为空'
                    }
                },
                {
                    prop: 'role',
                    label: '角色',
                    value: 99,
                    component: {
                        name: 'el-radio-group',
                        options: [
                            {
                                label: '管理员',
                                value: 0
                            },
                            {
                                label: '会员',
                                value: 1
                            },
                            {
                                label: '普通会员',
                                value: 99
                            }
                        ]
                    },
                    rules: {
                        required: true,
                        message: '角色不能为空'
                    }
                }
            ]
        });

        // crud 加载
        function onLoad({ ctx, app }: any) {
            ctx.service(service.applets.user).done();
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
            service.applets.user
                .role(data)
                .then(() => {
                    ElMessage.success(`角色修改成功`);
                    close();
                })
                .catch((err: any) => {
                    ElMessage.error(err);
                    done();
                });
        }

        // 修改角色
        async function toRole(e?: any) {
            refs.value['upsert-role'].edit(e);
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
            toRole
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
