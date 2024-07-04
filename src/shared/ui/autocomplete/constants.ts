import { createEvent } from '@/shared/lib/createEvent.ts'

export const autocompleteEventBus = createEvent<string>()
