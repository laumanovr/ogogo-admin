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
        name="chevron-right"
        size="small"
        :class="[
          'arrow s-text-gray-500',
          { bottom: item.childMarketplaceCategoryIdList?.length },
        ]"
      />
      <img
        v-if="item.icon || item.icoBase64"
        :src="item.icon || item.icoBase64"
        class="s-w-4 s-h-4 rounded"
      />
      <img v-else src="/icons/fileIcon.png" />
      <span>{{ $t(`${props.categoryName}`) }}</span>
    </div>
    <img
      width="13px"
      height="13px"
      @click.stop="addSubCategory"
      src="/icons/plus-icon.png"
      v-if="isSelectedCategory"
    />
  </div>
  <div
    v-if="item.childMarketplaceCategoryIdList?.length > 0"
    :style="{
      marginLeft: `${depth + 15}px`,
    }"
  >
    <CategoryTreeItem
      v-for="child in item.childMarketplaceCategoryIdList"
      :item="child"
      :depth="depth + 1"
      :categoryName="child.categoryName"
      @add-sub-category="addSubCategory"
    />
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";
import { CategoryTreeEntity, useCategoryStore } from "@/entities/category";
import { watch, computed } from "vue";

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

const categoryStore = useCategoryStore();

const isSelectedCategory = computed(
  () => categoryStore.selectedCategory?.id === props.item?.id
);

watch(
  () => props.item,
  (newValue: any) => {
    if (newValue) {
      if (props.item.active) {
        if (props.item.id) {
          categoryStore.fetchCategoryById(props.item.id);
        }
      } else {
        categoryStore.setTranslation(null, "ru");
        categoryStore.setTranslation(null, "ky");
        categoryStore.setTranslation(null, "en");
        categoryStore.setIcoBase64(null);
        categoryStore.setImageId(null);
        categoryStore.setFile(null);
        categoryStore.setCategoryId(null);
        categoryStore.setPropertiesArray([]);
      }
    }
  }
);

function deletePropertyFromMultidimensionalArray(
  array: CategoryTreeEntity[],
  propertyToDelete: string
) {
  array.forEach(
    (
      obj: CategoryTreeEntity & {
        [key: string]: any;
      }
    ) => {
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
    }
  );
}

const addSubCategory = () => {
  deletePropertyFromMultidimensionalArray(
    categoryStore.getCategories,
    "active"
  );
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
    sequenceNumber: props.depth,
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

  emit("saveSubCategory", true);
};

const onChangeActive = () => {
  //remove active flag on other item to show actual active item
  deletePropertyFromMultidimensionalArray(
    categoryStore.getCategories,
    "active"
  );

  if (props.item.id) {
    categoryStore.fetchCategoryById(props.item.id);
  } else {
    // reset settings on other item click
    categoryStore.setTranslation(null, "ru");
    categoryStore.setTranslation(null, "ky");
    categoryStore.setTranslation(null, "en");
    categoryStore.setIcoBase64(null);
    categoryStore.setImageId(null);
    categoryStore.setFile(null);
    categoryStore.setCategoryId(null);
    categoryStore.setPropertiesArray([]);
  }

  categoryStore.setCategoryHasChanged(true);
  props.item.active = true;
};
</script>

<style lang="scss" scoped>
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
    .arrow.bottom {
      transform: rotate(90deg);
    }
  }
}

.empty-category-container-active {
  background-color: #f5f3ff;
}
</style>
