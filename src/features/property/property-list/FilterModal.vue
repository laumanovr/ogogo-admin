<template>
  <SModal :isModalOpen="isShowModal" class="filter-modal" width="420px" height="100%"
          @onClose="toggleFilterModal">
    <div class="modal-content" ref="modalContent">
      <div class="filter-title">Фильтры</div>
      <div class="section">
        <div class="section-title">Тип свойства</div>
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
        <div class="section-title">Тип данных</div>
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
        <div class="section-title">Локализация значении</div>
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
        <div class="section-title">Группа свойств</div>
        <SInput isSearchable/>
        <div class="property-items" :style="{'max-height': maxHeight+'px'}">
          <div v-for="item in 50">
            <SCheckbox>Характеристики</SCheckbox>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-actions">
      <SButton size="large" color="gray">Сбросить</SButton>
      <SButton size="large" color="violet">Применить</SButton>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { SModal, SRadioButton, SCheckbox, SInput, SButton } from "@tumarsoft/ogogo-ui";
import { ref, nextTick } from "vue";

const isShowModal = ref(false);
const modalContent = ref(null);
const maxHeight = ref(0);

const toggleFilterModal = () => {
  isShowModal.value = !isShowModal.value;
  nextTick(() => {
    const rect = modalContent.value.getBoundingClientRect();
    maxHeight.value = (rect.height / 2);
  });
};

defineExpose({
  toggleFilterModal
});
</script>

<style lang="scss">
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

  .radio-text, .checkbox-title {
    font-size: 14px;
    font-weight: 500;
  }

  .checkbox-container {
    margin-bottom: 8px;
  }

  .property-items {
    overflow-y: auto;
    //max-height: 200px;
    margin-top: 15px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
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