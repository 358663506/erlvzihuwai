<template>
	<div v-if="form.inject">
		{{ form.inject.list }}
		<el-button @click="change">click</el-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
	name: "test3",

	setup() {
		const value = ref<string>("Value：" + Math.random());

		const form = inject<any>("form");

		function change() {
			form.inject.list = ["1", "2"];
		}

		return {
			value,
			form,
			change
		};
	}
});
</script>
