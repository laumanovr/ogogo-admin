<template>
  <div class="light">
    <SButton type="secondary" class="add-button" @click="onOpenModal">
      <img src="/icons/plus-icon.png" />
      <p>{{ $t("lang-1d55fd08-eaa6-4b4b-84b9-225f2d0dc1ad") }}</p></SButton
    >
  </div>
  <PropertyCardList
    v-for="(propertyItem, i) in categoryStore.getProperties"
    :key="i"
    :property="propertyItem"
  />
  <AddPropertyModal ref="propertyModal" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SButton } from "@tumarsoft/ogogo-ui";
import { AddPropertyModal } from "@/features/category/add-property";
import { useCategoryStore } from "@/entities/category";
import { PropertyCardList } from "@/widgets/category-settings/ui/components";

const categoryStore = useCategoryStore();
const propertyModal = ref(null);

const onOpenModal = () => {
  propertyModal.value.togglePropertyModal();
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
