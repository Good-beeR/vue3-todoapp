<template lang="pug">
li.todoItem(:class="{'--done': todo.done, '--isEdit': editableId === todo.id }")
  Base-button(@buttonClick="onRemove" :title="'🗑️'")
  span.todoItem__title {{todo.title}}
  input.todoItem__input(ref="todoEdit" @keyup.enter="onCompleteEdit(todo.id)"
    @blur="onCompleteEdit(todo.id)"
    :value="todo.title")
  .todoItem__buttonOver
    Base-button(@buttonClick="editTodoId" :title="'✏️'")
    Base-button(v-if="!todo.done" @buttonClick="onDone" :title="'✅'")
    Base-button(v-else @buttonClick="onDone" :title="'❌'")
</template>

<script lang="ts">
  import './Todo.scss';
  import BaseButton from '@/components/BaseButton/BaseButton.vue';
  import {nextTick, ref, defineComponent, PropType} from 'vue';
  import {ITodoItem} from '@/types';

  export default defineComponent({
    name: 'Todo',
    components: {BaseButton},
    props: {
      todo: Object as PropType<ITodoItem>,
      editableId: String,
    },
    setup(props, {emit}) {
      // eslint-disable-next-line
      const todoEdit = ref<HTMLInputElement | any>(null);
      const onDone = () => {
        emit('on-done');
      }
      const onRemove = () => {
        emit('on-remove');
      }
      const editTodoId = () => {
        emit('edit-todo-id');
        nextTick(() => {
          todoEdit.value.focus();
        })
      }
      const onCompleteEdit = (id: string): void => {
        if (todoEdit.value.value !== '') {
          emit('on-complete-edit', todoEdit.value.value, id);
        } else {
          emit('on-complete-edit', props?.todo?.title, id);
          alert('Error, Edit name is empty')
        }
      }

      return {
        todoEdit,
        onDone,
        onRemove,
        editTodoId,
        onCompleteEdit
      }
    }
  });
</script>
