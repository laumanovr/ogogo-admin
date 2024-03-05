<template>
  <div class="table-data" :key="key" v-if="isShowTable">
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
        <td><input v-model="item.name"/></td>
        <td><input v-model="item.nameKy"/></td>
        <td><input v-model="item.nameEn"/></td>
        <td>
          <SSelect :items="propertyTypes" showValue="name" getValue="id" v-model="item.propertyType"/>
        </td>
        <td>
          <SSelect :items="propertyValueTypes" showValue="name" getValue="id" v-model="item.propertyValueType"
                   @onChange="onSelectValue($event, item)"/>
        </td>
        <td>
          <input
              type="number"
              :placeholder="!item.isInputDisabled ? 'Введите макс.значение' : ''"
              :disabled="item.isInputDisabled"
              v-model="item.validationRules"
              v-if="item.isPropertyString"
          />
          <SSelect :items="validateRanges" showValue="name" getValue="id" v-model="item.validationRules" v-else/>
        </td>
        <td>
          <SSelect :items="localizations" showValue="name" getValue="value" v-model="item.localization"/>
        </td>
        <td>
          <SSelect :items="groupProperties" showValue="value" getValue="id" isSearchable
                   v-model="item.propertyGroupId"/>
        </td>
        <td>
          <SSelect :items="groupProperties" showValue="value" getValue="id" isSearchable
                   v-model="item.propertySubGroupId"/>
        </td>
        <td>
          <template v-if="!item.recent">
            <router-link :to="{name: 'propertyDetail', params: {id: item.id}}">Значений:
              {{ item.countOfPropertyValues }}
            </router-link>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted, watch } from "vue";
import { SSelect } from "@tumarsoft/ogogo-ui";
import { usePropertyStore } from "@/features/property/property-list/property/store/property.store";
import { useAlertStore } from "@/shared/store/alert";
import lodash from "lodash";

const propertyStore = usePropertyStore();
const alertStore = useAlertStore();

const validateRanges = reactive([
  {id: 1, name: "От 10 до 50", range: {min: 10, max: 50}},
  {id: 2, name: "От 10 до 100", range: {min: 10, max: 100}},
  {id: 3, name: "От 10 до 500", range: {min: 10, max: 500}},
  {id: 4, name: "От 10 до 1000", range: {min: 10, max: 1000}},
  {id: 5, name: "Ot 4 do 4", range: {min: 4, max: 4}}
]);

const localizations = reactive([
  {name: "Нужна", value: true},
  {name: "Не нужна", value: false}
]);

const propertyTypes = reactive([
  {name: "Справочник", id: 14000},
  {name: "Ручное", id: 14001}
]);

const propertyValueTypes = reactive([
  {name: "Текстовое", id: 14100},
  {name: "Числовое", id: 14101},
  {name: "Булеан", id: 14102},
  {name: "Дробные числа", id: 14103},
]);

onMounted(async () => {
  await getPropertyList();
  await getGroupPropertyList();
});

const groupProperties = computed(() => propertyStore.groupProperties);
const propertyList = ref([]);
const currentProperties = ref([]);
const key = ref(0);
const isShowTable = ref(false);

watch(() => propertyStore.propertyList, (newValue: any) => {
  if (newValue) {
    propertyList.value = newValue.map((item) => {
      if (item.propertyValueType === 14100) {
        item.validationRules = item.validationRules?.length;
        item.isPropertyString = true;
        item.isInputDisabled = false;
      }
      if (item.propertyValueType === 14101 || item.propertyValueType === 14103) {
        item.isPropertyString = false;
        const itemRange = {max: item.validationRules?.max, min: item.validationRules?.min};
        const foundRange = lodash.find(validateRanges, {range: itemRange});
        item.validationRules = foundRange?.id;
      }
      if (item.propertyValueType === 14102) {
        item.isPropertyString = true;
        item.isInputDisabled = true;
        item.validationRules = null;
      }
      return item;
    }).reverse();
    currentProperties.value = JSON.parse(JSON.stringify(propertyList.value));
  }
});

const onSelectValue = (option, item) => {
  if (option.id === 14100) {
    item.isPropertyString = true;
    item.isInputDisabled = false;
    item.validationRules = null;
  }
  if (option.id === 14101 || option.id === 14103) {
    item.isPropertyString = false;
    item.validationRules = null;
  }
  if (option.id === 14102) {
    item.isPropertyString = true;
    item.isInputDisabled = true;
    item.validationRules = null;
  }
};

const getPropertyList = () => {
  propertyStore.fetchPropertyList({pageSize: 500});
};

const getGroupPropertyList = () => {
  propertyStore.fetchGroupProperties().then(() => {
    isShowTable.value = true;
  });
};

const addProperty = () => {
  currentProperties.value.unshift({
    recent: true,
    key: null,
    name: null,
    nameKy: null,
    nameEn: null,
    propertyType: null,
    propertyValueType: null,
    propertyGroupId: null,
    propertySubGroupId: null,
    localization: null,
    validationRules: null
  });
  key.value++;
};

const submitProperty = () => {
  const newProperties = currentProperties.value.filter((item) => item.recent);
  const updatedProperties = lodash.differenceWith(currentProperties.value.filter((item) => !item.recent), propertyList.value, lodash.isEqual);
  if (!newProperties.length && !updatedProperties.length) {
    alertStore.showInfo("Вы ничего не добавили!");
    return;
  }
  if (newProperties.length) {
    onCreate(newProperties);
  }
  if (updatedProperties.length) {
    onUpdate(updatedProperties);
  }
};

const onCreate = async (newProperties) => {
  if (!newProperties.every((item) => item.key && item.name && item.propertyType && item.propertyValueType)) {
    alertStore.showInfo("Заполните поля!");
    return;
  }
  const preparedData = newProperties.map((item) => {
    if (item.isPropertyString) {
      item.validationRules = {length: item.validationRules || {}};
    } else {
      item.validationRules = validateRanges.find((range) => range.id === item.validationRules).range;
    }
    return item;
  });
  await propertyStore.createPropertyList(preparedData);
};

const onUpdate = async (updatedProperties) => {
  if (!updatedProperties.every((item) => item.key && item.name && item.propertyType && item.propertyValueType)) {
    alertStore.showInfo("Заполните поля!");
    return;
  }
  const preparedData = updatedProperties.map((item) => {
    if (item.isPropertyString) {
      item.validationRules = item.isInputDisabled ? null : {length: item.validationRules || 0};
    } else {
      item.validationRules = validateRanges.find((range) => range.id === item.validationRules).range;
    }
    return item;
  });
  await propertyStore.updatePropertyList(preparedData);
};

const searchProperty = (value) => {
  propertyStore.fetchPropertyList({pageSize: 500, search: value});
}

defineExpose({
  submitProperty,
  searchProperty
});
</script>

<style lang="scss" scoped>
.table-data {
  .dropdown {
    width: 100%;
  }
}
</style>