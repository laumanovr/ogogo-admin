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
        <td><input type="text" v-model.number="item.sequenceNumber"/></td>
        <td><input type="text" v-model="item.name"/></td>
        <td><input type="text" v-model="item.nameKy"/></td>
        <td><input type="text" v-model="item.nameEn"/></td>
        <td>
          <span v-if="item.icoBase64" class="d-flex items-center justify-between">
            <img :src="item.icoBase64" alt="icon" class="selected-image">
            <SIconRender name="CloseRoundIcon" color="black" @click="item.icoBase64=null"/>
          </span>
          <label for="file" class="label-container" v-else>
            <div class="tooltip-info">280 x 280 пиксель для формата PNG; 24 x 24 пиксель для формата SVG.</div>
            <span class="d-flex items-center font-size-15 cursor-pointer">
              <img src="../../../../../shared/ui/assets/attach.svg" class="mr-12">
              Загрузить
            </span>
            <input type="file" id="file" @change="onSelectFile($event, item)">
          </label>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref, computed, onMounted, watch } from "vue";
import { useGroupPropertyStore } from "../store/group-property.store";
import lodash from "lodash";

const groupPropertyStore = useGroupPropertyStore();
let currentGroupProperties = ref([]);


onMounted(() => {
  getGroupPropertyList();
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

let groupProperties = ref([]);

watch(() => groupPropertyStore.groupPropertyList, (newValue: any) => {
  if (newValue) {
    groupProperties.value = newValue.reverse();
    currentGroupProperties.value = JSON.parse(JSON.stringify(groupProperties.value));
  }
});

const getGroupPropertyList = () => {
  groupPropertyStore.fetchGroupPropertyList({pageSize: 100});
};

const addGroupProperty = () => {
  currentGroupProperties.value.unshift({
    recent: true,
    sequenceNumber: 0,
    name: null,
    nameKy: null,
    nameEn: null,
    icoBase64: null
  });
};

const submitGroupProperty = async () => {
  const newItems = currentGroupProperties.value.filter((item) => item.recent);
  const updatedItems = lodash.differenceWith(currentGroupProperties.value.filter((item) => !item.recent), groupProperties.value, lodash.isEqual);
  if (!newItems.length && !updatedItems.length) {
    return;
  }
  await onCreate(newItems);
  await onUpdate(updatedItems);
};

const onCreate = (newItems) => {
  if (newItems.length) {
    groupPropertyStore.createGroupProperty(newItems);
  }
};

const onUpdate = (updatedItems) => {
  if (updatedItems.length) {
    groupPropertyStore.updateGroupProperty(updatedItems);
  }
};

defineExpose({
  submitGroupProperty
});
</script>

<style lang="scss" scoped>
@import "../../../../../app/style/colors.scss";

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