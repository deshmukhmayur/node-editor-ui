import { createMachine, assign, spawn, actions } from "xstate";
import uuid from "uuid-v4";
import { createTodoMachine } from "./todoMachine";

function createTodo(title) {
  return {
    id: uuid(),
    title,
    completed: false
  };
}

export const todosMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwMQDkCiA6gCoDyAIiQHQDCAEgII4DieA2gAwC6ioADpgEtkA1ADseIAB6IAjAGZ2lABwBOJQBY5AdgCsAGhABPRFtWV1G7ToC+1g2gzZ8xclWokAsh4CSRDtyQQflghEXFA6QQVdUp2HXUANiVdA2MEBIStWNMZACYbOxAHTCxSChpPHz8uCWDQsQlImQtKFVyVJJSjRHiYzJlkgvt0ErKqMjwAGTwiNhrAuuEGiNkdXMoE-NTEdVz13ISdTaGikewAZVoSAn9awSXw0CalRVy5TS60uQPKOTyT4rYDz0ABKAGlKABjVAAW14ABswMhILcFvcwo1ZOoZOZLJ9EG9FHIdCorLZho4sMDwZQAIaQ4QANzAqL46OWT1WSkoMnYMiOW26CHkMXU7GO5NOlOo01BAH13B4AArTWZkVlBdmPKSydrKfHC3KSwGUeGoWkQASiKBYDWLDErBC5OKtTr6IVqUVkyWidBwCSAu4hB6YhAAWhk2wQyXWHwBZ1N5st1qD9W1kXUWijKhJrW9FMwlAATmALWk2cGHZyEAoceLBWk1HJzN7bEA */
createMachine({
  id: "todos",
  preserveActionOrder: true,
  context: {
    todo: "", // new todo
    todos: [],
    filter: "all"
  },
  initial: "loading",
  states: {
    loading: {
      entry: assign({
        todos: (context) => {
          console.log(context);
          // "Rehydrate" persisted todos
          return context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo))
          }));
        }
      }),
      always: "ready"
    },
    ready: {}
  },
  on: {
    "NEWTODO.CHANGE": {
      actions: assign({
        todo: (_, event) => event.value
      })
    },
    "NEWTODO.COMMIT": {
      actions: [
        assign({
          todo: "", // clear todo
          todos: (context, event) => {
            const newTodo = createTodo(event.value.trim());
            return context.todos.concat({
              ...newTodo,
              ref: spawn(createTodoMachine(newTodo))
            });
          }
        }),
        "persist"
      ],
      cond: (_, event) => event.value.trim().length
    },
    "TODO.COMMIT": {
      actions: [
        assign({
          todos: (context, event) =>
            context.todos.map((todo) => {
              return todo.id === event.todo.id
                ? { ...todo, ...event.todo, ref: todo.ref }
                : todo;
            })
        }),
        "persist"
      ]
    },
    "TODO.DELETE": {
      actions: [
        assign({
          todos: (context, event) =>
            context.todos.filter((todo) => todo.id !== event.id)
        }),
        "persist"
      ]
    },
    SHOW: {
      actions: assign({
        filter: (_, event) => event.filter
      })
    },
    "MARK.completed": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_COMPLETED"));
      }
    },
    "MARK.active": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_ACTIVE"));
      }
    },
    CLEAR_COMPLETED: {
      actions: [
        actions.pure((context) => {
          return context.todos
            .filter((todo) => todo.completed)
            .map((todo) => actions.stop(todo.ref));
        }),
        assign({
          todos: (context) => {
            return context.todos.filter((todo) => !todo.completed);
          }
        })
      ]
    }
  }
});
