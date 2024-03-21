<template>
  <div class="property-container">
    <h2 class="head-title">
      {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }}
    </h2>
    <template v-if="hasData">
      <div class="filter-container">
        <STabs :tab-mode="'filter-tabs'">
          <STabItem value="one" :active-tab="tab" @changeTab="handleTabChange">
            {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }}
          </STabItem>
          <STabItem value="two" :active-tab="tab" @changeTab="handleTabChange">
            {{ $t("lang-62162f8a-3945-4c7f-b4ef-6121d5db1a6b") }}
          </STabItem>
        </STabs>
        <div class="filter-actions">
          <div class="search-input">
            <SInput isSearchable @input="onSearch" />
          </div>
          <div class="icon-border" @click="openFilterModal">
            <SIconRender name="SettingsIcon" />
          </div>
          <SButton size="medium" color="violet" @click="onSubmit">
            {{ $t("lang-e11e13e8-1d9c-438a-8be1-27ce3792dbaf") }}
          </SButton>
        </div>
      </div>
      <div class="table-container">
        <STabWindow value="one" :active-tab="tab">
          <PropertyTable ref="propertyTable" />
        </STabWindow>
        <STabWindow value="two" :active-tab="tab">
          <PropertyGroupTable ref="propertyGroupTable" />
        </STabWindow>
      </div>
      <FilterModal ref="filterModal" />
    </template>
    <template v-else>
      <EmptyData
        :buttonTitle="$t('lang-1d55fd08-eaa6-4b4b-84b9-225f2d0dc1ad')"
        @onClick="addData"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  SButton,
  STabs,
  STabItem,
  STabWindow,
  SIconRender,
  SInput,
} from "@tumarsoft/ogogo-ui";
import { ref, onMounted } from "vue";
import { PropertyTable, usePropertyStore } from "@/widgets/property";
import { PropertyGroupTable } from "@/widgets/property-group";
import { EmptyData } from "@/shared/ui";
import { FilterModal } from "@/shared/ui";
import { SortDirectionEnum } from "@/shared/api/api.types";

const propertyStore = usePropertyStore();
const tab = ref("one");
const filterModal = ref(null);
const propertyTable = ref(null);
const propertyGroupTable = ref(null);
const hasData = ref(false);
const searchTimer = ref<number>(null);

onMounted(() => {
  propertyStore
    .fetchPropertyList({
      pageSize: 500,
      sortDirection: SortDirectionEnum.ASCENDING,
      pageIndex: 0,
    })
    .then(() => {
      hasData.value = propertyStore.propertyList.length > 0;
    });
});

const handleTabChange = (newTab: string) => {
  tab.value = newTab;
};

const addData = () => {
  hasData.value = true;
};

const openFilterModal = () => {
  filterModal.value.toggleFilterModal();
};

const onSearch = (e: Event) => {
  clearTimeout(searchTimer.value);
  const target = e.target as HTMLInputElement;
  searchTimer.value = window.setTimeout(() => {
    if (tab.value === "one") {
      propertyTable.value.searchProperty(target.value);
    } else {
      propertyGroupTable.value.searchGroupProperty(target.value);
    }
  }, 1500);
};

const onSubmit = () => {
  if (tab.value === "one") {
    propertyTable.value.submitProperty();
  } else {
    propertyGroupTable.value.submitGroupProperty();
  }
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
