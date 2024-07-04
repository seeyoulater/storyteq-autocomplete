## Storyteq Frontend

### [Live demo](https://storyteq-autocomplete.vercel.app/)

---

    Stack: Vue 3 + TypeScript + Vite

### How to run:

1. `npm i`
2. `npm run dev`

### How to run unit tests:

1. `npm run vitest`

### Implementation details:

- The main architecture of the application is based on the implementation of the FSD (Feature Sliced Design)
  architecture. This is definitely an overhead for this specific application, but it’s a good starting point when
  developing a scalable modular application.
- In real applications, there could be millions of books, making it a poor idea to fetch the entire list. In this case,
  the current implementation is not the best option. It would be much better to implement autocomplete logic by
  leveraging dedicated API requests that return results for autocomplete. However, due to the requirements of the task
  regarding filtering logic, the best options for a real application are ignored.
- The application supports keyboard shortcuts to clear, navigate and select options.