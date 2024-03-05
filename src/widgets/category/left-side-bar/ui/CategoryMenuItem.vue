<template>
  <div
    :class="
      item.active
        ? 'empty-category-container-active'
        : 'empty-category-container'
    "
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click.stop="onChangeActive"
  >
    <div class="category-item-content">
      <SIconRender
        name="ArrowIcon"
        size="small"
        :direction="
          item.childMarketplaceCategoryIdList?.length > 0 ? 'bottom' : 'right'
        "
      />
      <img v-if="item.icon" :src="item.icon" class="w-20 h-20 rounded" />
      <img v-else src="../../../../shared/ui/assets/fileIcon.png" />
      <span>{{ $t(`${props.categoryName}`) }}</span>
    </div>
    <img
      v-if="isHovering"
      width="13px"
      height="13px"
      @click.stop="addSubCategory"
      src="../../../../shared/ui/assets/plus-icon.png"
    />
  </div>
  <div
    v-if="item.childMarketplaceCategoryIdList?.length > 0"
    :style="{
      marginLeft: `${depth + 15}px`,
    }"
  >
    <CategoryMenuItem
      v-for="child in item.childMarketplaceCategoryIdList"
      :item="child"
      :depth="depth + 1"
      :categoryName="child.categoryName"
      @add-sub-category="addSubCategory"
    />
  </div>

  <AddCategoryConfirmationModal
    @close="onClose"
    @save="onSave"
    :value="addCategoryConfirmationModalValue"
  />
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";
import { AddCategoryConfirmationModal } from "@/features/category/save-category-settings";
import { useCategorySharedStore } from "@/shared/store/category";

const props = defineProps({
  categoryName: {
    type: String,
    default: "",
  },
  item: {
    type: Object,
    default: null,
  },
  depth: { type: Number, default: null },
  index: { type: Number, default: null },
});

const emit = defineEmits(["saveSubCategory", "addSubCategory"]);

const isHovering = ref(false);

const addCategoryConfirmationModalValue = ref(false);

const categoryShareStore = useCategorySharedStore();

function addSubCategory() {
  deletePropertyFromMultidimensionalArray(
    categoryShareStore.getCategories,
    "active"
  );
  addCategoryConfirmationModalValue.value = true;
}

const onClose = () => {
  addCategoryConfirmationModalValue.value = false;
};

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

const onSave = () => {
  emit("saveSubCategory", true);

  console.log(props.item);

  deletePropertyFromMultidimensionalArray(
    props.item.childMarketplaceCategoryIdList,
    "active"
  );

  props.item.childMarketplaceCategoryIdList.push({
    categoryName: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
    childMarketplaceCategoryIdList: [],
    active: true,
    icon: null,
    id: null,
    parentId: props.item.id,
  });

  onClose();
};

const onChangeActive = () => {
  deletePropertyFromMultidimensionalArray(
    categoryShareStore.getCategories,
    "active"
  );
  categoryShareStore.fetchCategoryById(props.item.id);

  categoryShareStore.setCategoryHasChanged(true);
  props.item.active = true;
};
</script>

<style>
.empty-category-container,
.empty-category-container-active {
  width: 334px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 17px;
  background-color: transparent;
  border-radius: 12px;
  &:hover {
    background-color: #f5f3ff;
  }
  .category-item-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7.5px;
  }
}

.empty-category-container-active {
  background-color: #f5f3ff;
}
</style>
