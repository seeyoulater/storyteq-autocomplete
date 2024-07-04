<template>
  <div class="autocomplete" ref="dropdownRef">
    <div v-if="$slots.icon" class="autocomplete__icon">
      <slot name="icon" />
    </div>

    <Input
      :modelValue="modelValue"
      :class="{ autocomplete__input: true, '--with-icon': $slots.icon }"
      :placeholder="placeholder"
      :autofocus="autofocus"
      @keydown="onKeyDown"
      @focus="onFocus"
      @click="onFocus"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <Icon v-if="loading" spin class="action --load">
      <SpinIcon />
    </Icon>

    <button v-else-if="modelValue.length" class="action --close" @click="clear">
      <CloseIcon />
    </button>

    <div class="autocomplete__overlay" v-if="isDropdownOpen" @click.stop>
      <div v-if="modelValue.length < 3" class="empty">Please type at least 3 characters</div>
      <div v-else-if="options.length === 0" class="empty">No results found</div>
      <template v-else>
        <div
          v-for="(result, index) in options"
          :key="result.label"
          :class="{ option: true, '--active': activeIndex === index }"
          @click="selectOptionByIndex(index)"
        >
          <slot name="item" v-bind="result">
            {{ result }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useClickOutside } from '@/shared/hooks/useClickOutside.ts'
  import Input from '@/shared/ui/Input.vue'
  import { autocompleteEventBus } from '@/shared/ui/autocomplete/constants.ts'
  import { useId } from '@/shared/hooks/useId.ts'
  import CloseIcon from '@/shared/ui/icons/CloseIcon.vue'
  import { KeyCode } from '@/shared/lib/keycode.ts'
  import { useKeyboard } from '@/shared/hooks/useKeyboard.ts'
  import SpinIcon from '@/shared/ui/icons/SpinIcon.vue'
  import Icon from '@/shared/ui/Icon.vue'
  import { SearchResult } from '@/shared/ui/autocomplete/types.ts'

  const props = defineProps<{
    modelValue: string
    placeholder?: string
    autofocus?: boolean
    loading?: boolean
    options: SearchResult[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', query: string): void
    (e: 'select', value: SearchResult | null): void
  }>()

  defineSlots<{
    item: (scope: SearchResult) => void
    icon: () => void
  }>()

  const activeIndex = ref(0)
  const { guid } = useId()

  const dropdownRef = ref(null)
  const isDropdownOpen = ref(false)

  const openDropdown = () => {
    isDropdownOpen.value = true
  }

  const closeDropdown = () => {
    isDropdownOpen.value = false
  }

  const onEventBusFocus = (referenceId: string) => {
    if (referenceId === guid.value) {
      return
    }

    closeDropdown()
  }

  const attachEventBus = () => {
    const { cancel } = autocompleteEventBus.on(onEventBusFocus)

    onBeforeUnmount(cancel)
  }

  const onFocus = () => {
    openDropdown()
    autocompleteEventBus.emit(guid.value)
  }

  const clear = () => {
    emit('update:modelValue', '')
    emit('select', null)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === KeyCode.Escape) {
      clear()
    }
  }

  watch(
    () => props.modelValue,
    () => {
      if (!isDropdownOpen.value) {
        onFocus()
      }

      setHighlighted(0)
    },
  )

  const setHighlighted = (index: number) => {
    activeIndex.value = index
  }

  const selectOptionByIndex = (index: number) => {
    const option = props.options[index]

    emit('update:modelValue', option?.label ?? props.modelValue)
    emit('select', option)
    nextTick(closeDropdown)
  }

  useKeyboard(KeyCode.ArrowDown, () => {
    if (!isDropdownOpen.value) {
      return
    }

    const nextIndex = activeIndex.value + 1

    if (nextIndex < props.options.length) {
      setHighlighted(nextIndex)
    } else {
      setHighlighted(0)
    }
  })

  useKeyboard(KeyCode.ArrowUp, () => {
    if (!isDropdownOpen.value) {
      return
    }

    const nextIndex = activeIndex.value - 1

    if (nextIndex >= 0) {
      setHighlighted(nextIndex)
    } else {
      setHighlighted(props.options.length - 1)
    }
  })

  useKeyboard(KeyCode.Enter, () => {
    if (!isDropdownOpen.value) {
      return
    }

    selectOptionByIndex(activeIndex.value)
  })

  useClickOutside(dropdownRef, closeDropdown)
  onMounted(attachEventBus)
</script>

<style lang="scss" scoped>
  .autocomplete {
    --option-highligh-background: #f5f8fb;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;

    @keyframes fadein {
      from {
        opacity: 0;
      }
    }

    &__input {
      &.--with-icon {
        padding-left: 32px;
      }
    }

    &__overlay {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: #fff;
      box-shadow: -1px 4px 8px 0px rgba(34, 60, 80, 0.2);
      border-radius: 4px;
      animation: fadein 160ms linear forwards;
      overflow: auto;
      max-height: 420px;
    }

    &__icon {
      pointer-events: none;
      color: #333;
      position: absolute;
      left: 12px;
    }
  }

  .action {
    &.--close,
    &.--load {
      position: absolute;
      color: #ccc;
    }

    &.--spin {
      right: 8px;
    }

    &.--close {
      right: 4px;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      transition: all 160ms linear;
      will-change: transform, opacity;
      outline: none;
      transform: scale(0.8);

      &:hover,
      &:focus {
        color: #333;
        transform: scale(1);
      }
    }
  }

  .option,
  .empty {
    padding: 10px 12px;
  }

  .option:hover,
  .option.--active {
    background: var(--option-highligh-background);
    cursor: pointer;
  }

  .empty {
    color: var(--secondary-text);
    font-weight: 100;
  }
</style>
