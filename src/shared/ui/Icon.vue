<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    spin?: boolean
  }>()

  const classNames = computed(() => ({
    icon: true,
    '--spin': props.spin,
  }))
</script>

<style>
  @keyframes spin {
    from {
      transform: rotateZ(-360deg);
    }
  }

  .icon,
  .icon svg {
    width: 16px;
    height: 16px;
  }

  .icon.--spin {
    animation: spin 1s infinite linear;
  }
</style>
