<template>
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
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import {SSelect} from "@tumarsoft/ogogo-ui";

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

const isDisabled = computed(() => currentProperties.every((item) => !item.recent));

const addProperty = () => {
  currentProperties.push({recent: true});
};

const submitProperty = () => {
  const newProperties = currentProperties.filter((item) => item.recent);
  console.log("newProperties", newProperties);
};

defineExpose({
  submitProperty,
  currentProperties
})
</script>

<style lang="scss">

</style>