<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="grid-icon"
    :class="[props.size, props.color]"
  >
    <path
      d="M21 7.52V2.98C21 1.57 20.36 1 18.77 1H14.73C13.14 1 12.5 1.57 12.5 2.98V7.51C12.5 8.93 13.14 9.49 14.73 9.49H18.77C20.36 9.5 21 8.93 21 7.52Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 18.77V14.73C21 13.14 20.36 12.5 18.77 12.5H14.73C13.14 12.5 12.5 13.14 12.5 14.73V18.77C12.5 20.36 13.14 21 14.73 21H18.77C20.36 21 21 20.36 21 18.77Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.5 7.52V2.98C9.5 1.57 8.86 1 7.27 1H3.23C1.64 1 1 1.57 1 2.98V7.51C1 8.93 1.64 9.49 3.23 9.49H7.27C8.86 9.5 9.5 8.93 9.5 7.52Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.5 18.77V14.73C9.5 13.14 8.86 12.5 7.27 12.5H3.23C1.64 12.5 1 13.14 1 14.73V18.77C1 20.36 1.64 21 3.23 21H7.27C8.86 21 9.5 20.36 9.5 18.77Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
@import "../../../../../node_modules/ogogo-uikit/src/assets/colors.scss";

// .grid-icon {
// }

.grid-icon {
  &.medium {
    width: 20px;
    height: 20px;
  }
  &.small {
    width: 12px;
    height: 12px;
  }
  &.violet-700 {
    path {
      stroke: $violet-700;
    }
  }
  &.gray-400 {
    path {
      stroke: $gray-400;
    }
  }
  &.top {
    transform: rotate(270deg);
  }
  &.right {
    transform: rotate(0);
  }
  &.bottom {
    transform: rotate(90deg);
  }
  &.left {
    transform: rotate(180deg);
  }
}
</style>
