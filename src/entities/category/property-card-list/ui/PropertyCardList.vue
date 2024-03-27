<template>
  <div class="main-wrapper-property">
    <img class="six-dots" src="/icons/six-dots-icon.png" alt="six-dots" />
    <div :class="!hideBody ? 'header-property' : 'header-property-closed'">
      <div
        class="left-toolbar d-flex flex-row items-center justify-between gap-15"
      >
        <div class="d-flex flex-row items-center gap-10">
          <SIconRender
            name="ArrowIcon"
            :direction="!hideBody ? 'top' : 'right'"
            @click="onHideBody"
          />
          <p>{{ props.property.value }}</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img class="w-14 h-14" src="/icons/tree-icon.png" alt="tree-icon" />
          <p>{{ selectedPropertyValues?.length }}</p>
          <p>{{ $t("lang-afd3cd36-ac2b-4852-bde7-3d2cb4d7842b") }}</p>
          <p>{{ getPropertyValueAutocomplete?.length ?? 0 }}</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img class="w-17 h-17" src="/icons/star-icon.png" />
          <img class="w-17 h-17" src="/icons/paper-and-mouse-icon.png" />
          <img class="w-17 h-17" src="/icons/article-icon.png" />
        </div>
      </div>
      <div
        class="relative hover:bg-slate-50 px-2 cursor-pointer rounded"
        @click="onOpenPropertyToolsDropdown"
      >
        <img class="w-17 h-5" src="/icons/three-dots.png" alt="three-dots" />
        <ul
          v-if="openPropertyToolsDropdown"
          class="flex flex-col list-none rounded-lg shadow-2xl px-1.2 py-1.2 bg-white absolute left--14"
        >
          <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
          >
            <img src="/icons/settings-icon.png" />{{
              $t("lang-910d305f-6cda-4bea-9829-3a26101da8a3")
            }}
          </li>
          <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
          >
            <img src="/icons/delete-icon.png" />{{
              $t("lang-4d04ae16-7603-4e88-8a14-bf133f2e2c4a")
            }}
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
      <template v-for="propertyValue in getPropertyValueAutocomplete">
        <div
          v-if="propertyValue.selected"
          class="value d-flex flex-row items-center gap-8"
        >
          <p>{{ propertyValue.value }}</p>
          <SIconRender
            name="CloseRoundIcon"
            color="grey"
            @click="onRemovePropertyValue(propertyValue)"
          />
        </div>
      </template>
      <!-- <div class="value d-flex flex-row items-center gap-8">
        <p>Bosch</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>

      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div> -->
    </div>
    <SModal
      :isModalOpen="showAddPopertyValueModal"
      height="auto"
      @onClose="onCloseShowAddPopertyValueModal"
      :width="'440px'"
    >
      <SInput class="w-p-100" isSearchable />
      <div class="mt-24">
        <div v-for="value in getPropertyValueAutocomplete" class="mb-16">
          <SCheckbox v-model="value.selected">{{ value.value }}</SCheckbox>
        </div>
      </div>
      <SButton
        size="large"
        color="violet"
        class="w-p-100"
        @click="onCloseAddPropertyValueModal"
        >{{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}</SButton
      >
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
import { ref, computed, type PropType, onBeforeMount } from "vue";
import { type IGetMarketplacePropertyAutocomplete } from "@/features/category/add-property/api/add-property.api.types";
import { usePropertyCardListStore } from "../store/property-card-list.store";
import { useCategorySharedStore } from "@/shared/store/category";

const props = defineProps({
  property: {
    type: Object as PropType<IGetMarketplacePropertyAutocomplete>,
    default: "",
  },
});

let hideBody = ref(false);

const categorySharedStore = useCategorySharedStore();

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

const propertyCardListStore = usePropertyCardListStore();

onBeforeMount(async () => {
  propertyCardListStore
    .fetchPropertiesListAutocomplete(props.property.id)
    .then(() => {
      temp.value = propertyCardListStore.getPropertyValueAutocomplete?.map(
        (property) => {
          const res = {
            ...property,
            selected: false,
          };

          return res;
        }
      );
    });
});

const temp = ref();

const getPropertyValueAutocomplete = computed({
  get() {
    return temp.value;
  },
  set(value) {
    temp.value = value;
  },
});

const selectedPropertyValues = computed(() => {
  return getPropertyValueAutocomplete.value?.filter((el) => el.selected);
});

const onShowAddPopertyValue = () => {
  showAddPopertyValueModal.value = true;
};

const onCloseAddPropertyValueModal = () => {
  showAddPopertyValueModal.value = false;

  const selectedPropertyValues = getPropertyValueAutocomplete.value
    .filter((el) => el.selected)
    .map((el) => ({ propertyValueId: el.id }));

  categorySharedStore.setPropertyAllowedValue(
    selectedPropertyValues,
    props.property.id
  );
};

const onRemovePropertyValue = (obj: Object) => {
  const res = getPropertyValueAutocomplete.value.map((el) => {
    if (el.id === obj.id) {
      el.selected = false;
    }
    return el;
  });

  getPropertyValueAutocomplete.value = res;
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
