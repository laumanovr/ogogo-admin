<template>
  <div class="table-container">
    <SLoader v-if="isLoading" />
    <div class="table-data group">
      <table class="table">
        <thead>
          <tr>
            <th @click="addValue"><span>+</span></th>
            <th>
              {{ $t("lang-2f392c31-664a-4308-8678-694690cac96f") }}
              <span>*</span>
            </th>
            <th>
              {{ $t("lang-f4f37dde-e947-49bc-b821-0d88dfc13cb8") }}
              <span>*</span>
            </th>
            <th>
              {{ $t("lang-4ea09cca-d60f-4edb-bbc5-445fa26c84dd") }}
              <span>*</span>
            </th>
            <th>{{ $t("lang-e8c1b3cf-9ced-4644-bbb7-7a9f3b58dee1") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in currentValues" :key="i" class="table-row">
            <td></td>
            <td><input type="text" v-model="item.value" /></td>
            <td><input type="text" v-model="item.valueEn" /></td>
            <td><input type="text" v-model="item.valueKy" /></td>
            <td>
              <span
                v-if="item.icoBase64"
                class="s-flex s-items-center s-justify-between"
              >
                <img
                  :src="item.icoBase64"
                  alt="icon"
                  class="selected-image s-ml-3"
                />
                <SIconRender name="close" @click="item.icoBase64 = null" />
              </span>
              <SFileInput
                mode="attach"
                @change="onSelectFile($event, item)"
                v-else
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender, SLoader, SFileInput } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, watch, computed } from "vue";
import { usePropertyValueStore } from "@/entities/property-value";
import { useAlertStore } from "@/shared/store/alert";
import { useRoute } from "vue-router";
import lodash from "lodash";
import { Nullable } from "@/shared/lib/utils/nullable";
import i18n from "@/shared/lib/plugins/i18n";

const propertyValueStore = usePropertyValueStore();
const alertStore = useAlertStore();
const route = useRoute();
const currentValues = ref([]);
const propertyValues = ref([]);
const isLoading = ref(false);
const propertyValueList = computed(
  () => propertyValueStore.getPropertyValueList
);

onMounted(() => {
  getPropertyValueList();
});

const convertToBase64 = (
  file: File
): Promise<Nullable<string | ArrayBuffer>> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const onSelectFile = async (file: File, item: any) => {
  if (file) {
    item.icoBase64 = await convertToBase64(file);
  }
};

watch(
  () => propertyValueList.value,
  (newValue: any) => {
    if (newValue) {
      propertyValues.value = newValue.reverse();
      currentValues.value = JSON.parse(JSON.stringify(propertyValues.value));
    }
  }
);

const getPropertyValueList = () => {
  isLoading.value = true;
  propertyValueStore
    .fetchPropertyValueList({
      pageSize: 500,
      queryParams: { propertyId: route.params.id },
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const addValue = () => {
  currentValues.value.unshift({
    recent: true,
    propertyId: route.params?.id,
    value: null,
    valueEn: null,
    valueKy: null,
    icoBase64: null,
  });
};

const submitPropertyValues = () => {
  const newValues = currentValues.value.filter(
    (item: { recent: any }) => item.recent
  );
  const updatedValues = lodash.differenceWith(
    currentValues.value.filter((item) => !item.recent),
    propertyValues.value,
    lodash.isEqual
  );
  if (!newValues.length && !updatedValues.length) {
    alertStore.showInfo(
      i18n.global.t("lang-61e05094-f247-4a4c-8ff0-8b0e6947c1ab")
    );
  }
  if (newValues.length) {
    onCreate(newValues);
  }
  if (updatedValues.length) {
    onUpdate(updatedValues);
  }
};

const onCreate = (newValues: any) => {
  if (!newValues.every((item: any) => item.value && item.icoBase64)) {
    alertStore.showInfo(
      i18n.global.t("lang-ab57eb65-6d3a-4fce-9458-9578727a3d75")
    );
    return;
  }
  isLoading.value = true;
  propertyValueStore
    .createPropertyValue(newValues)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onUpdate = (updatedValues: any) => {
  if (!updatedValues.every((item: any) => item.value && item.icoBase64)) {
    alertStore.showInfo(
      i18n.global.t("lang-ab57eb65-6d3a-4fce-9458-9578727a3d75")
    );
    return;
  }
  isLoading.value = true;
  propertyValueStore
    .updatePropertyValue(updatedValues)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const searchPropertyValue = (value: any) => {
  isLoading.value = true;
  propertyValueStore
    .fetchPropertyValueList({
      pageSize: 500,
      search: value,
      queryParams: { propertyId: route.params.id },
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

defineExpose({
  submitPropertyValues,
  searchPropertyValue,
});
</script>

<style lang="scss" scoped>
@import "styles";
</style>
