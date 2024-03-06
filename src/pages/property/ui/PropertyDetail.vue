<template>
  <div class="property-value-container">
    <div class="title-container">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <h2 class="head-title">
        {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }} /
        {{ propertyDetailStore.selectedProperty?.name }}
      </h2>
    </div>
    <div class="actions">
      <SInput isSearchable width="100%" @input="onSearch" />
      <SButton color="violet" @click="onSave">{{
        $t("lang-e11e13e8-1d9c-438a-8be1-27ce3792dbaf")
      }}</SButton>
    </div>
    <PropertyDetailTable ref="propertyDetailTable" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { SButton, SIconRender, SInput } from "@tumarsoft/ogogo-ui";
import { PropertyDetailTable } from "../../../features/property/property-detail";
import { usePropertyDetailStore } from "@/features/property/property-detail/store/property-detail.store";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const propertyDetailStore = usePropertyDetailStore();
const propertyDetailTable = ref(null);
const searchTimer = ref<number>(null);

onMounted(() => {
  if (route.params && route.params.id && typeof route.params.id === "string") {
    propertyDetailStore.fetchPropertyById(route.params.id);
  }
});

const goBack = () => {
  router.push("/property");
};

const onSave = () => {
  propertyDetailTable.value.submitPropertyValues();
};

const onSearch = (e: Event) => {
  window.clearTimeout(searchTimer.value);
  const target = e.target as HTMLInputElement;
  searchTimer.value = window.setTimeout(() => {
    propertyDetailTable.value.searchPropertyValue(target.value);
  }, 1500);
};
</script>

<style lang="scss">
.property-value-container {
  .title-container {
    display: flex;
    align-items: center;

    .head-title {
      margin-left: 24px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .input-container {
      width: 100%;
    }

    .button {
      margin-left: 12px;
      min-width: 120px;
    }
  }
}
</style>
