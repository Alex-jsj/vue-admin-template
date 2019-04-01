<template>
	<div id="edit_film">
		<AddEdit type="edit"></AddEdit>
	</div>
</template>
<script>
// api
import AddEdit from "./component/add_edit"; // 图片裁剪
export default {
	name: "edit_film",
	components: { AddEdit }
};
</script>
