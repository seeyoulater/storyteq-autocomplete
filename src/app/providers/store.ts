import { createPinia } from 'pinia';

export const setupStore = () => {
  const store = createPinia();

  return store;
};