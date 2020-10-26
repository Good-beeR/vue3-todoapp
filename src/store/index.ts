import {reactive, provide, inject} from 'vue';
import {ITodoItem} from "@/types";

export class State {
  public todoList: Array<ITodoItem> = ([{id: '0', title: 'create vue3 toto app', done: true}]);
  public editId = '';

  addTodo(title: string) {
    this.todoList = [...this.todoList, {
      id: Math.random().toString(20).slice(3),
      title: title,
      done: false
    }];
  }

  removeTodo(id: string) {
    this.todoList = this.todoList.filter((ell: ITodoItem) => ell.id !== id);
  }

  doneTodo(id: string) {
    this.todoList.map((ell: ITodoItem) => {
      if (ell.id === id) {
        ell.done = !ell.done;
      }
      return ell;
    });
  }

  completeEdit(title: string, id: string) {
    this.todoList.map((ell: ITodoItem) => {
      if (ell.id === id) {
        ell.title = title;
      }
      return ell;
    });
    this.editTodoId('none');
  }

  editTodoId(id: string) {
    this.editId = id;
  }
}

export const stateSymbol = Symbol('state')
export const createState = () => {
  return reactive(new State());
}

export const useState = () => inject(stateSymbol) as State
export const provideState = () => provide(
  stateSymbol,
  createState()
)