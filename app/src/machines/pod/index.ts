import { createMachine, assign } from "xstate";

interface Todo {
    id: number;
    done: boolean;
    text: string;
  }
  
  const todoMachine = createMachine<
    {
      todos: Todo[];
    },
    | { type: "END_WORKING" }
    | { type: "START_WORKING" }
    | { type: "SET_TODOS"; todos: Todo[] }
    | { type: "ADD_TODO"; text: string }
    | { type: "REMOVE_TODO"; id: number }
  >(
    {
      id: "todoMachine",
      initial: "editing",
      context: {
        todos: [],
      },
      states: {
        editing: {
          on: {
            START_WORKING: {
              target: "working",
              cond: "haveUndoneTodos",
            },
            ADD_TODO: {
                invoke: {
                    id: 'test',
                    src: () => console.log();
                }
            },
            REMOVE_TODO: {
              actions: assign({
                todos: ({ todos }, { id: removeId }) =>
                  todos.filter(({ id }) => id !== removeId),
              }),
            },
            SET_TODOS: {
              actions: assign({
                todos: (_, { todos }) => todos,
              }),
            },
          },
        },
        working: {
          exit: assign({
            todos: ({ todos }) => {
              const newTodos = [...todos];
              const undoneTodo = newTodos.find(({ done }) => !done);
              if (undoneTodo) {
                undoneTodo.done = true;
              }
              return newTodos;
            },
          }),
          on: {
            END_WORKING: {
              target: "editing",
            },
          },
        },
      },
    },
    {
      guards: {
        haveUndoneTodos: ({ todos }) => todos.some(({ done }) => !done),
      },
    }
  );