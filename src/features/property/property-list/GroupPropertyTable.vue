<template>
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
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";

const currentGroupProperties = reactive([]);

const isDisabled = computed(() => currentGroupProperties.every((item) => !item.recent));

const addGroupProperty = () => {
  currentGroupProperties.push({recent: true});
};

const submitGroupProperty = () => {
  const newGroupProperties = currentGroupProperties.filter((item) => item.recent);
  console.log("newGroupProperties", newGroupProperties);
};

defineExpose({
  submitGroupProperty
})
</script>

<style lang="scss">

</style>