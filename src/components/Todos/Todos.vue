<template lang="pug">
li.todoItem(:class="{'--done': model.done, '--isEdit': editId === model.id }")
  Base-button(@buttonClick="onRemove" :title="'🗑️'")
  span.todoItem__title {{model.title}}
  input.todoItem__input(ref="todoEdit" @keyup.enter="onCompleteEdit(model.id)"
    @blur="onCompleteEdit(model.id)"
    :value="model.title")
  .todoItem__buttonOver
    Base-button(@buttonClick="editTodoId" :title="'✏️'")
    Base-button(v-if="!model.done" @buttonClick="onDone" :title="'✅'")
    Base-button(v-else @buttonClick="onDone" :title="'❌'")
</template>

<script lang="ts">
  import './Todos.scss'
  import BaseButton from "@/components/BaseButton/BaseButton.vue";
  import {nextTick, ref, defineComponent} from "vue";

  export default defineComponent({
    name: "Todos",
    components: {BaseButton},
    props: {
      model: {
        required: true,
        default: {
          id: 0,
          title: 'create app',
          done: false
        }
      },
      editId: String,
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
          emit('on-complete-edit', props.model.title, id);
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
