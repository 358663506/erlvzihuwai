<template>
	<div class="demo-adv-search">
		<cl-adv-btn />
		<cl-adv-search ref="searchRef" :items="items" :op-list="opList">
			<template #slot-custom>
				<el-button size="small" @click="test">Test</el-button>
			</template>

			<template #slot-input="{ scope }">
				<el-input v-model="scope.a" />
			</template>
		</cl-adv-search>
	</div>
</template>

<script lang="ts">
import { AdvSearchItem } from "@/types";
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const searchRef = ref<any>();

		const items = ref<AdvSearchItem[]>([
			{
				label: "昵称",
				prop: "name",
				component: {
					name: "el-input",
					attrs: {
						placeholder: "搜索昵称"
					}
				}
			},
			{
				label: "状态",
				prop: "status",
				component: {
					name: "el-radio-group",
					options: [
						{
							label: "启用",
							value: 1
						},
						{
							label: "禁用",
							value: 0
						}
					]
				}
			},
			{
				label: "插槽",
				prop: "a",
				value: 11,
				component: {
					name: "slot-input"
				}
			}
		]);

		const opList = ref<string[]>(["search", "reset", "clear", "close", "slot-custom"]);

		function test() {
			searchRef.value.hiddenItem("name");
		}

		return {
			items,
			opList,
			searchRef,
			test
		};
	}
});
</script>

<style lang="scss" scoped></style>
