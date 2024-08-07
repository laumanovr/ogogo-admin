<template>
  <div class="s-flex s-flex-row s-justify-between s-py-4 s-px-5 s-h-13">
    <img src="/icons/Ogogo-logo.png" alt="ogogo-logo" class="ogogo-img" />

    <div class="header-navigation">
      <router-link
        to="/products"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="box"
          :class="[
            route.name === MENU_ITEMS.Products
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MENU_ITEMS.Products
              ? 's-text-violet-700'
              : 's-text-gray-500',
              's-text-body-medium'
          ]"
        >
          {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
        </span>
      </router-link>
      <router-link
        to="/shops"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="shop"
          :class="[
            route.name === MENU_ITEMS.Stores
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MENU_ITEMS.Stores
              ? 's-text-violet-700'
              : 's-text-gray-500',
              's-text-body-medium'
          ]"
        >
          {{ $t("lang-425a5a16-bf0a-4ded-a7bc-cbe7490b659a") }}
        </span>
      </router-link>
      <router-link
        to="/category"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="grid"
          :class="[
            route.name === MENU_ITEMS.Category
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MENU_ITEMS.Category
              ? 's-text-violet-700'
              : 's-text-gray-500',
              's-text-body-medium'
          ]"
        >
          {{ $t("lang-75805fdb-eac2-4c87-b481-563e318789b5") }}
        </span>
      </router-link>
      <router-link
        to="/property"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="cards"
          :class="[
            route.name === MENU_ITEMS.Properties
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MENU_ITEMS.Properties
              ? 's-text-violet-700'
              : 's-text-gray-500',
              's-text-body-medium'
          ]"
        >
          {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }}
        </span>
      </router-link>
      <div class="header-profile s-flex s-justify-between s-items-center">
        <div class="profile-block">
          <div class="profile-name">Админ</div>
          <div class="profile-number s-text-gray-500">{{ userPhone }}</div>
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
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";
import { ROUTES } from "@/shared/router/index.type";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const userPhone = computed(() => authStore.getUserProfile?.phone);

const logOut = () => {
  authStore.logout().then(() => {
    router.push(ROUTES.login);
  });
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
