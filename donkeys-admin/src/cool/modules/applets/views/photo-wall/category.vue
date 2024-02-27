<template>
    <div
        class="cl-upload-space-category"
        style="z-index: 2000"
        :class="{
            'is-position': browser.isMini,
            'is-show': space.category.visible
        }"
    >
        <div class="cl-upload-space-category__search">
            <el-button type="primary" size="mini" @click="edit()">添加分类</el-button>

            <el-input v-model="keyword" placeholder="输入关键字过滤" size="mini" />
        </div>

        <div class="cl-upload-space-category__list">
            <ul class="scroller1">
                <li
                    v-for="(item, index) in flist"
                    :key="index"
                    :class="{
                        'is-active': item.id == current
                    }"
                    @click="select(item.id)"
                    @contextmenu.stop.prevent="openContextMenu($event, item)"
                >
                    <span>
                        {{ item.name }}
                    </span>
                    <span>
                        <el-tag class="ml-2" type="success" effect="dark" v-if="item.status === 1" size="small">展示</el-tag>
                        <el-tag class="ml-2" type="danger" v-if="item.status === 0" size="small">隐藏</el-tag>
                        <span v-if="browser.isMini">
                            <a v-if="item.id == null" @click.stop="refresh()">刷新</a>
                            <a
                                @click.stop="
                                    (e) => {
                                        edit({ ...item });
                                    }
                                "
                                v-if="item.id > 0"
                            >
                                编辑
                            </a>
                            <a
                                style="margin-left: 8px; color: #f60"
                                @click.stop="
                                    (e) => {
                                        del({ ...item });
                                    }
                                "
                                v-if="item.id > 0"
                            >
                                删除
                            </a>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div :class="$style.pageBox">
            <el-pagination
                :class="$style.page"
                background
                :page-size="pagination.size"
                :current-page="pagination.page"
                :total="pagination.total"
                @current-change="onCurrentChange"
                small
            />
        </div>

        <cl-form :ref="setRefs('form')">
            <template #slot-img="{ scope }">
                <cl-upload-space v-show="!scope.img && current != -1" :limit="1" @confirm="(file) => (scope.img = file)" />
                <div class="icon-img-box">
                    <i v-if="scope.img" class="el-icon-error" style="color: f40" @click="scope.img = ''"></i>
                    <el-image :preview-src-list="[scope.img]" v-if="scope.img" :src="scope.img" :style="{ width: '100px', marginRight: '10px' }" />
                </div>
            </template>
        </cl-form>
    </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, inject, ref, watch, reactive } from 'vue';
import { isEmpty } from '/@/cool/utils';
import { ContextMenu } from '@cool-vue/crud';
import { useCool } from '/@/cool';

