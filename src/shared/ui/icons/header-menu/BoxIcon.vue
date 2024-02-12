<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="box-icon"
    :class="[props.size, props.color]"
  >
    <path
      d="M3.16992 7.44L11.9999 12.55L20.7699 7.47"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 21.61V12.54"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.93014 2.48L4.59014 5.44C3.38014 6.11 2.39014 7.79 2.39014 9.17V14.82C2.39014 16.2 3.38014 17.88 4.59014 18.55L9.93014 21.52C11.0701 22.15 12.9401 22.15 14.0801 21.52L19.4201 18.55C20.6301 17.88 21.6201 16.2 21.6201 14.82V9.17C21.6201 7.79 20.6301 6.11 19.4201 5.44L14.0801 2.47C12.9301 1.84 11.0701 1.84 9.93014 2.48Z"
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

.box-icon {
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
