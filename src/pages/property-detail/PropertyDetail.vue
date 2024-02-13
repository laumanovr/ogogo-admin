<template>
  <div class="property-value-container">
    <div class="title-container">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left"/>
        Назад
      </SButton>
      <h2 class="head-title">Свойства/Значение</h2>
    </div>
    <div class="actions">
      <SInput isSearchable isClearable width="100%"/>
      <SButton color="violet" :disabled="isDisabled">Сохранить</SButton>
    </div>
    <div class="table-container">
      <div class="table-data group">
        <table class="table">
          <thead>
          <tr>
            <th @click="addValue"><span>+</span></th>
            <th>Значение ru <span>*</span></th>
            <th>Название kg <span>*</span></th>
            <th>Название en <span>*</span></th>
            <th>Иконка</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in currentValues" :key="i" class="table-row">
            <td></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td><input type="text"/></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SButton, SIconRender, SInput} from "@tumarsoft/ogogo-ui";
import {ref, reactive, computed} from "vue";
import {useRouter} from 'vue-router';

const router = useRouter();

const currentValues = reactive([]);

const isDisabled = computed(() => currentValues.every((item: { recent: any; }) => !item.recent));

const goBack = () => {
  router.push('/property');
}

const addValue = () => {
  currentValues.push({recent: true});
}

const onSave = () => {
  const newValues = currentValues.filter((item: { recent: any; }) => item.recent);
}
</script>

<style lang="scss">
.property-value-container {
  .title-container {
    display: flex;
    align-items: center;

    .head-title {
      margin-left: 24px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .button {
      margin-left: 12px;
    }
  }
}
</style>