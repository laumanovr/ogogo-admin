<template>
  <div class="property-container">
    <h2 class="head-title">Свойства</h2>
    <template v-if="currentProperties.length">
      <div class="filter-container">
        <STabs :tab-mode="'filter-tabs'">
          <STabItem value="one" :active-tab="tab" @changeTab="handleTabChange">Свойства</STabItem>
          <STabItem value="two" :active-tab="tab" @changeTab="handleTabChange">Группы свойств</STabItem>
        </STabs>
        <div class="filter-actions">
          <div class="search-input">
            <SInput isSearchable/>
          </div>
          <div class="icon-border" @click="toggleFilterModal">
            <SIconRender name="SettingsIcon"/>
          </div>
          <SButton size="medium" color="violet" @click="onSubmit" :disabled="isDisabled">Сохранить</SButton>
        </div>
      </div>
      <div class="table-container">
        <STabWindow value="one" :active-tab="tab">
          <div class="table-data">
            <table class="table">
              <thead>
              <tr>
                <th @click="addProperty"><span>+</span></th>
                <th>Ключ <span>*</span></th>
                <th>Название ru <span>*</span></th>
                <th>Название kg</th>
                <th>Название en</th>
                <th>Тип свойства <span>*</span></th>
                <th>Тип данных <span>*</span></th>
                <th>Валидация</th>
                <th>Локализация значения</th>
                <th>Группа свойств</th>
                <th>Подгруппа свойств</th>
                <th>Значения</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, i) in currentProperties" :key="i" class="table-row">
                <td></td>
                <td><input v-model="item.key"/></td>
                <td><input v-model="item.nameRu"/></td>
                <td><input v-model="item.nameKg"/></td>
                <td><input v-model="item.nameEn"/></td>
                <td><input type="text"/></td>
                <td>
                  <SSelect :items="items" showValue="name" getValue="id" v-model="item.tip"/>
                </td>
                <td><input v-model="item.validText"/></td>
                <td>
                  <SSelect :items="items" showValue="name" getValue="id"/>
                </td>
                <td>
                  <SSelect :items="items" showValue="name" getValue="id"/>
                </td>
                <td>
                  <SSelect :items="items" showValue="name" getValue="id"/>
                </td>
                <td>
                  <router-link to="/property/2">Значений: 0</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </STabWindow>
        <STabWindow value="two" :active-tab="tab">
          <div class="table-data group">
            <table class="table">
              <thead>
              <tr>
                <th @click="addGroupProperty"><span>+</span></th>
                <th>Порядковый номер <span>*</span></th>
                <th>Название ru <span>*</span></th>
                <th>Название kg <span>*</span></th>
                <th>Название en <span>*</span></th>
                <th>Иконка</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, i) in currentGroupProperties" :key="i" class="table-row">
                <td></td>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </STabWindow>
      </div>
      <SModal :isModalOpen="isShowModal" class="filter-modal" width="420px" height="100%" @onClose="toggleFilterModal">
        <div class="modal-content">
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
            <div class="property-items">
              <div v-for="item in 20">
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
    <template v-else>
      <EmptyData buttonTitle="Добавить свойство" @onClick="addProperty"/>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  SButton,
  STabs,
  STabItem,
  STabWindow,
  SIconRender,
  SSelect,
  SInput,
  SModal,
  SRadioButton,
  SCheckbox
} from "@tumarsoft/ogogo-ui";
import { ref, reactive, computed } from "vue";
import EmptyData from "../../features/EmptyData.vue";

const currentProperties = reactive([]);
const currentGroupProperties = reactive([]);
const tab = ref("one");
const isShowModal = ref(false);

const isDisabled = computed(() => tab.value === "one" ? currentProperties.every((item) => !item.recent) : currentGroupProperties.every((item) => !item.recent));

const handleTabChange = (newTab) => {
  tab.value = newTab;
};

const addProperty = () => {
  currentProperties.push({recent: true});
};

const onSubmitProperty = () => {
  const newProperties = currentProperties.filter((item) => item.recent);
  console.log("newProperties", newProperties);
};

const addGroupProperty = () => {
  currentGroupProperties.push({recent: true});
};

const onSubmitGroupProperty = () => {
  const newGroupProperties = currentGroupProperties.filter((item) => item.recent);
  console.log("newGroupProperties", newGroupProperties);
};

const onSubmit = () => {
  if (tab.value === "one") {
    onSubmitProperty();
  } else {
    onSubmitGroupProperty();
  }
};

const toggleFilterModal = () => {
  isShowModal.value = !isShowModal.value;
};
</script>

<style lang="scss">
@import "../../app/style/colors";

.property-container {
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .filter-actions {
      display: flex;
      align-items: center;
    }

    .icon-border {
      border: 1px solid $gray-200;
      border-radius: 8px;
      padding: 10px 11px 8px;
      margin: 0 12px;
    }

    .search-input {

    }
  }

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
      max-height: 200px;
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
}
</style>