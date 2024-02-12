<template>
  <div class="property-container">
    <h2 class="head-title">Свойства</h2>
    <template v-if="currentProperties.length">
      <div class="filter-container">
        <Tabs :tab-mode="'filter-tabs'">
          <TabItem value="one" :active-tab="tab" @changeTab="handleTabChange">Свойства</TabItem>
          <TabItem value="two" :active-tab="tab" @changeTab="handleTabChange">Группы свойств</TabItem>
        </Tabs>
        <div class="filter-actions">
          <div class="search-input">
            <Input isSearchable/>
          </div>
          <div class="icon-border">
            <IconRender name="SettingsIcon"/>
          </div>
          <Button size="medium" color="violet" @click="onSubmit" :disabled="isDisabled">Сохранить</Button>
        </div>
      </div>
      <div class="table-container">
        <TabWindow value="one" :active-tab="tab">
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
                <td><Select :items="items" showValue="name" getValue="id" v-model="item.tip"/></td>
                <td><input v-model="item.validText"/></td>
                <td><Select :items="items" showValue="name" getValue="id"/></td>
                <td><Select :items="items" showValue="name" getValue="id"/></td>
                <td><Select :items="items" showValue="name" getValue="id"/></td>
                <td>
                  <router-link to="/property/2">Значений: 0</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </TabWindow>
        <TabWindow value="two" :active-tab="tab">
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
        </TabWindow>
      </div>
    </template>
    <template v-else>
      <EmptyData buttonTitle="Добавить свойство" @onClick="addProperty"/>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Button from "/node_modules/ogogo-uikit/src/components/SButton/SButton.vue";
import Tabs from "/node_modules/ogogo-uikit/src/components/Tabs/Tabs.vue";
import TabItem from "/node_modules/ogogo-uikit/src/components/Tabs/TabItem/TabItem.vue";
import TabWindow from "/node_modules/ogogo-uikit/src/components/Tabs/TabWindow/TabWindow.vue";
import IconRender from "/node_modules/ogogo-uikit/src/components/Icons/IconRender/IconRender.vue";
import Select from "/node_modules/ogogo-uikit/src/components/Select/Select.vue";
import Input from "/node_modules/ogogo-uikit/src/components/Input/Input.vue";
// -----------------------------------------------------------------
import {ref, reactive, computed} from "vue";
import EmptyData from "../../features/EmptyData.vue";

const items = reactive([
  {name: 'JavaScript', id: 'id-js'},
  {name: 'NodeJS', id: 'id-nodejs'},
  {name: 'HTML', id: 'id-html'},
  {name: 'CSS', id: 'id-css'},
  {name: 'Python', id: 'id-python'},
  {name: 'Ruby', id: 'id-ruby'},
  {name: 'PHP', id: 'id-php'},
])

const currentProperties = reactive([]);
const currentGroupProperties = reactive([]);
const tab = ref("one");

const isDisabled = computed(() => tab.value === "one" ? currentProperties.every((item) => !item.recent) : currentGroupProperties.every((item) => !item.recent));

const handleTabChange = (newTab) => {
  tab.value = newTab;
}

const addProperty = () => {
  currentProperties.push({recent: true})
}

const onSubmitProperty = () => {
  const newProperties = currentProperties.filter((item) => item.recent);
  console.log('newProperties', newProperties);
}

const addGroupProperty = () => {
  currentGroupProperties.push({recent: true});
}

const onSubmitGroupProperty = () => {
  const newGroupProperties = currentGroupProperties.filter((item) => item.recent);
  console.log('newGroupProperties', newGroupProperties);
}

const onSubmit = () => {
  if (tab.value === "one") {
    onSubmitProperty();
  } else {
    onSubmitGroupProperty();
  }
}
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
}
</style>