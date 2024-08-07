<template>
  <div class="filter-search">
    <SInput
      isSearchable
      hide-details
      @input="onSearch"
      :width="props.showFilter ? '90%' : '100%'"
    />
    <div>
      <SButton
        type="secondary"
        variant="outlined"
        @click="onClick"
        v-if="props.showFilter"
      >
        <SIconRender name="filter" class="s-text-gray-700" />
        {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
      </SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton, SIconRender } from "@tumarsoft/ogogo-ui";

const props = defineProps({
  showFilter: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["onClick", "onSearch"]);

const onClick = () => {
  emit("onClick");
};

const onSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("onSearch", target.value);
};
</script>

<style scoped lang="scss">
.filter-search {
  display: flex;
  margin-bottom: 20px;

  .button {
    margin-left: 12px;
  }

  .input-container {
    width: 90%;
  }
}
</style>
