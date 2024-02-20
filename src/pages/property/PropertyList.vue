<template>
  <div class="property-container">
    <h2 class="head-title">Свойства</h2>
    <template v-if="hasData">
      <div class="filter-container">
        <STabs :tab-mode="'filter-tabs'">
          <STabItem value="one" :active-tab="tab" @changeTab="handleTabChange">Свойства</STabItem>
          <STabItem value="two" :active-tab="tab" @changeTab="handleTabChange">Группы свойств</STabItem>
        </STabs>
        <div class="filter-actions">
          <div class="search-input">
            <SInput isSearchable/>
          </div>
          <div class="icon-border" @click="openFilterModal">
            <SIconRender name="SettingsIcon"/>
          </div>
          <SButton size="medium" color="violet" @click="onSubmit">Сохранить</SButton>
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
      <EmptyData buttonTitle="Добавить свойство" @onClick="addData"/>
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