<template>
  <div class="main-wrapper-property">
    <img class="six-dots" src="/icons/six-dots-icon.png" alt="six-dots" />
    <div :class="!hideBody ? 'header-property' : 'header-property-closed'">
      <div
        class="left-toolbar d-flex flex-row items-center justify-between gap-15"
      >
        <div class="d-flex flex-row items-center gap-10">
          <SIconRender name="chevron-up" @click="onHideBody" v-if="!hideBody" />
          <SIconRender name="chevron-right" @click="onHideBody" v-else />
          <p>{{ propertyName }}</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img class="s-w-3 s-h-3" src="/icons/tree-icon.png" alt="tree-icon" />
          <p>
            {{ "allowedValues" in property && property.allowedValues?.length }}
          </p>
          <p>{{ $t("lang-afd3cd36-ac2b-4852-bde7-3d2cb4d7842b") }}</p>
          <p>{{ getPropertyValueAutocomplete?.length ?? 0 }}</p>
        </div>
        <!-- <div class="d-flex flex-row items-center gap-10">
          <img class="w-17 h-17" src="/icons/star-icon.png" />
          <img class="w-17 h-17" src="/icons/paper-and-mouse-icon.png" />
          <img class="w-17 h-17" src="/icons/article-icon.png" />
        </div> -->
      </div>
      <div class="relative hover:bg-slate-50 px-2 cursor-pointer rounded">
        <img
          class="s-w-4 s-h-1"
          src="/icons/three-dots.png"
          alt="three-dots"
          @click="onOpenPropertyToolsDropdown"
        />
        <ul
          v-if="openPropertyToolsDropdown"
          class="flex flex-col list-none rounded-lg shadow-2xl px-1.2 py-1.2 bg-white absolute left--14"
        >
          <!-- <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
          >
            <img src="/icons/settings-icon.png" />{{
              $t("lang-910d305f-6cda-4bea-9829-3a26101da8a3")
            }}
          </li> -->
          <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
            @click="deletePropertyCard"
          >
            <img src="/icons/delete-icon.png" />
            {{ $t("lang-4d04ae16-7603-4e88-8a14-bf133f2e2c4a") }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!hideBody" class="body d-flex flex-row flex-wrap gap-8">
      <div
        class="add-value d-flex flex-row items-center gap-10 cursor-pointer hover:-translate-y-0.60 hover:scale-102 duration-300 padding-14-20"
        @click="onShowAddPopertyValue"
      >
        <img src="/icons/plus-icon.png" />
        <p class="text-white">
          {{ $t("lang-614cdebf-5132-4c67-b75c-767d3f711423") }}
        </p>
      </div>
      <template v-if="'allowedValues' in property">
        <div
          class="value d-flex flex-row items-center gap-8"
          v-for="(propertyValue, i) in property.allowedValues"
          :key="i"
        >
          <p>{{ propretyValueName(propertyValue) }}</p>
          <SIconRender
            name="close"
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
      <SInput class="w-p-100" isSearchable hide-details />
      <div class="s-mt-5">
        <div v-for="value in getPropertyValueAutocomplete" class="s-mb-4">
          <SCheckbox v-model="value.checked">{{ value.value }}</SCheckbox>
        </div>
      </div>
      <div class="light">
        <SButton
          size="large"
          class="w-p-100"
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
  categoryStore
    .fetchPropertiesListAutocomplete(props.property.propertyId)
    .then(() => {
      showAddPopertyValueModal.value = true;
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
  // padding: 14px 20px;
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
