<template>
  <div class="main-wrapper-property">
    <SLoader v-if="isLoading" />
    <img class="six-dots" src="/icons/six-dots-icon.png" alt="six-dots" />
    <div :class="!hideBody ? 'header-property' : 'header-property-closed'">
      <div class="s-flex s-flex-row s-items-center s-justify-between s-gap-4">
        <div class="s-flex s-flex-row s-items-center s-gap-3">
          <SIconRender name="chevron-up" @click="onHideBody" v-if="!hideBody" />
          <SIconRender name="chevron-right" @click="onHideBody" v-else />
          <p>{{ propertyName }}</p>
        </div>
        <div class="s-flex s-flex-row s-items-center s-gap-3">
          <img class="s-w-3 s-h-3" src="/icons/tree-icon.png" alt="tree-icon" />
          <p>
            {{ "allowedValues" in property && property.allowedValues?.length }}
          </p>
          <p>{{ $t("lang-afd3cd36-ac2b-4852-bde7-3d2cb4d7842b") }}</p>
          <p>{{ getPropertyValueAutocomplete?.length ?? 0 }}</p>
        </div>
      </div>

      <div class="s-relative cursor-pointer s-rounded">
        <img src="/icons/delete-icon.png" @click="deletePropertyCard" />
      </div>
    </div>
    <div v-if="!hideBody" class="body s-flex s-flex-row s-flex-wrap s-gap-3">
      <SButton
        size="large"
        class="add-value s-flex s-items-center s-gap-3 cursor-pointer s-py-4 s-px-5"
        @click="onShowAddPopertyValue"
      >
        <img src="/icons/plus-icon.png" />
        <p class="s-text-white">
          {{ $t("lang-614cdebf-5132-4c67-b75c-767d3f711423") }}
        </p>
      </SButton>
      <template v-if="'allowedValues' in property">
        <div
          class="value s-flex s-items-center s-gap-2"
          v-for="(propertyValue, i) in property.allowedValues"
          :key="i"
        >
          <p>{{ propretyValueName(propertyValue) }}</p>
          <SIconRender
            name="close"
            class="cursor-pointer"
            @click="onRemovePropertyValue(propertyValue)"
          />
        </div>
      </template>
    </div>
    <SModal
      v-model="showAddPopertyValueModal"
      height="auto"
      @onClose="onCloseShowAddPopertyValueModal"
      :width="'440px'"
    >
      <SInput isSearchable hide-details />
      <div class="s-mt-5">
        <div v-for="value in getPropertyValueAutocomplete" class="s-mb-4">
          <SCheckbox v-model="value.checked">{{ value.value }}</SCheckbox>
        </div>
      </div>
      <div>
        <SButton
          size="large"
          class="s-w-full"
          @click="onCloseAddPropertyValueModal"
        >
          {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}
        </SButton>
      </div>
    </SModal>
  </div>
</template>

<script lang="ts" setup>
import {
  SIconRender,
  SModal,
  SInput,
  SCheckbox,
  SButton,
  SLoader,
} from "@tumarsoft/ogogo-ui";
import { ref, computed, type PropType } from "vue";
import {
  AllowedValue,
  PropertyValueAutocomplete,
} from "@/shared/api/category/index.types";
import { CategoryByIdProperty, useCategoryStore } from "@/entities/category";

const props = defineProps({
  property: {
    type: Object as PropType<CategoryByIdProperty>,
    default: "",
  },
});

let hideBody = ref(false);

const categoryStore = useCategoryStore();

const showAddPopertyValueModal = ref(false);
const isLoading = ref(false);

const onHideBody = () => {
  hideBody.value = !hideBody.value;
};

let openPropertyToolsDropdown = ref(false);

const onOpenPropertyToolsDropdown = () => {
  openPropertyToolsDropdown.value = !openPropertyToolsDropdown.value;
};

const onCloseShowAddPopertyValueModal = () => {
  showAddPopertyValueModal.value = false;
};

const getPropertyValueAutocomplete = computed(
  () => categoryStore.getPropertyValueAutocomplete
);

const propertyName = computed(() => {
  if ("value" in props.property) {
    return props.property.value;
  } else {
    return props.property.name;
  }
});

const propretyValueName = (
  propertyValue: AllowedValue | PropertyValueAutocomplete
) => {
  if ("value" in propertyValue) {
    return propertyValue.value;
  } else {
    return propertyValue.propertyValueText;
  }
};

const onShowAddPopertyValue = () => {
  isLoading.value = true;
  categoryStore
    .fetchPropertiesListAutocomplete(props.property.propertyId)
    .finally(() => {
      showAddPopertyValueModal.value = true;
      isLoading.value = false;
    });
};

const onCloseAddPropertyValueModal = () => {
  const checkedValues = getPropertyValueAutocomplete.value.filter(
    (value) => value.checked
  );
  categoryStore.setPropertyAllowedValueObj(
    checkedValues,
    props.property.propertyId
  );
  showAddPopertyValueModal.value = false;
};

const onRemovePropertyValue = (
  obj: PropertyValueAutocomplete | AllowedValue
) => {
  if ("propertyId" in props.property) {
    categoryStore.setDeletePropertyAllowedValueObj(
      obj,
      props.property.propertyId
    );
  }
};

const deletePropertyCard = () => {
  categoryStore.removePropertyCard(props.property.propertyId);
  onOpenPropertyToolsDropdown();
};
</script>
<style scoped lang="scss">
.main-wrapper-property {
  position: relative;
  border-radius: 16px;
  border: 1px solid #dfe1e5;
  margin-top: 24px;
}

.main-wrapper-property {
  border-radius: 16px;
}
.header-property,
.header-property-closed {
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 26px 18px;
  border-bottom: 1px solid #dfe1e5;
}
.header-property-closed {
  border-bottom: none;
}
.body {
  padding: 16px;
}
.add-value {
  width: auto;
  border-radius: 384px;
  background-color: var(--violet-600);
  color: var(--white);
}
.value {
  width: auto;
  padding: 14px 20px;
  border-radius: 384px;
  background-color: var(--white);
  border: 1px solid #dfe1e5;
}

.six-dots {
  position: absolute;
  left: -22px;
  top: 10%;
}
</style>
