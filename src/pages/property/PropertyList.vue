<template>
  <div class="property-container">
    <h2 class="head-title">{{ $t('lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2') }}</h2>
    <template v-if="hasData">
      <div class="filter-container">
        <STabs :tab-mode="'filter-tabs'">
          <STabItem value="one" :active-tab="tab" @changeTab="handleTabChange">
            {{ $t('lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2') }}
          </STabItem>
          <STabItem value="two" :active-tab="tab" @changeTab="handleTabChange">
            {{ $t('lang-62162f8a-3945-4c7f-b4ef-6121d5db1a6b') }}
          </STabItem>
        </STabs>
        <div class="filter-actions">
          <div class="search-input">
            <SInput isSearchable/>
          </div>
          <div class="icon-border" @click="openFilterModal">
            <SIconRender name="SettingsIcon"/>
          </div>
          <SButton size="medium" color="violet" @click="onSubmit">
            {{ $t('lang-e11e13e8-1d9c-438a-8be1-27ce3792dbaf') }}
          </SButton>
        </div>
      </div>
      <div class="table-container">
        <STabWindow value="one" :active-tab="tab">
          <PropertyTable ref="propertyTable"/>
        </STabWindow>
        <STabWindow value="two" :active-tab="tab">
          <GroupPropertyTable ref="groupPropertyTable"/>
        </STabWindow>
      </div>
      <FilterModal ref="filterModal"/>
    </template>
    <template v-else>
      <EmptyData :buttonTitle="$t('lang-1d55fd08-eaa6-4b4b-84b9-225f2d0dc1ad')" @onClick="addData"/>
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
import { ref } from "vue";
import PropertyTable from "../../features/property/property-list/PropertyTable.vue";
import GroupPropertyTable from "../../features/property/property-list/GroupPropertyTable.vue";
import EmptyData from "../../features/EmptyData.vue";
import FilterModal from "../../features/property/property-list/FilterModal.vue";

const tab = ref("one");
const filterModal = ref(null);
const propertyTable = ref(null);
const groupPropertyTable = ref(null);
const hasData = ref(false);

const handleTabChange = (newTab) => {
  tab.value = newTab;
};

const addData = () => {
  hasData.value = true;
}

const openFilterModal = () => {
  filterModal.value.toggleFilterModal();
};

const onSubmit = () => {
  if (tab.value === "one") {
    propertyTable.value.submitProperty();
  } else {
    groupPropertyTable.value.submitGroupProperty();
  }
};
</script>

<style lang="scss">
@import "../../app/style/colors";

.property-container {
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .filter-actions {
      display: flex;
      align-items: center;
    }

    .icon-border {
      border: 1px solid $gray-200;
      border-radius: 8px;
      padding: 10px 11px 8px;
      margin: 0 12px;
    }

    .search-input {

    }
  }
}
</style>