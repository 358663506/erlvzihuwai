<template>
    <div class="cl-upload-space__wrap">
        <div class="cl-upload-space_photo">
            <!-- 类目 -->
            <category v-model="category.id" @change="refresh()" @changeItem="changeItem" />
            <!-- 内容 -->
            <div class="cl-upload-space_photo__content">
                <div class="cl-upload-space_photo__content__header">
                    <div class="icon" @click="typeExpand">
                        <i class="el-icon-arrow-left" v-if="category.visible"></i>
                        <i class="el-icon-arrow-right" v-else></i>
                    </div>
                    <el-button style="margin: 0 10px" v-if="category.id > 0" v-copy="'/pages/medias/detail?id=' + category.id" size="small">
                        {{ '/pages/medias/detail?id=' + category.id }}
                    </el-button>
                    <span>{{ category.name }}</span>
                </div>
                <!-- 操作栏 -->
                <div class="cl-upload-space_photo__header scroller1">
                    <el-button size="mini" @click="refresh()">刷新</el-button>
                    <cl-upload
                        style="margin: 0 10px"
                        list-type="slot"
                        :action="action"
                        :accept="accept"
                        :limit-size="limitSize"
                        :show-file-list="false"
                        :headers="headers"
                        :data="data"
                        :disabled="disabled"
                        :rename="rename"
                        :on-success="onSuccess"
                        :on-error="onError"
                        :on-progress="onProgress"
                        :before-upload="beforeUpload"
                        :multiple="true"
                    >
                        <el-button size="mini" type="primary">点击上传</el-button>
                    </cl-upload>

                    <el-button type="danger" size="mini" :disabled="!isSelected" @click="remove()">删除选中文件</el-button>
                    <el-button type="success" size="mini" :disabled="!isSelected" @click="move()">移动选中文件到分类</el-button>
                </div>

                <!-- 文件区域 -->
                <div v-loading="loading" class="cl-upload-space_photo__file scroller1" element-loading-text="拼命加载中">
                    <!-- 文件列表 -->
                    <template v-if="list.length > 0">
                        <div class="cl-upload-space_photo__file-list">
                            <file-item
                                v-for="item in list"
                                :key="item.id"
                                v-loading="item.loading"
                                :modelValue="item"
                                :element-loading-text="item.progress"
                                @select="select"
                                @remove="remove"
                            />
                        </div>
                    </template>

                    <!-- 空态 -->
                    <div v-else class="cl-upload-space_photo__file-empty">
                        <cl-upload
                            drag
                            :fileDir="fileDir"
                            :action="action"
                            :accept="accept"
                            :limit-size="limitSize"
                            :limit="1000"
                            :headers="headers"
                            :data="data"
                            :disabled="disabled"
                            :rename="rename"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :on-progress="onProgress"
                            :before-upload="beforeUpload"
                            :multiple="true"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                        </cl-upload>
                    </div>
                </div>

                <!-- 分页 -->
                <div class="cl-upload-space_photo__footer">
                    <el-pagination background :page-size="pagination.size" :current-page="pagination.page" :total="pagination.total" @current-change="onCurrentChange" />
                </div>
            </div>
        </div>
        <SelectCategory :ref="setRefs('selectCategory')" :on-submit="selectCategorySubmit"></SelectCategory>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { isEmpty } from '/@/cool/utils';
import Category from './photo-wall/category.vue';
import SelectCategory from './photo-wall/select-category.vue';
import FileItem from './photo-wall/file-item.vue';
import { useCool } from '/@/cool';

