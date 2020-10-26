<template lang="pug">
TodoInput(@onAddTodo="addTodo")
transition-group(name="todoApp" class="todoApp" tag="ul")
  Todos(v-for="item in state.todoList"
    @onRemove="removeTodo(item.id)" @onDone="doneTodo(item.id)" @editTodoId="editTodoId(item.id)"
    @onCompleteEdit="completeEdit"
    :key="item.id"
    :model="item"
    :editId="state.editId")
  .todoItem(v-if="state.todoList.length === 0") No more tasks, you can rest :)
</template>

<script lang="ts">
  import '@/containers/TodoApp/TodoApp.scss'
  import {defineComponent} from "vue";
  import TodoInput from "@/components/TodoInput/TodoInput.vue";
  import Todos from "@/components/Todos/Todos.vue";
  import {useState} from "@/store";

  export default defineComponent({
    name: "TodoApp",
    components: {TodoInput, Todos},

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