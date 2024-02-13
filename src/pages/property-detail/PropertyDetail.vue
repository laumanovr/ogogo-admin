<template>
  <div class="property-value-container">
    <div class="title-container">
      <Button color="white" @click="goBack">
        <IconRender name="ArrowIcon" direction="left"/>
        Назад
      </Button>
      <h2 class="head-title">Свойства/Значение</h2>
    </div>
    <div class="actions">
      <Input isSearchable isClearable width="100%"/>
      <Button color="violet" :disabled="isDisabled">Сохранить</Button>
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
import Button from "/node_modules/ogogo-uikit/src/components/SButton/SButton.vue";
import IconRender from "/node_modules/ogogo-uikit/src/components/Icons/IconRender/IconRender.vue";
import Input from "/node_modules/ogogo-uikit/src/components/Input/Input.vue";
// ---------------------------------
import {ref, reactive, computed} from "vue";
import {useRouter} from 'vue-router';

const router = useRouter();

const currentValues = reactive([]);

const isDisabled = computed(() => currentValues.every((item) => !item.recent));

const goBack = () => {
  router.push('/property');
}

const addValue = () => {
  currentValues.push({recent: true});
}

const onSave = () => {
  const newValues = currentValues.filter((item) => item.recent);
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