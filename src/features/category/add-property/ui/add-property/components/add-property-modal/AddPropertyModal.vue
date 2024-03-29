<template>
  <SModal
    :isModalOpen="props.value"
    height="auto"
    @onClose="onClose"
    :width="'440px'"
  >
    <div class="add-property-modal-main-wrapper">
      <p class="font-bold">
        {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
      </p>
      <SSelect
        v-model="propertyObject.propertyId"
        :label="$t('lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2')"
        class="w-p-100"
        @focus="onFocusPropertiesList"
        showValue="value"
        getValue="id"
        :items="getPropertiesListAutocomplete"
      />
      <SCheckbox id="0" class="w-p-100">
        {{ $t("lang-030b4140-be2c-482a-ba23-45c62ada7613") }}
      </SCheckbox>
      <SSelect
        v-model="propertyObject.renderType"
        :label="$t('lang-d5ed16f8-b6af-4c0a-ba0a-820cf3ce91ba')"
        class="w-p-100"
        :items="renderPropertyTypes"
        showValue="text"
        getValue="value"
      />
      <SSwitch
        labelPosition="left"
        class="switch-container"
        v-model="propertyObject.required"
        >{{ $t("lang-98b7ffed-5818-4f3e-b552-aa10e70616ee") }}</SSwitch
      >
      <SSwitch
        labelPosition="left"
        class="switch-container"
        v-model="propertyObject.propertySelector"
        >{{ $t("lang-1e1a6bdb-c17e-4089-ab17-e6d8c040203f") }}</SSwitch
      >
      <SSwitch
        labelPosition="left"
        class="switch-container"
        v-model="propertyObject.isAddNameToProductName"
        >{{ $t("lang-4ae87450-36ee-4e92-a2a1-071898911d00") }}</SSwitch
      >
      <div class="buttons-container">
        <SButton color="gray" class="button" @click="onClose">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}</SButton
        >
        <SButton color="violet" class="button" @click="onSave">
          {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}</SButton
        >
      </div>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import {
  SButton,
  SModal,
  SSelect,
  SCheckbox,
  SSwitch,
} from "@tumarsoft/ogogo-ui";
// import { useAddPropertyStore } from "../store/add-property.store";
import { PropertyRenderType } from "@/shared/lib/utils/enums";
import i18n from "@/shared/lib/plugins/i18n";
import { useCategorySharedStore } from "@/shared/store/category";
import { useAddPropertyStore } from "@/features/category/add-property/store/add-property.store";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const propertyObject = reactive({
  propertyId: null,
  required: null,
  propertySelector: null,
  isAddNameToProductName: null,
  renderType: null,
  allowedValues: [],
});

const addPropertyStore = useAddPropertyStore();

const getPropertiesListAutocomplete = computed(() => {
  return addPropertyStore.getPropertiesListAutocomplete || [];
});

const categorySharedStore = useCategorySharedStore();

const onFocusPropertiesList = () => {
  addPropertyStore.fetchPropertiesListAutocomplete();
};

onFocusPropertiesList();

const renderPropertyTypes = reactive([
  {
    text: i18n.global.t("lang-3a9c4149-1f0f-48fd-a8f9-110db99c5bb7"),
    value: PropertyRenderType.Text,
  },
  {
    text: i18n.global.t("lang-c5fd0dae-6a8f-47e2-980f-a50095f3f772"),
    value: PropertyRenderType.Image,
  },
]);

const onClose = () => {
  emit("close", false);
};

const onSave = () => {
  categorySharedStore.setProperties(propertyObject);
  onClose();
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