export default defineComponent({
    name: 'cl-upload-space_photo',

    components: {
        Category,
        FileItem,
        SelectCategory
    },

    props: {
        // 绑定值
        modelValue: String,
        // 上传的地址
        action: String,
        // 选择图片的长度
        limit: {
            type: Number,
            default: 999
        },
        // 最大允许上传文件大小(MB)
        limitSize: {
            type: Number,
            default: 10000
        },
        // 是否禁用
        disabled: Boolean,
        // 是否以 uuid 重命名
        rename: Boolean,
        // 设置上传的请求头部
        headers: Object,
        // 上传时附带的额外参数
        data: Object,
        // 上传的文件类型
        accept: String,
        // 是否返回详细数据
        detailData: Boolean,
        // 是否显示按钮
        showButton: {
            type: Boolean,
            default: true
        }
    },

    setup(props, { emit }) {
        const { refs, store, service, setRefs } = useCool();
        // 是否加载中
        const loading = ref<boolean>(false);

        // 浏览器信息
        const browser = computed(() => store.getters.browser);

        // 已选列表
        const selection = ref<any[]>([]);

        // 文件列表
        const list = ref<any[]>([]);

        // 类目数据
        const category = reactive<any>({
            name: '',
            id: '',
            visible: true
        });

        // 分页信息
        const pagination = reactive<any>({
            page: 1,
            size: 24,
            total: 0
        });

        // 监听屏幕大小变化
        watch(
            () => browser.value.isMini,
            (val) => {
                category.visible = !val;
            },
            {
                immediate: true
            }
        );

        // 是否选中
        const isSelected = computed(() => !isEmpty(selection.value));

        // Provide
        provide('space', {
            category,
            selection
        });

        // 清空选择
        function clear() {
            selection.value = [];
        }

        // 是否显示分类
        function typeExpand() {
            category.visible = !category.visible;
        }

        // 上传成功
        function onSuccess(res: any, file: any) {
            const item = list.value.find((e: any) => file.uid == e.uid);

            if (item) {
                item.url = res.data;

                service.applets.photoWall
                    .add({
                        url: res.data,
                        type: item.type,
                        classifyId: item.classifyId > 0 ? item.classifyId : null // -1 为未分类（前端判断）
                    })
                    .then((res: any) => {
                        item.loading = false;
                        item.id = res.id;
                    })
                    .catch((err: string) => {
                        ElMessage.error(err);
                    });
            }
        }

        // 上传失败
        function onError(err: string, file: any) {
            const item = list.value.find((e) => file.uid == e.uid);

            if (item) {
                item.loading = false;
                item.error = err;
            }
        }

        // 上传前，添加文件
        function beforeUpload({ tempFilePath, type, uid }: any) {
            list.value.unshift({
                url: tempFilePath,
                type,
                uid,
                classifyId: category.id,
                loading: true,
                progress: '0%'
            });
        }

        // 上传进度
        function onProgress({ percent }: any, file: any) {
            const item = list.value.find(({ uid }: any) => uid == file.uid);

            if (item) {
                item.progress = percent + '%';
            }
        }

        // 刷新资源文件
        async function refresh(params: any = {}) {
            // 清空选择
            clear();

            // 加载中
            loading.value = true;

            await service.applets.photoWall
                .page({
                    ...pagination,
                    ...params,
                    classifyId: category.id,
                    type: props.accept
                })
                .then((res: any) => {
                    Object.assign(pagination, res.pagination);

                    list.value = res.list.map((e: any) => {
                        return {
                            ...e,
                            loading: false
                        };
                    });
                });

            // 加载完成
            loading.value = false;
        }

        // 确认选中
        async function move() {
            let list = await service.applets.photoWallType.list();
            const ids = selection.value.map((e: any) => e.id);
            refs.value.selectCategory.edit(list, category.id, ids);
        }
        // 移动
        async function selectCategorySubmit(data: any, { done, close }: any) {
            service.applets.photoWall
                .move({
                    classifyId: data.classifyId,
                    ids: data.ids
                })
                .then(() => {
                    ElMessage.success('移动成功');
                    refresh();
                    close();
                })
                .catch((err: string) => {
                    ElMessage.error(err);
                    done();
                });
        }

        // 选择
        function select(item: any) {
            const index = selection.value.findIndex((e: any) => e.id === item.id);

            if (index >= 0) {
                selection.value.splice(index, 1);
            } else {
                if (selection.value.length < props.limit) {
                    selection.value.push(item);
                }
            }
        }

        // 删除选中
        function remove(item?: any) {
            // 已选文件 id
            const ids: number[] = item ? [item.id] : selection.value.map((e: any) => e.id);

            ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
                type: 'warning'
            })
                .then(() => {
                    ElMessage.success('删除成功');

                    // 删除文件及选择
                    ids.forEach((id) => {
                        [list.value, selection.value].forEach((list) => {
                            const index = list.findIndex((e: any) => e.id === id);
                            list.splice(index, 1);
                        });
                    });

                    // 删除请求
                    service.applets.photoWall
                        .delete({
                            ids
                        })
                        .catch((err: string) => {
                            ElMessage.error(err);
                        });
                })
                .catch(() => null);
        }

        // 页面切换
        function onCurrentChange(page: number) {
            refresh({ page });
        }

        function changeItem(item: any = {}) {
            category.name = item.name || '';
        }

        // 上传的文件类型
        const accept: String = 'image/*,video/*';

        return {
            loading,
            selection,
            list,
            category,
            pagination,
            browser,
            isSelected,
            open,
            close,
            refresh,
            remove,
            move,
            select,
            onSuccess,
            onError,
            beforeUpload,
            onProgress,
            onCurrentChange,
            accept,
            setRefs,
            // 上传到哪个目录(云端默认临时目录)
            fileDir: 'applets/photoWall',
            selectCategorySubmit,
            typeExpand,
            changeItem
        };
    }
});
</script>

<style lang="scss">
.dialog-upload-space {
    .el-dialog {
        &__body {
            padding: 0 !important;
        }
    }
}

.cl-upload-space_photo {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    background-color: #f7f7f7;
    padding: 5px;

    &__content {
        flex: 1;
        max-width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        &__header {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 10px;
            background-color: #fff;
            letter-spacing: 1px;
            position: relative;

            div {
                font-size: 14px;
                flex: 1;
                white-space: nowrap;
            }

            i {
                font-size: 18px;
                cursor: pointer;
            }
        }
    }

    &__header {
        display: flex;
        align-items: center;
        height: 50px;
        overflow: auto hidden;
    }

    &__file {
        height: calc(100% - 140px);
        position: relative;

        &-list {
            display: flex;
            flex-wrap: wrap;
        }

        &-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: calc(50% - 90px);
            left: calc(50% - 160px);

            .cl-upload {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 6px;
                cursor: pointer;

                .el-upload-dragger {
                    height: 180px;
                    width: 320px;
                }

                i {
                    font-size: 67px;
                    color: #c0c4cc;
                }
            }
        }
    }

    &__footer {
        padding: 9px 0;
    }
}
</style>
