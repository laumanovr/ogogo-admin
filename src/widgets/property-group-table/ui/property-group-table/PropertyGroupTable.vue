<template>
  <div class="table-data group">
    <SLoader v-if="isLoading" />
    <table class="table">
      <thead>
        <tr>
          <th @click="addGroupProperty"><span>+</span></th>
          <th>
            {{ $t("lang-5f681a3c-8aa8-4dc0-a500-3750e1f8fea6") }} <span>*</span>
          </th>
          <th>
            {{ $t("lang-2f392c31-664a-4308-8678-694690cac96f") }} <span>*</span>
          </th>
          <th>
            {{ $t("lang-f4f37dde-e947-49bc-b821-0d88dfc13cb8") }} <span>*</span>
          </th>
          <th>
            {{ $t("lang-4ea09cca-d60f-4edb-bbc5-445fa26c84dd") }} <span>*</span>
          </th>
          <th>{{ $t("lang-e8c1b3cf-9ced-4644-bbb7-7a9f3b58dee1") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in currentGroupProperties"
          :key="i"
          class="table-row"
        >
          <td></td>
          <td>
            <input type="text" readonly v-model.number="item.sequenceNumber" />
          </td>
          <td><input type="text" v-model="item.name" /></td>
          <td><input type="text" v-model="item.nameKy" /></td>
          <td><input type="text" v-model="item.nameEn" /></td>
          <td>
            <span
              v-if="item.icoBase64"
              class="d-flex items-center justify-between"
            >
              <img
                :src="item.icoBase64"
                alt="icon"
                class="selected-image ml-10"
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
</template>

<script lang="ts" setup>
import { SIconRender, SLoader } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, watch, computed } from "vue";
import { usePropertyGroupStore } from "@/entities/property-group";
import { useAlertStore } from "@/shared/store/alert";
import lodash from "lodash";
import { Nullable } from "@/shared/lib/utils/nullable";
import { SORT_DIRECTION } from "@/shared/api/api.types";
import { PropertyGroupEntity } from "@/entities/property-group";

const propertyGroupStore = usePropertyGroupStore();
const alertStore = useAlertStore();
let currentGroupProperties = ref([]);
let groupProperties = ref([]);
const isLoading = ref(false);
const propertyGroupList = computed(
  () => propertyGroupStore.getPropertyGroupList
);

onMounted(() => {
  getGroupPropertyList();
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

const onSelectFile = async (e: Event, item: PropertyGroupEntity) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
  if (file) {
    item.icoBase64 = await convertToBase64(file);
  }
};

watch(
  () => propertyGroupList.value,
  (newValue: any[]) => {
    if (newValue) {
      groupProperties.value = newValue.reverse();
      currentGroupProperties.value = JSON.parse(
        JSON.stringify(groupProperties.value)
      );
    }
  }
);

const getGroupPropertyList = () => {
  isLoading.value = true;
  propertyGroupStore
    .fetchGroupPropertyList({
      pageSize: 500,
      sortDirection: SORT_DIRECTION.ASCENDING,
      queryParams: undefined,
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const addGroupProperty = () => {
  currentGroupProperties.value.unshift({
    recent: true,
    sequenceNumber: currentGroupProperties.value.length + 1,
    name: null,
    nameKy: null,
    nameEn: null,
    icoBase64: null,
  });
};

const submitGroupProperty = () => {
  const newItems = currentGroupProperties.value.filter((item) => item.recent);
  const updatedItems = lodash.differenceWith(
    currentGroupProperties.value.filter((item) => !item.recent),
    groupProperties.value,
    lodash.isEqual
  );
  if (!newItems.length && !updatedItems.length) {
    alertStore.showInfo("Вы ничего не добавили!");
    return;
  }
  if (newItems.length) {
    onCreate(newItems);
  }
  if (updatedItems.length) {
    onUpdate(updatedItems);
  }
};

const onCreate = (newItems: any) => {
  if (!newItems.every((item: any) => item.name)) {
    alertStore.showInfo("Заполните поля");
    return;
  }
  isLoading.value = true;
  propertyGroupStore
    .createGroupProperty(newItems)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onUpdate = (updatedItems: any) => {
  if (!updatedItems.every((item: any) => item.name)) {
    alertStore.showInfo("Заполните поля");
    return;
  }
  isLoading.value = true;
  propertyGroupStore
    .updateGroupProperty(updatedItems)
    .then((message: string) => {
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const searchGroupProperty = (value: any) => {
  isLoading.value = true;
  propertyGroupStore
    .fetchGroupPropertyList({
      pageSize: 500,
      search: value,
      sortDirection: SORT_DIRECTION.ASCENDING,
      queryParams: null,
      pageIndex: 0,
    })
    .finally(() => {
      isLoading.value = false;
    });
};

defineExpose({
  submitGroupProperty,
  searchGroupProperty,
});
</script>

<style lang="scss" scoped>
@import "styles";
</style>
