<template>
  <div class="left-side-bar-container overflow-y-scroll">
    <div class="item"></div>
    <div v-for="(item, i) in categoriesLocal" :key="i">
      <CategoryTreeItem
        :categoryName="item.categoryName"
        :index="i"
        :item="item"
        :depth="depth"
        @saveSubCategory="onSaveSubCategory"
      />
    </div>
    <div class="add-category-container" @click="addCategory">
      <img src="/icons/plus-icon.png" />
      <span>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { CategoryTreeItem } from "@/widgets/category-tree/ui/components";
import { useCategoryStore } from "@/entities/category";

let depth = ref(0);
const addCategory = () => {
  deletePropertyFromMultidimensionalArray(categoriesLocal.value, "active");
  categoryStore.setAddCategory({
    categoryName: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
    childMarketplaceCategoryIdList: [],
    active: true,
    icon: null,
    id: null,
    sequenceNumber: 0,
  });
  categoryStore.setTranslation(null, "ru");
  categoryStore.setTranslation(null, "ky");
  categoryStore.setTranslation(null, "en");
  categoryStore.setIcoBase64(null);
  categoryStore.setImageId(null);
  categoryStore.setFile(null);
  categoryStore.setCategoryId(null);
  categoryStore.setPropertiesArray([]);
  categoryStore.setMode("create");
};

const categoryStore = useCategoryStore();

categoryStore.fetchCategoriesTree();

const categoriesLocal = computed(() => categoryStore.getCategories);

function deletePropertyFromMultidimensionalArray(
  array: any,
  propertyToDelete: any
) {
  array.forEach((obj: any) => {
    // Delete the property from the current object
    delete obj[propertyToDelete];

    // If the current object has childMarketplaceCategoryIdList property and it's an array,
    // recursively call the function to process its elements
    if (
      obj.childMarketplaceCategoryIdList &&
      Array.isArray(obj.childMarketplaceCategoryIdList)
    ) {
      deletePropertyFromMultidimensionalArray(
        obj.childMarketplaceCategoryIdList,
        propertyToDelete
      );
    }
  });
}

const onSaveSubCategory = () => {
  categoryStore.setCategories(categoriesLocal.value);
};
</script>

<style lang="scss" scoped>
.left-side-bar-container {
  width: auto;
  height: 86vh;
}
.empty-category-container,
.add-category-container {
  width: auto;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 17px;
  background-color: transparent;
  gap: 7.5px;
  border-radius: 12px;
  &:hover {
    background-color: #f5f3ff;
  }
}
.add-category-container {
  gap: 14px;
}
// .add-category-container {
//   width: auto;
//   cursor: pointer;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 14px 17px;
// }
</style>
