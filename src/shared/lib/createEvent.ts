type EventHandler<T> = (param: T) => void

export function createEvent<T>() {
  const listeners = new Set<EventHandler<T>>()

  return {
    on,
    emit,
  }

  function emit(param: T) {
    Array.from(listeners).forEach((listener) => listener(param))
  }

  function on(listener: EventHandler<T>) {
    listeners.add(listener)

    return {
      cancel: () => {
        listeners.delete(listener)
      },
    }
  }
}
