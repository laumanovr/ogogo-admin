<template>
  <SModal
    v-model="isShow"
    class="filter-modal full-height"
    width="420px"
    height="100%"
    position="right"
    @onClose="toggleModal"
  >
    <div class="modal-content" ref="modalContent">
      <div class="filter-title">
        {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-0dbca1e1-64c6-4393-b5ac-893d88799263") }}
        </div>
        <div>
          <SCheckbox>Требуется модерация</SCheckbox>
        </div>
        <div>
          <SCheckbox>Требует корректировку</SCheckbox>
        </div>
        <div>
          <SCheckbox>Проверен</SCheckbox>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-2d3a6b38-a84c-4879-8c50-a6983ea5ba6d") }}
        </div>
        <div>
          <SCheckbox>Название</SCheckbox>
        </div>
        <div>
          <SCheckbox>Описание</SCheckbox>
        </div>
        <div>
          <SCheckbox>Фото профиля</SCheckbox>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-425a5a16-bf0a-4ded-a7bc-cbe7490b659a") }}
        </div>
        <SInput isSearchable width="100%" />
        <div class="property-items" :style="{ 'max-height': maxHeight + 'px' }">
          <div v-for="item in 30" :key="item">
            <SCheckbox>Mobi Market</SCheckbox>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-actions">
      <SButton size="large" color="gray">{{
        $t("lang-7967cf86-49d6-41c2-bdd7-23c6f8e5e8ea")
      }}</SButton>
      <SButton size="large" color="violet">{{
        $t("lang-bdc9ab1e-91af-43ea-8bb9-e23c8ea98755")
      }}</SButton>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { SModal, SCheckbox, SInput, SButton } from "@tumarsoft/ogogo-ui";
import { ref, nextTick } from "vue";

const isShow = ref(false);
const modalContent = ref(null);
const maxHeight = ref(0);

const toggleModal = () => {
  isShow.value = !isShow.value;
  nextTick(() => {
    const rect = modalContent?.value?.getBoundingClientRect();
    maxHeight.value = rect.height / 2;
  });
};

defineExpose({
  toggleModal,
});
</script>

<style lang="scss" scoped>
@import "styles";
</style>
