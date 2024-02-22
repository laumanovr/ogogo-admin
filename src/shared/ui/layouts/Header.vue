<template>
  <div class="d-flex flex-row justify-between padding-16-40 h-80">
    <img src="../../ui/assets/Ogogo-logo.png" class="ogogo-img" />

    <div class="header-navigation">
      <div
        @click="onMenuItemChange(MenuItems.Products)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isProductsActive" :name="'BoxIcon'" />
        <p :class="`text-${isProductsActive} font-size-12`">
          {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MenuItems.Stores)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isStoresActive" :name="'ShopIcon'" />
        <p :class="`text-${isStoresActive} font-size-12`">
          {{ $t("lang-425a5a16-bf0a-4ded-a7bc-cbe7490b659a") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MenuItems.Category)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isCategoryActive" :name="'GridIcon'" />
        <!-- <img src="../../ui/assets/Grid.png" /> -->
        <p :class="`text-${isCategoryActive} font-size-12`">
          {{ $t("lang-75805fdb-eac2-4c87-b481-563e318789b5") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { MenuItems } from "@/shared/lib/utils/enums";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const activeButton = ref(null);

// const route = useRoute();
const router = useRouter();

const isProductsActive = computed(() => {
  return activeButton.value === MenuItems.Products ? "violet-700" : "gray-400";
});
const isStoresActive = computed(() => {
  return activeButton.value === MenuItems.Stores ? "violet-700" : "gray-400";
});
const isCategoryActive = computed(() => {
  return activeButton.value === MenuItems.Category ? "violet-700" : "gray-400";
});

function onMenuItemChange(value: MenuItems) {
  if (value === MenuItems.Category) {
    router.push("/" + value + "/" + "empty");
  } else {
    router.push("/" + value);
  }

  activeButton.value = value;
}
</script>

<style>
.header {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 40px;
}
.ogogo-img {
  width: 180px;
  height: 48px;
}
.header-navigation {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>
