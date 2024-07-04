<template>
  <Autocomplete
    autofocus
    placeholder="City"
    v-model="query"
    :loading="dictionaryStore.isLoadingCities"
    :options="options"
    @select="selectedCity = $event"
  >
    <template #icon>
      <Icon>
        <LocationIcon />
      </Icon>
    </template>

    <template #item="{ label }">{{ label }}</template>
  </Autocomplete>
</template>

<script setup lang="ts">
  import Icon from '@/shared/ui/Icon.vue'
  import Autocomplete from '@/shared/ui/autocomplete/Autocomplete.vue'
  import LocationIcon from '@/shared/ui/icons/LocationIcon.vue'
  import { useSearchStore } from '@/shared/store/searchStore.ts'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref } from 'vue'
  import { useDictionaryStore } from '@/shared/store/dictionaryStore.ts'
  import { citiesToAutocompleteOptions } from '@/features/CItyAutocomplete/domain.ts'

  const searchStore = useSearchStore()
  const dictionaryStore = useDictionaryStore()
  const { selectedCity } = storeToRefs(searchStore)
  const query = ref('')

  const options = computed(() => citiesToAutocompleteOptions(dictionaryStore.cities, query.value))

  onMounted(dictionaryStore.fetchCities)
</script>
