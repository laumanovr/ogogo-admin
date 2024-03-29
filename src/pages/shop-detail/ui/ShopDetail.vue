<template>
  <div class="shop-detail-container" v-if="!stateload">
    <div class="top-block">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="shop-title">
        <img :src="logo" alt="" class="sm-img mr-8" />
        {{ shopName }}
      </div>
    </div>
    <StatusBadge
      v-if="
        verificationStatus === PRODUCT_VERIFICATION_STATUS.UNVERIFIED ||
        verificationStatus === PRODUCT_VERIFICATION_STATUS.VERIFIED
      "
    />
    <!-- :status="shopStatus"
    :text="shopStatusText" -->
    <h2 class="head-title md">
      {{ $t("lang-2c57a873-df1a-437e-a38b-2a0772342fc4") }}
    </h2>
    <div class="shop-logo-block">
      <div class="d-flex items-center">
        <img :src="logo" alt="logo" class="logo mr-24" />
        <div class="logo-title">{{ logoName }}</div>
      </div>
      <Logo />
    </div>
    <div class="shop-name-block mt-32">
      <div>
        <SInput
          :label="$t('lang-83ea23b9-0c12-4c48-a823-39cbc73f7219')"
          width="100%"
          disabled
          :modelValue="shopName"
        />
      </div>
      <Name />
    </div>
    <div class="description-block mt-32">
      <div>
        <STextArea
          :label="$t('lang-b1c420fe-8beb-4452-bf7c-165f69e8eabf')"
          width="100%"
          height="150px"
          disabled
          :modelValue="description"
        />
      </div>
      <Description />
    </div>
    <div class="d-flex mt-40 actions">
      <SButton @click="verifyShop" size="large" color="violet" class="mr-8">{{
        $t("lang-12fe79b5-20d2-4f2f-90a4-58ce16506ba3")
      }}</SButton>
      <SButton @click="verifyShop" size="large" color="gray">{{
        $t("lang-4d92287d-f47c-47a1-80c1-3eb9f68352d4")
      }}</SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PRODUCT_VERIFICATION_STATUS, useShopStore } from "@/entities/shop";
import { SButton, SInput, STextArea, SIconRender } from "@tumarsoft/ogogo-ui";
import { computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoaderStore } from "@/shared/store/loader";
import { Logo, Name, Description, StatusBadge } from "./components";
import { ROUTES } from "@/shared/router/index.type";

const router = useRouter();
const route = useRoute();
const shopStore = useShopStore();
const loaderStore = useLoaderStore();

const stateload = computed(() => loaderStore.isLoading);

const id = computed(() => route.params.id as string);

const fetchShopById = () => {
  shopStore.fetchShopById(id.value);
};

onBeforeMount(fetchShopById);

watch(id, fetchShopById);

const goBack = () => {
  router.push(ROUTES.shops);
};

const shop = computed(() => shopStore.getOpenedShop);
const logo = computed(() => shop.value.logoBase64);
const shopName = computed(() => shop.value.name);
const description = computed(() => shop.value.description);
const logoName = computed(() => shop.value.logoFileName);

const verificationStatus = computed(() => shop.value.verificationStatus);
const verifyShop = () => {
  shopStore.verifyShop();
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
