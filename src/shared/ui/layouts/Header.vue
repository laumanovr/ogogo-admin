<template>
  <div class="d-flex flex-row justify-between padding-16-40 h-80">
    <img src="../../ui/assets/Ogogo-logo.png" class="ogogo-img"/>

    <div class="header-navigation">
      <div
          @click="onMenuItemChange(MenuItems.Products)"
          class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isProductsActive.substr(6)" :name="'BoxIcon'"/>
        <p :class="`${isProductsActive} font-size-12`">
          {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
        </p>
      </div>
      <div
          @click="onMenuItemChange(MenuItems.Stores)"
          class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isStoresActive.substr(6)" :name="'ShopIcon'"/>
        <p :class="`${isStoresActive} font-size-12`">
          {{ $t("lang-425a5a16-bf0a-4ded-a7bc-cbe7490b659a") }}
        </p>
      </div>
      <div
          @click="onMenuItemChange(MenuItems.Category)"
          class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isCategoryActive.substr(6)" :name="'GridIcon'"/>
        <p :class="`${isCategoryActive} font-size-12`">
          {{ $t("lang-75805fdb-eac2-4c87-b481-563e318789b5") }}
        </p>
      </div>
      <div
          @click="onMenuItemChange(MenuItems.Properties)"
          class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender :color="isPropertyActive.substr(6)" :name="'PropertyIcon'"/>
        <p :class="`${isPropertyActive} font-size-12`">
          {{ $t("lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2") }}
        </p>
      </div>
      <div class="header-profile d-flex justify-between items-center">
        <div class="profile-block">
          <div class="profile-name">Админ</div>
          <div class="profile-number color-gray-500">+996777446688</div>
        </div>
        <img src="../../ui/assets/logout.svg" alt="logout" class="ml-20 cursor-pointer" @click="logOut">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { MenuItems } from "@/shared/lib/utils/enums";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeButton = ref("");

Object.values(MenuItems).forEach((item: any) => {
  if (route.path.includes(item)) {
    activeButton.value = item;
  }
});

const isProductsActive = computed(() => {
  return activeButton.value === MenuItems.Products ? "color-violet-700" : "gray-400";
});
const isStoresActive = computed(() => {
  return activeButton.value === MenuItems.Stores ? "color-violet-700" : "gray-400";
});
const isCategoryActive = computed(() => {
  return activeButton.value === MenuItems.Category ? "color-violet-700" : "gray-400";
});
const isPropertyActive = computed(() => {
  return activeButton.value === MenuItems.Properties ? "color-violet-700" : "gray-400";
});

function onMenuItemChange(value: MenuItems) {
  if (value === MenuItems.Category) {
    router.push("/" + value + "/" + "empty");
  } else {
    router.push("/" + value);
  }

  activeButton.value = value;
}

const logOut = () => {
  router.push("/");
}
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
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
  align-items: center;
  gap: 30px;
  .header-profile {
    background: $gray-150;
    padding: 4px 12px;
    border-radius: 8px;
    .profile-name {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 3px;
    }
    .profile-number {
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
