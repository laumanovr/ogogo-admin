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
              <label for="file" class="label-container" v-else>
                <div class="tooltip-info">
                  {{ $t("lang-4ae6eb0a-a362-49ab-824e-4ee51c97542b") }}
                </div>
                <span class="d-flex items-center font-size-15 cursor-pointer">
                  <img src="/icons/attach.svg" class="mr-12 ml-10" />
                  {{ $t("lang-c1d4974f-d48f-4107-99d8-d6a188b31129") }}
                </span>
                <input
                  type="file"
                  id="file"
                  @change="onSelectFile($event, item)"
                />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender, SLoader } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, watch, computed } from "vue";
import { usePropertyValueStore } from "@/entities/property-value";
import { useAlertStore } from "@/shared/store/alert";
import { useRoute } from "vue-router";
import lodash from "lodash";
import { Nullable } from "@/shared/lib/utils/nullable";

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

const onSelectFile = async (e: Event, item: any) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
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
    alertStore.showInfo("Вы ничего не добавили!");
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
    alertStore.showInfo("Заполните поля и иконку");
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
    alertStore.showInfo("Заполните поля и иконку");
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
