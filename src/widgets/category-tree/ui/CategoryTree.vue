<template>
  <div class="left-side-bar-container">
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
    <SButton
      class="s-w-full s-mt-3"
      type="secondary"
      variant="outlined"
      @click="addCategory"
    >
      <img src="/icons/plus-icon.png" />
      <span class="s-ml-2">
        {{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}
      </span>
    </SButton>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
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
    delete obj[propertyToDelete];
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
</style>