export default defineComponent({
    name: 'cl-upload-space-category',

    props: {
        modelValue: [Number, String],
        isExpand: Boolean
    },

    emits: ['update:modelValue', 'change', 'changeItem'],

    setup(_, { emit }) {
        const { refs, setRefs, service, store }: any = useCool();
        const space = inject<any>('space');

        // 分页信息
        const pagination = reactive<any>({
            page: 1,
            size: 24,
            total: 0
        });
        // 页面切换
        function onCurrentChange(page: number) {
            refresh({ page });
        }
        // 数据列表
        const list = ref<any[]>([]);

        // 当前选择
        const current = ref<number | string>('');

        // 搜索关键字
        const keyword = ref<string>('');

        // 过滤列表
        const flist = computed(() => {
            return list.value.filter((e: any) => e.name.includes(keyword.value));
        });

        // 浏览器信息
        const browser = computed(() => store.getters.browser);

        // 监听选择变化
        watch(
            () => current.value,
            (id: number | string) => {
                let item = list.value.find((it) => it.id === id);
                emit('update:modelValue', id);
                emit('change', id);
                emit('changeItem', item);
            }
        );

        // 监听屏幕大小变化
        watch(
            () => space.category.visible,
            (val) => {},
            {
                immediate: true
            }
        );

        // 刷新分类
        function refresh(params: any = {}) {
            return service.applets.photoWallType
                .page({
                    ...pagination,
                    ...params
                })
                .then((res: any) => {
                    Object.assign(pagination, res.pagination);
                    res.list.unshift({
                        name: '未分类文件',
                        id: '-1'
                    });
                    res.list.unshift({
                        name: '全部文件',
                        id: null
                    });

                    list.value = res.list;
                    if (!isEmpty(res.list)) {
                        if (!current.value) {
                            current.value = res.list[0].id;
                        }
                    }
                });
        }

        // 编辑分类
        function edit(item: any = {}) {
            console.log(refs.value.form);
            refs.value.form.resetFields();
            refs.value.form.clear();
            refs.value.form.open({
                title: item && item.id ? '编辑分类' : '添加分类',
                width: '400px',
                items: [
                    {
                        label: '分类名称',
                        prop: 'name',
                        value: item.name,
                        component: {
                            name: 'el-input',
                            attrs: {
                                placeholder: '请填写分类名称'
                            }
                        },
                        rules: {
                            required: true,
                            message: '分类名称不能为空'
                        }
                    },
                    {
                        label: '活动时间',
                        prop: 'departureTime',
                        value: item.departureTime,
                        component: {
                            name: 'el-date-picker',
                            props: {
                                type: 'date',
                                valueFormat: 'YYYY-MM-DD'
                            }
                        },
                        rules: {
                            required: true,
                            message: '活动时间不能为空'
                        }
                    },
                    {
                        prop: 'img',
                        label: '封面',
                        span: 24,
                        value: item.img,
                        component: {
                            name: 'slot-img'
                        }
                    },
                    {
                        prop: 'status',
                        label: '状态',
                        span: 24,
                        value: 1, // 状态: 1:展示 0:隐藏
                        component: {
                            name: 'el-radio-group',
                            options: [
                                {
                                    label: '隐藏',
                                    value: 0
                                },
                                {
                                    label: '展示',
                                    value: 1
                                }
                            ]
                        }
                    }
                ],
                on: {
                    submit: (data: any, { done, close }: any) => {
                        let next = null;

                        if (!item.id) {
                            next = service.applets.photoWallType.add(data);
                        } else {
                            next = service.applets.photoWallType.update({
                                ...data,
                                id: item.id
                            });
                        }

                        next.then(() => {
                            refresh();
                            close();
                        }).catch((err: string) => {
                            ElMessage.error(err);
                            done();
                        });
                    }
                }
            });
        }

        // 选择类目
        function select(id: number) {
            current.value = id;
            // 小屏幕下收起左侧类目
            if (browser.value.isMini) {
                space.category.visible = false;
            }
        }

        // 打开类目列表右键菜单
        function openContextMenu(e: any, { id, name, departureTime, img }: any) {
            if (!id || id < 1) {
                return false;
            }
            ContextMenu.open(e, {
                list: [
                    {
                        label: '刷新',
                        'suffix-icon': 'el-icon-refresh',
                        callback: (_: any, done: Function) => {
                            refresh();
                            done();
                        }
                    },
                    {
                        label: '编辑',
                        'suffix-icon': 'el-icon-edit',
                        callback: (_: any, done: Function) => {
                            edit({ id, name, departureTime, img });
                            done();
                        }
                    },
                    {
                        label: '删除',
                        'suffix-icon': 'el-icon-delete',
                        callback: (_: any, done: Function) => {
                            del({ id, name, departureTime, img });
                            done();
                        }
                    }
                ]
            });
        }
        function del({ id, name, departureTime, img }: any) {
            ElMessageBox.confirm(`此操作将删除【${name}】下的文件, 是否继续?`, '提示', {
                type: 'warning'
            })
                .then(() => {
                    service.applets.photoWallType
                        .delete({
                            ids: [id]
                        })
                        .then(() => {
                            ElMessage.success('删除成功');

                            if (id == current.value) {
                                current.value = 0;
                            }

                            refresh();
                        })
                        .catch((err: string) => {
                            ElMessage.error(err);
                        });
                })
                .catch(() => null);
        }

        refresh();

        return {
            refs,
            setRefs,
            browser,
            space,
            list,
            flist,
            current,
            keyword,
            refresh,
            edit,
            select,
            openContextMenu,
            pagination,
            onCurrentChange,
            del
        };
    }
});
</script>

<style lang="scss" scoped>
.cl-upload-space-category {
    height: 100%;
    width: 0;
    background-color: #fff;
    overflow: hidden;
    transition: width 0.2s ease-in-out;
    border-radius: 5px;

    &.is-show {
        width: 250px;
        margin-right: 5px;
    }

    &.is-position {
        position: absolute;
        left: 5px;
        top: 51px;
        height: calc(100% - 56px);
        z-index: 3000;

        &.is-show {
            width: calc(100% - 10px);
        }
    }

    &__search {
        display: flex;
        align-items: center;
        padding: 10px;

        .el-button {
            margin-right: 10px;
        }
    }

    &__list {
        height: calc(100% - 148px);
        padding: 0 10px;
        overflow-y: auto;

        ul {
            height: 100%;

            li {
                list-style: none;
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px dashed #eee;
                padding: 0 10px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;

                &.is-active {
                    color: $color-primary;
                }
                a {
                    color: $color-primary;
                }

                &:hover {
                    background-color: #f7f7f7;
                }
            }
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

<style lang="scss" module>
.pageBox {
    height: 100px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
}
.page {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-bottom: 10px;
    justify-content: center;
    > * {
        margin-top: 4px;
    }
    span[class*='el-pagination__jump'] {
        margin-left: 10px !important;
    }
}
</style>
