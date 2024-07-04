<script setup lang="ts">
  import Space from '@/shared/ui/Space.vue'
  import { useSearchStore } from '@/shared/store/searchStore.ts'
  import CityAutocomplete from '@/features/CItyAutocomplete/CityAutocomplete.vue'
  import BookAutocomplete from '@/features/BookAutocomplete/BookAutocomplete.vue'
  import { storeToRefs } from 'pinia'

  const searchStore = useSearchStore()
  const { selectedCity, selectedBook } = storeToRefs(searchStore)
</script>

<template>
  <div class="layout">
    <Space :gap="16">
      <CityAutocomplete />
      <BookAutocomplete />
    </Space>

    <Space column :gap="4">
      <div><strong>City:</strong> {{ selectedCity ?? 'not selected' }}</div>
      <div><strong>Book:</strong> {{ selectedBook ?? 'not selected' }}</div>
    </Space>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    flex-grow: 1;
    width: min(100%, 1024px);
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    gap: 32px;
  }
</style>
