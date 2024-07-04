<template>
  <input class="input" :value="modelValue" @input="onInput" />
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'

  defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
</script>

<style scoped>
  .input {
    --input-border-color: #bbccd4;

    height: 36px;
    border: 1px solid var(--input-border-color);
    border-radius: 4px;
    padding: 0 12px;
    outline: none;

    &:focus {
      color: var(--primary-text);
      transition: color 160ms linear;
    }

    &:focus::placeholder {
      color: var(--secondary-text);
    }
  }
</style>
