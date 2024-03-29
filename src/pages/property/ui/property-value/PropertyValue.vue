<template>
  <div class="property-value-container">
    <div class="title-container">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <h2 class="head-title">
        {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }} /
        {{ propertyValueStore.selectedProperty?.name }}
      </h2>
    </div>
    <div class="actions">
      <SInput isSearchable width="100%" @input="onSearch" />
      <SButton color="violet" @click="onSave">{{
        $t("lang-e11e13e8-1d9c-438a-8be1-27ce3792dbaf")
      }}</SButton>
    </div>
    <PropertyValueTable ref="propertyValueTable" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SButton, SIconRender, SInput } from "@tumarsoft/ogogo-ui";
import { PropertyValueTable } from "@/widgets/property-value-table";
import { usePropertyValueStore } from "@/entities/property-value";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";

const router = useRouter();
// const route = useRoute();
const propertyValueStore = usePropertyValueStore();
const propertyValueTable = ref(null);
const searchTimer = ref<number>(null);

// onMounted(() => {
//   if (route.params && route.params.id && typeof route.params.id === "string") {
//     propertyDetailStore.fetchPropertyById(route.params.id);
//   }
// });

const goBack = () => {
  router.push("/property");
};

const onSave = () => {
  propertyValueTable.value.submitPropertyValues();
};

const onSearch = (e: Event) => {
  window.clearTimeout(searchTimer.value);
  const target = e.target as HTMLInputElement;
  searchTimer.value = window.setTimeout(() => {
    propertyValueTable.value.searchPropertyValue(target.value);
  }, 1500);
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
