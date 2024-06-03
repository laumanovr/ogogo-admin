<template>
  <SButton color="gray" class="add-button" @click="onOpenModal">
    <img src="/icons/plus-icon.png" />
    <p>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</p></SButton
  >
  <PropertyCardList
    v-for="(propertyItem, i) in categoryStore.getProperties"
    :key="i"
    :property="propertyItem"
  />
  <AddPropertyModal :value="modalValue" @close="onClose" />
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
import { AddPropertyModal } from "@/features/category/add-property";
import { ref } from "vue";

import { useCategoryStore } from "@/entities/category";
import { PropertyCardList } from "@/widgets/category-settings/ui/components";
let modalValue = ref(false);

const categoryStore = useCategoryStore();

// const getPopertyName = computed(() => {
//   categorySharedStore.getProperties;
// });

const onOpenModal = () => {
  modalValue.value = true;
};

const onClose = () => {
  modalValue.value = false;
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
