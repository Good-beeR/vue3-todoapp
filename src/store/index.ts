import {reactive, provide, inject} from 'vue';
import {ITodoItem} from '@/types';

export class State {
  public todoList: Array<ITodoItem> = ([{id: '0', title: 'create vue3 toto app', done: true}]);
  public editableId = '';

  addTodo(title: string) {
    this.todoList = [...this.todoList, {
      id: Math.random().toString(20).slice(3),
      title: title,
      done: false
    }];
  }

  removeTodo(id: string) {
    this.todoList = this.todoList.filter((todo: ITodoItem) => todo.id !== id);
  }

  doneTodo(id: string) {
    this.todoList.map((todo: ITodoItem) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
  }

  completeEdit(title: string, id: string) {
    this.todoList.map((todo: ITodoItem) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    this.editTodoId('none');
  }

  editTodoId(id: string) {
    this.editableId = id;
  }
}

export const stateSymbol = Symbol('state')
export const createState = () => {
  return reactive(new State());
}

export const useState = () => inject(stateSymbol) as State;
export const provideState = () => provide(
  stateSymbol,
  createState()
);