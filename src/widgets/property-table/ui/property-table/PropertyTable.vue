<template>
  <div class="table-data" :key="key" v-if="isShowTable">
    <SLoader v-if="isLoading" />
    <table class="table">
      <thead>
        <tr>
          <th @click="addProperty"><span>+</span></th>
          <th>
            {{ $t("lang-7a193c83-40e4-4059-99e8-069b5cd9ff17") }} <span>*</span>
          </th>
          <th>
            {{ $t("lang-2f392c31-664a-4308-8678-694690cac96f") }} <span>*</span>
          </th>
          <th>{{ $t("lang-f4f37dde-e947-49bc-b821-0d88dfc13cb8") }}</th>
          <th>{{ $t("lang-4ea09cca-d60f-4edb-bbc5-445fa26c84dd") }}</th>
          <th>
            {{ $t("lang-9c86a33a-af41-4a30-a4a4-f92b212341ec") }} <span>*</span>
          </th>
          <th>
            {{ $t("lang-75023d2b-bdc4-487f-8669-4aaa17aa5ac3") }} <span>*</span>
          </th>
          <th>{{ $t("lang-9ab1a9cb-2e91-4f2e-82c9-f428b2f27482") }}</th>
          <th>{{ $t("lang-7840e0f8-edde-410b-a545-109b9b8b1e4c") }}</th>
          <th>{{ $t("lang-a1011c48-9e0b-4f4a-904b-095e38e83d80") }}</th>
          <th>{{ $t("lang-1d4b9820-36c2-44fc-ad50-c9a7c2d5be2a") }}</th>
          <th>{{ $t("lang-b499eecd-5ecf-4aab-a5d4-01df61cf8934") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in currentProperties" :key="i" class="table-row">
          <td></td>
          <td><input v-model="item.key" /></td>
          <td><input v-model="item.name" /></td>
          <td><input v-model="item.nameKy" /></td>
          <td><input v-model="item.nameEn" /></td>
          <td>
            <SSelect
              :items="propertyTypes"
              itemTitle="name"
              itemValue="id"
              v-model="item.propertyType"
              hide-details
            />
          </td>
          <td>
            <SSelect
              :items="propertyValueTypes"
              itemTitle="name"
              itemValue="id"
              v-model="item.propertyValueType"
              @change="onSelectValue($event, item)"
              hide-details
            />
          </td>
          <td>
            <input
              type="number"
              :placeholder="
                !item.isInputDisabled
                  ? $t('lang-37babc3e-d8b2-4f97-a14b-f09e8e720bba')
                  : ''
              "
              :disabled="item.isInputDisabled"
              v-model="item.validationRules"
              v-if="item.isPropertyString"
            />
            <SSelect
              :items="validateRanges"
              itemTitle="name"
              itemValue="id"
              v-model="item.validationRules"
              hide-details
              v-else
            />
          </td>
          <td>
            <SSelect
              :items="localizations"
              itemTitle="name"
              itemValue="value"
              v-model="item.localization"
              hide-details
            />
          </td>
          <td>
            <SSelect
              :items="groupProperties"
              itemTitle="value"
              itemValue="id"
              isSearchable
              v-model="item.propertyGroupId"
              hide-details
            />
          </td>
          <td>
            <SSelect
              :items="groupProperties"
              itemTitle="value"
              itemValue="id"
              isSearchable
              v-model="item.propertySubGroupId"
              hide-details
            />
          </td>
          <td>
            <template v-if="!item.recent">
              <router-link
                :to="{ name: 'propertyValue', params: { id: item.id } }"
              >
                {{ $t("lang-3e41be22-9488-4617-838b-fd7b4987c42f") }}
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
import { SSelect, SLoader } from "@tumarsoft/ogogo-ui";
import { usePropertyStore } from "@/entities/property";
import { useAlertStore } from "@/shared/store/alert";
import lodash from "lodash";
import { SORT_DIRECTION } from "@/shared/api/api.types";
import i18n from "@/shared/lib/plugins/i18n";
import { PropertyType, PropertyValueType } from "@/shared/lib/utils/enums";

const propertyStore = usePropertyStore();
const alertStore = useAlertStore();

const validateRanges = reactive([
  { id: 1, name: "От 10 до 50", range: { min: 10, max: 50 } },
  { id: 2, name: "От 10 до 100", range: { min: 10, max: 100 } },
  { id: 3, name: "От 10 до 500", range: { min: 10, max: 500 } },
  { id: 4, name: "От 10 до 1000", range: { min: 10, max: 1000 } },
]);

const localizations = reactive([
  {
    name: i18n.global.t("lang-bebd78bd-e0f1-43d8-b67c-c49cd3cad402"),
    value: true,
  },
  {
    name: i18n.global.t("lang-5cf9b5fe-b483-4e36-8175-55e09a96ad0c"),
    value: false,
  },
]);

const propertyTypes = reactive([
  {
    name: i18n.global.t("lang-b556b932-7106-4e40-b4ed-8314af8e958e"),
    id: PropertyType.DIRECTORY,
  },
  {
    name: i18n.global.t("lang-724aee48-4344-4801-877d-bc0365712d09"),
    id: PropertyType.MANUAL,
  },
]);

const propertyValueTypes = reactive([
  {
    name: i18n.global.t("lang-ba38d69e-acf1-4177-aaad-28f3c1a686c3"),
    id: PropertyValueType.TEXT,
  },
  {
    name: i18n.global.t("lang-d3444b70-fb84-4c93-8835-86352d19e50e"),
    id: PropertyValueType.NUMBER,
  },
  {
    name: i18n.global.t("lang-bf52cc09-dd8c-4a5e-bc91-5b8f1cc01a37"),
    id: PropertyValueType.BOOLEAN,
  },
  {
    name: i18n.global.t("lang-3eb2df9e-5602-4d69-8574-eef4fcf1f898"),
    id: PropertyValueType.FRACTIONAL_NUMBER,
  },
]);

const groupProperties = computed(
  () => propertyStore.getPropertyGroupListAutocomplete
);
const propertyList = ref([]);
const currentProperties = ref([]);
const key = ref(0);
const isShowTable = ref(false);
const isLoading = ref(false);

onMounted(() => {
  Promise.all([getPropertyList(), getGroupPropertyList()]);
});

watch(
  () => propertyStore.propertyList,
  (newValue: any) => {
    if (newValue) {
      propertyList.value = newValue
        .map((item: any) => {
          if (item.propertyValueType === 14100) {
            item.validationRules = item.validationRules?.length;
            item.isPropertyString = true;
            item.isInputDisabled = false;
          }
          if (
            item.propertyValueType === 14101 ||
            item.propertyValueType === 14103
          ) {
            item.isPropertyString = false;
            const itemRange = {
              max: item.validationRules?.max,
              min: item.validationRules?.min,
            };
            const foundRange = lodash.find(validateRanges, {
              range: itemRange,
            });
            item.validationRules = foundRange?.id;
          }
          if (item.propertyValueType === 14102) {
            item.isPropertyString = true;
            item.isInputDisabled = true;
            item.validationRules = null;
          }
          return item;
        })
        .reverse();
      currentProperties.value = JSON.parse(JSON.stringify(propertyList.value));
    }
  }
);

const onSelectValue = (option: any, item: any) => {
  if (option === 14100) {
    item.isPropertyString = true;
    item.isInputDisabled = false;
    item.validationRules = null;
  }
  if (option === 14101 || option === 14103) {
    item.isPropertyString = false;
    item.validationRules = null;
  }
  if (option === 14102) {
    item.isPropertyString = true;
    item.isInputDisabled = true;
    item.validationRules = null;
  }
};

const getPropertyList = () => {
  isLoading.value = true;
  propertyStore
    .fetchPropertyList({
      pageSize: 500,
      sortDirection: SORT_DIRECTION.ASCENDING,
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getGroupPropertyList = () => {
  isLoading.value = true;
  propertyStore
    .fetchPropertyGroupListAutocomplete({
      pageSize: 500,
      sortDirection: SORT_DIRECTION.ASCENDING,
      pageIndex: 0,
    })
    .then(() => {
      isShowTable.value = true;
    })
    .finally(() => {
      isLoading.value = false;
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
    validationRules: null,
  });
  key.value++;
};

const submitProperty = () => {
  const newProperties = currentProperties.value.filter((item) => item.recent);
  const updatedProperties = lodash.differenceWith(
    currentProperties.value.filter((item) => !item.recent),
    propertyList.value,
    lodash.isEqual
  );
  if (!newProperties.length && !updatedProperties.length) {
    alertStore.showInfo(
      i18n.global.t("lang-61e05094-f247-4a4c-8ff0-8b0e6947c1ab")
    );
    return;
  }
  if (newProperties.length) {
    onCreate(newProperties);
  }
  if (updatedProperties.length) {
    onUpdate(updatedProperties);
  }
};

const onCreate = (newProperties: any) => {
  if (
    !newProperties.every(
      (item: any) =>
        item.key && item.name && item.propertyType && item.propertyValueType
    )
  ) {
    alertStore.showInfo(
      i18n.global.t("lang-f424ab7b-4c2c-4122-983d-2d74ec68a4b8")
    );
    return;
  }
  const preparedData = newProperties.map((item: any) => {
    if (item.isPropertyString) {
      item.validationRules = { length: item.validationRules || {} };
    } else {
      item.validationRules = validateRanges.find(
        (range) => range.id === item.validationRules
      ).range;
    }
    return item;
  });
  isLoading.value = true;
  propertyStore
    .createPropertyList(preparedData)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onUpdate = (updatedProperties: any) => {
  if (
    !updatedProperties.every(
      (item: any) =>
        item.key && item.name && item.propertyType && item.propertyValueType
    )
  ) {
    alertStore.showInfo(
      i18n.global.t("lang-f424ab7b-4c2c-4122-983d-2d74ec68a4b8")
    );
    return;
  }
  const preparedData = updatedProperties.map((item: any) => {
    if (item.isPropertyString) {
      item.validationRules = item.isInputDisabled
        ? null
        : { length: item.validationRules || 0 };
    } else {
      item.validationRules = validateRanges.find(
        (range) => range.id === item.validationRules
      ).range;
    }
    return item;
  });
  isLoading.value = true;
  propertyStore
    .updatePropertyList(preparedData)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const searchProperty = (value: any) => {
  isLoading.value = true;
  propertyStore
    .fetchPropertyList({
      pageSize: 500,
      search: value,
      sortDirection: SORT_DIRECTION.ASCENDING,
      queryParams: undefined,
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

defineExpose({
  submitProperty,
  searchProperty,
});
</script>

<style lang="scss" scoped>
@import "styles";
</style>
