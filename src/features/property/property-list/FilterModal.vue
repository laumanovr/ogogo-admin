<template>
  <SModal
    :isModalOpen="isShowModal"
    class="filter-modal"
    width="420px"
    height="100%"
    position="right"
    @onClose="toggleFilterModal"
  >
    <div class="modal-content" ref="modalContent">
      <div class="filter-title">
        {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
      </div>
      <div class="section">
        <div class="section-title">
          {{ $t("lang-9c86a33a-af41-4a30-a4a4-f92b212341ec") }}
        </div>
        <div>
          <SRadioButton>Все</SRadioButton>
        </div>
        <div>
          <SRadioButton>Справочник</SRadioButton>
        </div>
        <div>
          <SRadioButton>Ручное</SRadioButton>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-75023d2b-bdc4-487f-8669-4aaa17aa5ac3") }}
        </div>
        <div>
          <SCheckbox>Текстовой</SCheckbox>
        </div>
        <div>
          <SCheckbox>Числовое</SCheckbox>
        </div>
        <div>
          <SCheckbox>Дробные числа</SCheckbox>
        </div>
        <div>
          <SCheckbox>Булеан</SCheckbox>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-7840e0f8-edde-410b-a545-109b9b8b1e4c") }}
        </div>
        <div>
          <SRadioButton>Все</SRadioButton>
        </div>
        <div>
          <SRadioButton>Нет</SRadioButton>
        </div>
        <div>
          <SRadioButton>Есть</SRadioButton>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          {{ $t("lang-a1011c48-9e0b-4f4a-904b-095e38e83d80") }}
        </div>
        <SInput isSearchable width="100%" />
        <div class="property-items" :style="{ 'max-height': maxHeight + 'px' }">
          <div v-for="item in 50" :key="item">
            <SCheckbox>Характеристики</SCheckbox>
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
import {
  SModal,
  SRadioButton,
  SCheckbox,
  SInput,
  SButton,
} from "@tumarsoft/ogogo-ui";
import { ref, nextTick } from "vue";

const isShowModal = ref(false);
const modalContent = ref(null);
const maxHeight = ref(0);

const toggleFilterModal = () => {
  isShowModal.value = !isShowModal.value;
  nextTick(() => {
    const rect = modalContent?.value?.getBoundingClientRect();
    maxHeight.value = rect.height / 2;
  });
};

defineExpose({
  toggleFilterModal,
});
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";

.filter-modal {
  .modal-content {
    height: calc(100% - 75px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
  }

  .filter-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 35px;
  }

  .section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .radio-text,
  .checkbox-title {
    font-size: 14px;
    font-weight: 500;
  }

  .checkbox-container {
    margin-bottom: 8px;
  }

  .property-items {
    overflow-y: auto;
    margin-top: 15px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
  }

  .input-container {
    width: calc(100% - 10px);
  }

  .filter-actions {
    display: flex;
    justify-content: space-between;
    padding: 24px 0 24px;
    position: absolute;
    bottom: 0;
    width: calc(100% - 56px);

    .button {
      width: calc(50% - 4px);
    }
  }
}
</style>
