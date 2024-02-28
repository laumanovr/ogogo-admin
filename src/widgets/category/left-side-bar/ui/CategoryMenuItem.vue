<template>
  <div
    class="empty-category-container"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div class="category-item-content">
      <SIconRender
        name="ArrowIcon"
        size="small"
        :direction="
          item.childMarketplaceCategoryIdList.length > 0 ? 'bottom' : 'right'
        "
      />
      <img src="../../../../shared/ui/assets/fileIcon.png" />
      <span>{{ $t(`${props.title}`) }}</span>
    </div>
    <img
      v-if="isHovering"
      width="13px"
      height="13px"
      @click="addSubCategory"
      src="../../../../shared/ui/assets/plus-icon.png"
    />
  </div>
  <div
    v-if="item.childMarketplaceCategoryIdList.length > 0"
    :style="{
      marginLeft: `${depth + 15}px`,
    }"
  >
    <CategoryMenuItem
      v-for="child in item.childMarketplaceCategoryIdList"
      :item="child"
      :depth="depth + 1"
      :title="child.title"
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

const props = defineProps({
  title: {
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

const emit = defineEmits(["saveSubCategory"]);

const isHovering = ref(false);

const addCategoryConfirmationModalValue = ref(false);

function addSubCategory() {
  addCategoryConfirmationModalValue.value = true;
}

const onClose = () => {
  addCategoryConfirmationModalValue.value = false;
};

const onSave = () => {
  addSubCategory();
  emit("saveSubCategory", true);
  // props.item.children.push({
  //   title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
  //   childMarketplaceCategoryIdList: [],
  // });
  onClose();
};
</script>

<style>
.empty-category-container {
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
</style>
