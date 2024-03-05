<template>
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
          <td><input type="text" v-model="item.value"/></td>
          <td><input type="text" v-model="item.valueEn"/></td>
          <td><input type="text" v-model="item.valueKy"/></td>
          <td>
            <span v-if="item.icoBase64" class="d-flex items-center justify-between">
            <img :src="item.icoBase64" alt="icon" class="selected-image ml-10">
            <SIconRender name="CloseRoundIcon" color="black" @click="item.icoBase64=null"/>
          </span>
            <label for="file" class="label-container" v-else>
              <div class="tooltip-info">280 x 280 пиксель для формата PNG; 24 x 24 пиксель для формата SVG.</div>
              <span class="d-flex items-center font-size-15 cursor-pointer">
              <img src="../../../../shared/ui/assets/attach.svg" class="mr-12 ml-10">
              Загрузить
            </span>
              <input type="file" id="file" @change="onSelectFile($event, item)">
            </label>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, watch } from "vue";
import { usePropertyDetailStore } from "@/features/property/property-detail/store/property-detail.store";
import { useAlertStore } from "@/shared/store/alert";
import { useRoute } from "vue-router";
import lodash from "lodash";

const propertyDetailStore = usePropertyDetailStore();
const alertStore = useAlertStore();
const route = useRoute();
const currentValues = ref([]);
const propertyValues = ref([]);

onMounted(() => {
  getPropertyValueList();
});


const convertToBase64 = (file) => {
  return new Promise(((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  }));
};

const onSelectFile = async (e, item) => {
  const file = e.target.files[0];
  if (file) {
    item.icoBase64 = await convertToBase64(file);
  }
};

watch(() => propertyDetailStore.propertyValueList, (newValue: any) => {
  if (newValue) {
    propertyValues.value = newValue.reverse();
    currentValues.value = JSON.parse(JSON.stringify(propertyValues.value));
  }
});

const getPropertyValueList = () => {
  propertyDetailStore.fetchPropertyValueList({pageSize: 500, queryParams: {propertyId: route.params.id}});
};

const addValue = () => {
  currentValues.value.unshift({
    recent: true,
    propertyId: route.params?.id,
    value: null,
    valueEn: null,
    valueKy: null,
    icoBase64: null
  });
};

const submitPropertyValues = () => {
  const newValues = currentValues.value.filter((item: { recent: any; }) => item.recent);
  const updatedValues = lodash.differenceWith(currentValues.value.filter((item) => !item.recent), propertyValues.value, lodash.isEqual);
  if (!newValues.length && !updatedValues.length) {
    alertStore.showInfo("Вы ничего не добавили!");
  }
  if (newValues.length) {
    onCreate(newValues);
  }
  if (updatedValues.length) {
    onUpdate(updatedValues);
  }
};

const onCreate = (newValues) => {
  if (!newValues.every((item) => item.value && item.icoBase64)) {
    alertStore.showInfo("Заполните поля и иконку");
    return;
  }
  propertyDetailStore.createPropertyValue(newValues);
};

const onUpdate = (updatedValues) => {
  if (!updatedValues.every((item) => item.value  && item.icoBase64)) {
    alertStore.showInfo("Заполните поля и иконку");
    return;
  }
  propertyDetailStore.updatePropertyValue(updatedValues);
};

const searchPropertyValue = (value) => {
  propertyDetailStore.fetchPropertyValueList({pageSize: 500, search: value, queryParams: {propertyId: route.params.id}});
}

defineExpose({
  submitPropertyValues,
  searchPropertyValue
});
</script>

<style lang="scss" scoped>
@import "../../../../app/style/colors.scss";

.label-container {
  position: relative;

  &:hover {
    .tooltip-info {
      display: inline-block;
    }
  }

  .tooltip-info {
    display: none;
    position: absolute;
    top: -45px;
    left: -28px;
    background: $gray-800;
    border-radius: 8px;
    padding: 8px;
    font-size: 10px;
    font-weight: 500;
    color: $white;
    width: 208px;
    z-index: 999;
    white-space: pre-wrap;
  }

  input {
    display: none;
  }
}

.selected-image {
  width: 24px;
  height: 24px;
  object-fit: cover;
}
</style>