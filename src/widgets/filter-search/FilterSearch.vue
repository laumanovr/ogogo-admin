<template>
  <div class="filter-search">
    <SInput isSearchable width="90%" />
    <SButton color="white" @click="onClick">
      <SIconRender name="SettingsIcon" />
      {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
    </SButton>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton, SIconRender } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
};
</script>

<style scoped lang="scss">
.filter-search {
  display: flex;
  margin-bottom: 25px;

  .button {
    margin-left: 12px;
  }

  .input-container {
    width: 90%;
  }
}
</style>
