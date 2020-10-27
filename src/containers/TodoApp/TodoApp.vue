<template lang="pug">
TodoInput(@onAddTodo="addTodo")
transition-group(name="todoApp" class="todoApp" tag="ul")
  Todo(v-for="todo in state.todoList"
    @onRemove="removeTodo(todo.id)" @onDone="doneTodo(todo.id)" @editTodoId="editTodoId(todo.id)"
    @onCompleteEdit="completeEdit"
    :key="todo.id"
    :todo="todo"
    :editableId="state.editableId")
  .todoItem(v-if="state.todoList.length === 0") No more tasks, you can rest :)
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import '@/containers/TodoApp/TodoApp.scss';
  import TodoInput from '@/components/TodoInput/TodoInput.vue';
  import Todo from '@/components/Todos/Todo.vue';
  import {useState} from '@/store';

  export default defineComponent({
    name: 'TodoApp',
    components: {TodoInput, Todo},

    setup() {
      const state = useState();

      const addTodo = (title: string): void => {
        state.addTodo(title);
      }

      const removeTodo = (id: string): void => {
        state.removeTodo(id);
      }

      const doneTodo = (id: string): void => {
        state.doneTodo(id);
      }

      const completeEdit = (title: string, id: string): void => {
        state.completeEdit(title, id);
      }

      const editTodoId = (id: string): void => {
        state.editTodoId(id);
      }

      return {
        state,
        removeTodo,
        doneTodo,
        addTodo,
        editTodoId,
        completeEdit
      }
    }
  });
</script>