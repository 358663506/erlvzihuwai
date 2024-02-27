<template>
    <div class="system-user">
        <div class="pane">
            <!-- 成员列表 -->
            <div class="user">
                <div class="header">
                    <span>协议</span>
                </div>
                <div class="container">
                    <cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
                        <el-row type="flex">
                            <cl-refresh-btn />
                            <cl-add-btn />
                            <cl-flex1 />
                            <cl-search-key field="tilet" :field-list="[{ label: '协议标题', value: 'tilet' }]" />
                        </el-row>

                        <el-row>
                            <cl-table :ref="setRefs('table')" v-bind="table">
                                <!-- 小程序二维码 -->
                                <template #slot-getAgreementQRCode-btn="{ scope }">
                                    <el-button
                                        v-permission="service.applets.agreement.permission.getAgreementQRCode"
                                        type="text"
                                        size="mini"
                                        @click="getAgreementQRCode(scope.row)"
                                    >
                                        小程序二维码
                                    </el-button>
                                </template>
                                <!-- 签名详情 -->
                                <template #slot-detail-btn="{ scope }">
                                    <agreement-autograph :row="scope.row" />
                                </template>
                                <!-- 修改状态 -->
                                <template #slot-status-btn="{ scope }">
                                    <el-button
                                        style="margin-left: 10px"
                                        v-permission="service.applets.agreement.permission.status"
                                        type="text"
                                        size="mini"
                                        @click="toStatus(scope.row)"
                                    >
                                        状态
                                    </el-button>
                                </template>
                            </cl-table>
                        </el-row>

                        <el-row type="flex">
                            <cl-flex1 />
                            <cl-pagination />
                        </el-row>
                        <agreement-upsert v-bind="upsert" :on-submit="onUpsertSubmit" />
                    </cl-crud>
                </div>
            </div>
        </div>
        <cl-dialog
            v-model="preview.visible"
            title="小程序二维码"
            :props="{
                width: '400px'
            }"
            center
            :controls="['cl-flex1', 'fullscreen', 'close']"
        >
            <img style="width: 100%" :src="preview.url" alt="" />
            <div class="el-dialog__footer">
                <span class="dialog-footer">
                    <el-button size="small" type="primary" @click="downloadImg">下载图片</el-button>
                    <el-button size="small" @click="preview.visible = false">关闭</el-button>
                </span>
            </div>
        </cl-dialog>
        <agreement-status-upsert :ref="setRefs('upsert-status')" :on-submit="onUpsertStatusSubmit" :on-info="onInfoStatusSubmit" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useCool } from '/@/cool';
import { Table } from '@cool-vue/crud/types';
import AgreementUpsert from './agreement/upsert.vue';
import AgreementStatusUpsert from './agreement/upsert-status.vue';
import AgreementAutograph from './agreement/autograph.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import fileDownload from 'js-file-download';
// 开发模式
const isDev: Boolean = import.meta.env.MODE === 'development';
export default defineComponent({
    name: 'applets-user',
    components: {
        'agreement-upsert': AgreementUpsert,
        'agreement-status-upsert': AgreementStatusUpsert,
        'agreement-autograph': AgreementAutograph
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
                    prop: 'content',
                    label: '协议内容',
                    showOverflowTooltip: true,
                    minWidth: 250
                },
                {
                    prop: 'status',
                    label: '状态',
                    minWidth: 100,
                    dict: [
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
                {
                    prop: 'autographUserCount',
                    label: '签名用户数',
                    minWidth: 140
                },
                {
                    prop: 'autographCount',
                    label: '签名总数',
                    minWidth: 140
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    minWidth: 150
                },
                {
                    type: 'op',
                    buttons: ['slot-getAgreementQRCode-btn', 'slot-detail-btn', 'slot-status-btn', 'edit', 'delete'],
                    width: 300
                }
            ]
        });

        // crud 加载
        function onLoad({ ctx, app }: any) {
            ctx.service(service.applets.agreement).done();
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
            service.applets.agreement
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
        function getAgreementQRCode(row: any) {
            if (row.qrcode) {
                let baseApi = isDev ? '/dev' : '/api';
                _onPreview(baseApi + row.qrcode);
                return;
            }
            service.applets.agreement
                .getAgreementQRCode(row)
                .then((res: any) => {
                    let baseApi = isDev ? '/dev' : '/api';
                    _onPreview(baseApi + res);
                })
                .catch((err: any) => {
                    ElMessage.error(err);
                });
        }

        // 预览图片
        function _onPreview(url: string | undefined) {
            if (url) {
                preview.visible = true;
                preview.url = url;
            }
        }

        // 下载图片
        function downloadImg() {
            if (preview.url) {
                Promise.resolve(preview.url)
                    .then((url) => {
                        return fetch(url).then((res) => res.blob());
                    })
                    .then((blob) => {
                        fileDownload(blob, '协议二维码.png'); // 下载图片
                        ElMessage.success('下载图片成功');
                    })
                    .catch(() => {
                        ElMessage.error('下载图片失败');
                    })
                    .finally(() => {});
            }
        }

        // 签名详情
        function toDetail(row: any) {}
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
            getAgreementQRCode,
            preview,
            toDetail,
            downloadImg
        };
    }
});
</script>

<style lang="scss" scoped>
.system-user {
    div[class='el-dialog__footer'] {
        padding: var(--el-dialog-padding-primary);
        padding-top: 10px;
        padding-bottom: 0;
        padding-right: 0;
        text-align: center;
    }
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
