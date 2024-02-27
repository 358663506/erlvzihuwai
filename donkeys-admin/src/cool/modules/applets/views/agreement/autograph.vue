<template>
    <div class="demo-form" style="display: inline-block">
        <el-button type="text" size="mini" @click="open">签名详情</el-button>
        <cl-form ref="formRef">
            <!-- 内嵌crud -->
            <template #slot-crud>
                <cl-crud @load="onCrudLoad">
                    <el-row type="flex">
                        <cl-refresh-btn />
                        <cl-flex1 />
                        <el-button type="success" @click="onExprot(1)">导出一份协议（拼接签名信息）</el-button>
                        <el-button type="primary" @click="onExprot('all')">导出全部签名协议（{{ crudTableParam.count }}）</el-button>
                    </el-row>
                    <cl-table
                        ref="crudTable"
                        :auto-height="false"
                        :columns="[
                            {
                                label: '#',
                                type: 'index',
                                width: 60
                            },
                            {
                                label: '微信昵称',
                                prop: 'userName'
                            },
                            {
                                label: '签名内容',
                                prop: 'content'
                            },
                            {
                                label: '创建时间',
                                prop: 'createTime'
                            },
                            {
                                type: 'op',
                                buttons: ['delete'],
                                width: 120
                            }
                        ]"
                    >
                        <!-- 图片 -->
                        <template #column-content="{ scope }">
                            <span v-if="scope.row.content">
                                <el-image :preview-src-list="scope.row.content.split(',')" :src="scope.row.content.split(',')[0]" :style="{ width: '70px', marginTop: '8px' }" />
                                <el-image
                                    :preview-src-list="scope.row.content.split(',')"
                                    v-if="scope.row.content.split(',')[1]"
                                    :src="scope.row.content.split(',')[1]"
                                    :style="{ width: '70px', marginTop: '8px' }"
                                />
                            </span>
                        </template>
                    </cl-table>
                    <el-row type="flex">
                        <cl-flex1 />
                        <cl-pagination layout="total" />
                        <span>总签名数：{{ crudTableParam.count }}</span>
                    </el-row>
                </cl-crud>
            </template>
        </cl-form>
        <div class="ql-editor autograph-a4" ref="a4">
            <h4>{{ row.title }}</h4>
            <p v-html="row.content"></p>
            <p :style="{ textAlign: crudTableParam.list.length < 5 ? 'right' : 'left' }">
                <span v-for="(item, index) in crudTableParam.list" :key="index">
                    <span v-show="index > 0">、</span>
                    <img :src="item" alt="" />
                </span>
            </p>
        </div>
        <div ref="a4s">
            <div class="ql-editor autograph-a4" v-for="(item, index) in crudTableParam.list" :key="index">
                <h4>{{ row.title }}</h4>
                <p v-html="row.content"></p>
                <p style="text-align: right; display: block">
                    <span style="text-align: right; display: inline-block">
                        <img :src="item" alt="" style="display: inline-block" />
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import html2canvas from 'html2canvas'; // 转图片
import fileDownload from 'js-file-download';
import { ElMessage, ElMessageBox } from 'element-plus';

import { defineComponent, ref, resolveComponent, h, watch, nextTick } from 'vue';
import { CrudLoad, FormItem, FormRef } from '@cool-vue/crud/types';
import Test from './render/test.vue';
import { useCool } from '/@/cool';

export default defineComponent({
    props: {
        row: Object
    },
    setup(props) {
        const { refs, setRefs, store, service } = useCool();
        const formRef = ref<FormRef>();

        const items: FormItem[] = [
            {
                props: {
                    labelWidth: '0px'
                },
                component: {
                    name: 'slot-crud'
                }
            },
            {}
        ];

        function open() {
            formRef.value?.open({
                title: '签名详情',
                width: '1000px',
                props: {
                    labelWidth: '140px'
                },
                items,
                op: {
                    buttons: []
                }
            });
        }
        let __list: any[] = [];
        const crudTableParam = ref({
            count: 0,
            length: 0,
            list: __list
        });
        const crudTable = ref(null);
        function onCrudLoad({ ctx, app }: CrudLoad) {
            ctx.service(service.applets.autograph).done();
            app.refresh({
                page: 1,
                size: 1000,
                agreementId: props?.row?.id
            });
        }
        // 监听屏幕大小变化
        watch(
            () => crudTable.value?.data as any,
            (data: any) => {
                data = data || [];
                crudTableParam.value.length = data?.length;
                crudTableParam.value.count = data?.reduce((prev: number, item: any) => prev + +item.content?.split(',').length, 0);
                crudTableParam.value.list.length = 0;
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    let __str1 = item.content?.split(',')[0];
                    let __str2 = item.content?.split(',')[1];
                    crudTableParam.value.list.push(__str1);
                    if (__str2) {
                        crudTableParam.value.list.push(__str2);
                    }
                }
            },
            {
                immediate: true,
                deep: true
            }
        );

        function addVad(list: Array<any>) {
            list.push({
                val: ''
            });
        }

        function onExprot(type: number | string) {
            if (type === 'all') {
                imgDonwloads();
            } else if (type === 1) {
                imgDonwload();
            }
        }
        const a4 = ref(null);
        const a4s = ref(null);

        function imgDonwload() {
            let dom = a4.value as unknown as HTMLElement;
            html2canvas(dom, { allowTaint: true, useCORS: true, scale: 4 })
                .then((canvas) => {
                    return fetch(canvas.toDataURL('image/png')).then((res) => res.blob());
                })
                .then((blob) => {
                    fileDownload(blob, `${props?.row?.title}.png`); // 下载图片
                    ElMessage.success('导出图片成功');
                })
                .catch(() => {
                    ElMessage.error('导出图片失败');
                })
                .finally(() => {});
        }
        function imgDonwloads() {
            let dom = a4s.value as unknown as HTMLElement;
            let doms = dom.querySelectorAll('.autograph-a4') as unknown as HTMLElement[];
            for (let i = 0; i < doms.length; i++) {
                ((value) => {
                    html2canvas(doms[value], { allowTaint: true, useCORS: true, scale: 4 })
                        .then((canvas) => {
                            return fetch(canvas.toDataURL('image/png')).then((res) => res.blob());
                        })
                        .then((blob) => {
                            fileDownload(blob, `${props?.row?.title}-${value}.png`); // 下载图片
                            ElMessage.success('导出图片成功');
                        })
                        .catch(() => {
                            ElMessage.error('导出图片失败');
                        })
                        .finally(() => {});
                })(i);
            }
        }

        return {
            open,
            formRef,
            onCrudLoad,
            addVad,
            crudTable,
            crudTableParam,
            onExprot,
            a4,
            a4s
        };
    }
});
</script>

<style lang="scss" scoped>
.demo-form {
    margin-left: 10px;
}
.autograph-a4 {
    z-index: -999;
    position: fixed;
    width: 630px;
    height: 891px;
    top: 200vh;
    left: 200vw;
    background: #fff;
    // border: 1px solid #ccc;
    font-size: 14px;
    padding: 10px 20px;
    box-sizing: border-box;
    text-align: left;
    color: #000;
    font-family: '黑体', '宋体', 'Arial', 'Microsoft YaHei', sans-serif;
    h4 {
        font-size: 18px;
        margin-top: 10px;
        text-align: center;
    }
    p {
        margin-top: 10px;
        &:nth-child(2) {
            margin-top: 10px;
        }
    }
    img {
        margin-top: 5px;
        width: 56px;
    }
}
</style>
