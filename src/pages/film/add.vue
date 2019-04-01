<template>
	<div id="add_film">
		<AddEdit type="add"></AddEdit>
	</div>
</template>
<script>
// api
import AddEdit from "./component/add_edit"; // 图片裁剪
export default {
	name: "add_film",
	components: { AddEdit }
};
</script>
