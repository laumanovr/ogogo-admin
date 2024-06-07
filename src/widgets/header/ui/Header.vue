<template>
  <div class="d-flex flex-row justify-between padding-16-40 s-h-13">
    <img src="/icons/Ogogo-logo.png" alt="ogogo-logo" class="ogogo-img" />

    <div class="header-navigation">
      <div
        @click="onMenuItemChange(MENU_ITEMS.Products)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isProductsActive.substr(6)" :name="'BoxIcon'" />
        <p :class="`${isProductsActive} font-size-12`">
          {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MENU_ITEMS.Stores)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isStoresActive.substr(6)" :name="'ShopIcon'" />
        <p :class="`${isStoresActive} font-size-12`">
          {{ $t("lang-425a5a16-bf0a-4ded-a7bc-cbe7490b659a") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MENU_ITEMS.Category)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isCategoryActive.substr(6)" :name="'GridIcon'" />
        <p :class="`${isCategoryActive} font-size-12`">
          {{ $t("lang-75805fdb-eac2-4c87-b481-563e318789b5") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MENU_ITEMS.Properties)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender
          :color="isPropertyActive.substr(6)"
          :name="'PropertyIcon'"
        />
        <p :class="`${isPropertyActive} font-size-12`">
          {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }}
        </p>
      </div>
      <div class="header-profile d-flex justify-between items-center">
        <div class="profile-block">
          <div class="profile-name">Админ</div>
          <div class="profile-number color-gray-500">{{ userPhone }}</div>
        </div>
        <img
          src=/icons/logout.svg
          alt="logout"
          class="s-ml-4 cursor-pointer"
          @click="logOut"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { MENU_ITEMS } from "@/shared/lib/utils/enums";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";
import { ROUTES } from "@/shared/router/index.type";

const route = useRoute();
const router = useRouter();

const activeButton = ref("");

Object.values(MENU_ITEMS).forEach((item: any) => {
  if (route.path.includes(item)) {
    activeButton.value = item;
  }
});

const isProductsActive = computed(() => {
  return activeButton.value === MENU_ITEMS.Products
    ? "color-violet-700"
    : "gray-400";
});
const isStoresActive = computed(() => {
  return activeButton.value === MENU_ITEMS.Stores
    ? "color-violet-700"
    : "gray-400";
});
const isCategoryActive = computed(() => {
  return activeButton.value === MENU_ITEMS.Category
    ? "color-violet-700"
    : "gray-400";
});
const isPropertyActive = computed(() => {
  return activeButton.value === MENU_ITEMS.Properties
    ? "color-violet-700"
    : "gray-400";
});

const onMenuItemChange = (value: MENU_ITEMS) => {
  router.push("/" + value);
  activeButton.value = value;
}

const authStore = useAuthStore();

const userPhone = computed(() => authStore.getUserProfile.phone);

const logOut = () => {
  authStore.logout().then(() => {
    router.push(ROUTES.login);
  });
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
