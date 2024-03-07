# Crud

文档地址：[https://cool-js.com/front/vue.html](https://cool-js.com/front/vue.html)

快速完成页面 CRUD 操作的高阶组件

支持功能：

-   条件过滤
-   条件查询
-   关键字搜索
-   高级搜索
-   新增、编辑动态表单配置
-   自定义表单
-   可拖拽、全屏对话框
-   数据表格右键菜单
-   按钮级权限控制
-   多种渲染方式，jsx、函数式、组件实例、组件名

## 参数

| 参数       | 说明           | 类型                                     | 可选值 | 默认值 |
| ---------- | -------------- | ---------------------------------------- | ------ | ------ |
| on-refresh | 刷新表格的钩子 | function(params, { next, done, render }) |        |        |
| on-delete  | 删除时的钩子   | function(selection, { next })            |        |        |
| border     | 是否带有边框   | boolean                                  |        | false  |

`on-refresh` 示例

```html
<cl-crud :on-refresh="onRefresh"></cl-crud>
```

```js
export default {
	methods: {
		async onRefresh(params, { next, done, render }) {
			// params 是每次请求的参数
			// next(params) 是继续往下执行 page 的请求
			// done() 完成请求，关闭loading
			// render(list, pagination) 渲染列表及分页信息

			let { list, pagination } = await next({
				...params,
				...额外的参数
			});

			list.map((e) => {
				e.name += "先生";
			});

			render(list);

			// 也可以不使用 next，用其他 service 代替，但是 render 就要设置分页信息：
			render(list, {
				page: "第几页",
				size: "每页数量",
				total: "总数"
			});
		}
	}
};
```

`on-delete` 示例

```html
<cl-crud :on-delete="onDelete"></cl-crud>
```

```js
export default {
	methods: {
		onDelete(selection， {next}) {
			// selection 行选择列表，默认
			// next(params) 是继续往下执行 delete 的请求

			// 默认根据表id来删除，你也可以修改成其他
			next(selection.map(e => e.id))
		}
	}
};
```

## 方法

| 方法名         | 说明                               | 参数      |
| -------------- | ---------------------------------- | --------- |
| getPermission  | 获取 add, update, delele 的权限    | key       |
| getParams      | 获取 请求参数                      |           |
| rowAdd         | 以新增方式打开表单                 |           |
| rowAppend      | 以新增方式打开表单，并追加一些数据 | data      |
| rowEdit        | 以编辑方法打开表单                 | data      |
| rowClose       | 关闭表单                           |           |
| rowDelete      | 删除请求                           | selection |
| openAdvSearch  | 打开高级搜索                       |           |
| closeAdvSearch | 关闭高级搜索                       |           |
| refresh        | 刷新请求                           | params    |

## 事件

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| load   | 组件加载完事件 | { app, ctx } |

```html
<template>
	<cl-crud @load="onLoad"></cl-crud>
</template>

<script>
	export default {
		methods: {
			onLoad({ ctx, app }) {
				// 配置方法
				ctx
					// 配置请求，返回必须为 Promise。可直接继承 BaseService，它包含了基本的6个接口
					.service({
						// 分页列表
						page({ page, size, ... }) {
							return Promise.resolve({
								// 数据列表
								list: [],
								// 分页信息
								pagination: {
									total: 8,
									size: 20,
									page: 1
								}
							})
						},
						// 全部列表
						list() {
							return Promise.resolve([ /* 数据列表 */ ])
						},
						// 新增
						add(data) {
							return Promise.resolve()
						},
						// 更新，包含 id
						update(data) {
							return Promise.resolve()
						},
						// 详情，传行 id
						info({ id }) {
							return Promise.resolve({ /* 用户信息 */ })
						},
						// 删除，ids = [1, 2, 3]
						delete({ ids }) {
							return Promise.resolve()
						},
					})
					// 设置按钮权限，新增，编辑，删除。框架默认判断了。当然你也可以自定义
					.permission({
						add: true,
						update: true,
						delete: true
					})
					// 设置参数，例如 dict 字典
					.set('dict', {
						// 字典
						dict: {
							// 请求
							api: {
								list: 'list',   		// 全部数据
								add: 'add', 			// 新增
								update: 'update',   	// 修改
								delete: 'delete',   	// 删除
								info: 'info',   		// 详情
								page: 'page',   		// 分页
							},
							// 分页参数
							pagination: {
								page: 'page',   		// 页数
								size: 'size',   		// 每页显示的条目
							},
							// 搜索
							search: {
								keyWord: 'keyWord', 	// 模糊查询的关键字
								query: 'catecory', 		// 类目
							},
							// 排序
							sort: {
								order: 'sort',  		// 排序方式
								prop: 'order',  		// 排序关键字
							},
							// 标签
							label: {
								add: "新增",
								delete: "删除",
								multiDelete: "删除",
								update: "编辑",
								refresh: "刷新",
								advSearch: "高级搜索",
								saveButtonText: "保存",
								closeButtonText: "关闭"
							}
						},
					})
					// 完成配置，开始渲染
					.done()

				// 加载完组件是否发起 page 请求
				app.refresh({
					// 可以填入请求默认值
				})
			}
		}
	}
</script>
```

### ctx

| 方法名     | 说明                             | 参数                                            |
| ---------- | -------------------------------- | ----------------------------------------------- |
| service    | 设置请求服务                     | { page?, list?, update?, info?, add?, delete? } |
| permission | 设置权限，默认根据 permmenu 配置 | { add, update, delete }                         |
| set        | 设置其他参数                     | { dict, }                                       |
| on         | 监听事件                         | { name, callback }                              |
| once       | 监听事件（只监听一次）           | { name, callback }                              |
| done       | 完成配置，开始渲染               |                                                 |

### app

| 方法名  | 说明                         | 参数   |
| ------- | ---------------------------- | ------ |
| refresh | 刷新表格，默认调用 page 接口 | params |
