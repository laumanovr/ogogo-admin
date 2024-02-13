<template>
  <div class="property-container">
    <h2 class="head-title">Свойства</h2>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
// @import "../app/style/colors.scss";

.property-container {
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .filter-actions {
      display: flex;
      align-items: center;
    }

    .icon-border {
      border: 1px solid;
      border-radius: 8px;
      padding: 10px 11px 8px;
      margin: 0 12px;
    }

    .search-input {
    }
  }

  .empty-container {
    margin-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;

    .button {
      margin: 0 auto;
    }

    p {
      margin: 24px 0;
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
