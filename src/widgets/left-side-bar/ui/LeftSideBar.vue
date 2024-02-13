<template>
  <div class="left-side-bar-container">
    <div class="item"></div>
    <div class="empty-category-container">
      <IconRender name="ArrowIcon" size="small" @click="addSubCategory" />
      <img src="../../../shared/ui/assets/fileIcon.png" />
      <span>{{ $t("lang-b14d63cd-580a-4645-8c82-860175a3830f") }}</span>
    </div>
    <div class="add-category-container" @click="addCategory">
      <img src="../../../shared/ui/assets/plus-icon.png" />
      <span>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import IconRender from "../../../../node_modules/ogogo-uikit/src/components/Icons/IconRender/IconRender.vue";

let categories = ref([]);
let subCategories = ref([]);

function addCategory() {
  console.log("addCategory");
}
function addSubCategory() {
  console.log("addSubCategory");
}
</script>

<style lang="scss" scoped>
// @import "../app/style/colors.scss";

.left-side-bar-container {
  width: 350px;
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
