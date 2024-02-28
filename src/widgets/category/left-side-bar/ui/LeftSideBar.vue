<template>
  <div class="left-side-bar-container">
    <div class="item"></div>
    <div v-for="(item, i) in props.categories" :key="i">
      <CategoryMenuItem
        :title="item.title"
        :index="i"
        :item="item"
        :depth="depth"
        @save-sub-category="onSaveSubCategory"
      />
    </div>
    <div class="add-category-container" @click="addCategory">
      <img src="../../../../shared/ui/assets/plus-icon.png" />
      <span>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</span>
    </div>
    <AddCategoryConfirmationModal
      @close="onClose"
      @save="onSave"
      :value="addCategoryConfirmationModalValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType } from "vue";
import CategoryMenuItem from "@/widgets/category/left-side-bar/ui/CategoryMenuItem.vue";
import { AddCategoryConfirmationModal } from "@/features/category/save-category-settings";
import { ICategory } from "@/pages/category/store/category-page-store.types";

let props = defineProps({
  categories: {
    type: Array as PropType<ICategory[]>,
    default: [],
  },
});

// let categories = computed(() => );

// props.item.children.push({
//   title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
//   childMarketplaceCategoryIdList: [],
// });

let addCategoryConfirmationModalValue = ref(false);

let depth = ref(0);
function addCategory() {
  addCategoryConfirmationModalValue.value = true;
}

const onClose = () => {
  addCategoryConfirmationModalValue.value = false;
};

const emit = defineEmits(["save"]);

const onSave = () => {
  emit("save", true);

  addCategory();
  // categories.value.push({
  //   title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
  //   children: [],
  // });
  onClose();
};

const onSaveSubCategory = () => {};
</script>

<style lang="scss" scoped>
.left-side-bar-container {
  width: auto;
  height: 100vh;
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
