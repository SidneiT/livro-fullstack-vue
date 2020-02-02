<template>
	<div>
		<h2 class="has-text-weight-bold">
			<router-link :to="{name:'products', params:{id:productItem.id}}">{{ productItem.title}}</router-link>
		</h2>
		<span
			@click="addCartItem(productItem)"
			class="tag is-primary is-pulled-right has-text-white"
		>Add to Cart</span>
		<p>{{ productItem.description }}</p>
		<span class="has-text-primary has-text-weight-bold">
			<i class="fa fa-usd"></i>
			{{ productItem.price }}
		</span>
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	export default {
		name: "ProductListItem",
		props: ["productItem"],
		methods: {
			...mapActions(["addCartItem"])
		}
	};
</script>

<style scoped>
	.tag {
		cursor: pointer;
	}
</style>
