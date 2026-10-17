<script setup>
import LibraryComponent from '../components/LibraryComponent.vue'
import SearchBarComponent from '../components/SearchBarComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue'
</script>

<template>
	<h1>This is the Home View</h1>
	<SearchBarComponent />
	<LibraryComponent />
	<NavBarComponent />
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
