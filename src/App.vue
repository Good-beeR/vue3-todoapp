<template lang="pug">
.app-over
  TodoApp
</template>

<script lang="ts">
  import '@/main.scss';
  import {defineComponent} from 'vue';
  import TodoApp from '@/containers/TodoApp/TodoApp.vue';

  export default defineComponent({
    name: 'App',
    components: {TodoApp},
  });
</script>