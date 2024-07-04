<template>
  <Autocomplete
    placeholder="Books"
    v-model="query"
    :loading="dictionaryStore.isLoadingBooks"
    :options="options"
    @select="selectedBook = $event"
  >
    <template #icon>
      <Icon>
        <BookIcon />
      </Icon>
    </template>

    <template #item="{ label, description }">
      <Space :gap="2" column class="book">
        <span class="book__title">{{ label }}</span>
        <span class="book__author">{{ description }}</span>
      </Space>
    </template>
  </Autocomplete>
</template>

<script setup lang="ts">
  import BookIcon from '@/shared/ui/icons/BookIcon.vue'
  import Icon from '@/shared/ui/Icon.vue'
  import Autocomplete from '@/shared/ui/autocomplete/Autocomplete.vue'
  import Space from '@/shared/ui/Space.vue'
  import { useSearchStore } from '@/shared/store/searchStore.ts'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref } from 'vue'
  import { useDictionaryStore } from '@/shared/store/dictionaryStore.ts'
  import { booksToAutocompleteOptions } from '@/features/BookAutocomplete/domain.ts'

  const searchStore = useSearchStore()
  const dictionaryStore = useDictionaryStore()
  const { selectedBook } = storeToRefs(searchStore)
  const query = ref('')

  const options = computed(() => booksToAutocompleteOptions(dictionaryStore.books, query.value))

  onMounted(dictionaryStore.fetchBooks)
</script>

<style lang="scss" scoped>
  .book {
    &__title {
      font-weight: 500;
    }

    &__author {
      color: var(--secondary-text);
      font-size: 10px;
    }
  }
</style>
