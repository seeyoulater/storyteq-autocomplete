<template>
  <div :class="classNames" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const SpaceGap = [2, 4, 8, 12, 16, 32] as const

  type SpaceGapType = (typeof SpaceGap)[number]

  const props = defineProps<{
    column?: boolean
    grow?: boolean
    gap?: SpaceGapType
  }>()

  const classNames = computed(() => ({
    space: true,
    '--column': props.column,
    '--grow': props.grow,
  }))

  const styles = computed(() => ({
    '--space-gap': `${props.gap ?? 0}px`,
  }))
</script>

<style lang="scss" scoped>
  .space {
    display: flex;
    gap: var(--space-gap);

    &.--column {
      flex-direction: column;
    }

    &.--grow {
      flex-grow: 1;
    }
  }
</style>
