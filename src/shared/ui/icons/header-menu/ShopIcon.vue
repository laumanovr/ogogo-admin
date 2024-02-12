<template>
  <svg
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="shop-icon"
    :class="[props.size, props.color]"
  >
    <path
      d="M1.50977 10.22V14.71C1.50977 19.2 3.30977 21 7.79977 21H13.1898C17.6798 21 19.4798 19.2 19.4798 14.71V10.22"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 11C12.33 11 13.68 9.51 13.5 7.68L12.84 1H8.16999L7.49999 7.68C7.31999 9.51 8.66999 11 10.5 11Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.8098 11C18.8298 11 20.3098 9.36 20.1098 7.35L19.8298 4.6C19.4698 2 18.4698 1 15.8498 1H12.7998L13.4998 8.01C13.6698 9.66 15.1598 11 16.8098 11Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.13988 11C5.78988 11 7.27988 9.66 7.43988 8.01L7.65988 5.8L8.13988 1H5.08988C2.46988 1 1.46988 2 1.10988 4.6L0.839883 7.35C0.639882 9.36 2.11988 11 4.13988 11Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 16C8.83 16 8 16.83 8 18.5V21H13V18.5C13 16.83 12.17 16 10.5 16Z"
      stroke="#A5ABB8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
// import { computed } from "vue";
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

.shop-icon {
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
