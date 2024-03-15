<template>
  <div class="table-data group">
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
              <SIconRender
                name="CloseRoundIcon"
                color="gray"
                @click="item.icoBase64 = null"
              />
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
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, watch } from "vue";
import { useGroupPropertyStore } from "../store/group-property.store";
import { useAlertStore } from "@/shared/store/alert";
import lodash from "lodash";
import { Nullable } from "@/shared/lib/utils/nullable";
import { IGroupPropertyApi } from "../api/group-property-api.types";

const groupPropertyStore = useGroupPropertyStore();
const alertStore = useAlertStore();
let currentGroupProperties = ref([]);
let groupProperties = ref([]);

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

const onSelectFile = async (e: Event, item: IGroupPropertyApi) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
  if (file) {
    item.icoBase64 = await convertToBase64(file);
  }
};

watch(
  () => groupPropertyStore.groupPropertyList,
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
  groupPropertyStore.fetchGroupPropertyList({ pageSize: 500 });
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
  groupPropertyStore.createGroupProperty(newItems);
};

const onUpdate = (updatedItems: any) => {
  if (!updatedItems.every((item: any) => item.name)) {
    alertStore.showInfo("Заполните поля");
    return;
  }
  groupPropertyStore.updateGroupProperty(updatedItems);
};

const searchGroupProperty = (value: any) => {
  groupPropertyStore.fetchGroupPropertyList({ pageSize: 500, search: value });
};

defineExpose({
  submitGroupProperty,
  searchGroupProperty,
});
</script>

<style lang="scss" scoped>
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
    background: var(--gray-800);
    border-radius: 8px;
    padding: 8px;
    font-size: 10px;
    font-weight: 500;
    color: var(--white);
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
