<template>
  <div class="property-value-container">
    <SLoader v-if="isLoading" />
    <div class="title-container">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" class="s-text-gray-500" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="s-text-h-2 s-mb-6 s-mt-6 s-ml-6">
        {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }} /
        {{ selectedProperty?.name }}
      </div>
    </div>
    <div class="actions">
      <SInput isSearchable hide-details @input="onSearch" />
      <SButton @click="onSave">
        {{ $t("lang-e11e13e8-1d9c-438a-8be1-27ce3792dbaf") }}
      </SButton>
    </div>
    <PropertyValueTable ref="propertyValueTable" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { SButton, SIconRender, SInput, SLoader } from "@tumarsoft/ogogo-ui";
import { PropertyValueTable } from "@/widgets/property-value-table";
import { usePropertyValueStore } from "@/entities/property-value";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const propertyValueStore = usePropertyValueStore();
const propertyValueTable = ref(null);
const searchTimer = ref<number>(null);
const isLoading = ref(false);
const selectedProperty = computed(() => propertyValueStore.getSelectedProperty);

onMounted(() => {
  isLoading.value = true;
  propertyValueStore
    .fetchPropertyById(route.params.id as string)
    .finally(() => {
      isLoading.value = false;
    });
});

const goBack = () => {
  router.push({ name: "property" });
};

const onSave = () => {
  propertyValueTable.value.submitPropertyValues();
};

const onSearch = (e: Event) => {
  window.clearTimeout(searchTimer.value);
  const target = e.target as HTMLInputElement;
  searchTimer.value = window.setTimeout(() => {
    propertyValueTable.value.searchPropertyValue(target.value);
  }, 1500);
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
