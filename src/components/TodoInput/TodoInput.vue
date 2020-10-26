<template lang="pug">
.todoInput
  input.todoInput__input(@keyup.enter="onAddTodo" placeholder="Todo name" v-model="title")
  BaseButton(@buttonClick="onAddTodo" :title="'Add'")
</template>

<script lang="ts">
  import '@/components/TodoInput/TodoInput.scss';
  import BaseButton from '@/components/BaseButton/BaseButton.vue';
  import {ref, defineComponent} from 'vue';

  export default defineComponent({
    name: 'TodoInput',
    components: {BaseButton},
    setup(props, {emit}) {
      const title = ref<string>('');

      const onAddTodo = (): void => {
        if (title.value.trim() !== '') {
          emit('on-add-todo', title.value);
          title.value = '';
        } else {
          alert('Error, Todo empty name');
        }
      }

      return {
        title,
        onAddTodo
      }
    }
  });
</script>
