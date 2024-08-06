<template>
  <div class="shop-detail-container" v-if="!stateload">
    <SLoader v-if="isLoading" />
    <div class="top-block light">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" class="s-text-gray-500" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="shop-title">
        <img :src="logo" alt="" class="sm-img s-mr-2" />
        {{ shopName }}
      </div>
    </div>
    <StatusBadge
      :status="verificationStatus"
      :status-text="activeStatusText"
      :description="activeDescriptionBadge"
    />
    <h2 class="s-text-title-1 s-mb-6 s-mt-6">
      {{ $t("lang-2c57a873-df1a-437e-a38b-2a0772342fc4") }}
    </h2>
    <div class="shop-logo-block">
      <div class="d-flex items-center">
        <img :src="logo" alt="logo" class="logo s-mr-5" />
        <div class="logo-title">{{ logoName }}</div>
      </div>
      <Logo v-if="pendingOrRejected" />
    </div>
    <div class="shop-name-block s-mt-7">
      <div>
        <SInput
          :label="$t('lang-83ea23b9-0c12-4c48-a823-39cbc73f7219')"
          width="100%"
          readonly
          hide-details
          :modelValue="shopName"
        />
      </div>
      <Name v-if="pendingOrRejected" />
    </div>
    <div class="description-block s-mt-7">
      <div>
        <STextArea
          :label="$t('lang-b1c420fe-8beb-4452-bf7c-165f69e8eabf')"
          width="100%"
          height="150px"
          readonly
          hide-details
          :modelValue="description"
        />
      </div>
      <Description v-if="pendingOrRejected" />
    </div>
    <div
      class="d-flex s-mt-8 actions light"
      v-if="verificationStatus === PRODUCT_VERIFICATION_STATUS.PENDING"
    >
      <SButton @click="verifyShop" size="large" class="s-mr-2">
        {{ $t("lang-12fe79b5-20d2-4f2f-90a4-58ce16506ba3") }}
      </SButton>
      <SButton @click="rejectShop" size="large" type="secondary">
        {{ $t("lang-4d92287d-f47c-47a1-80c1-3eb9f68352d4") }}
      </SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PRODUCT_VERIFICATION_STATUS, useShopStore } from "@/entities/shop";
import {
  SButton,
  SInput,
  STextArea,
  SIconRender,
  SLoader,
} from "@tumarsoft/ogogo-ui";
import { computed, onBeforeMount, watch, onBeforeUnmount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoaderStore } from "@/shared/store/loader";
import { Logo, Name, Description, StatusBadge } from "./components";
import { ROUTES } from "@/shared/router/index.type";
import { useI18n } from "vue-i18n";
import { useShopDetailStore } from "../store/store";

const router = useRouter();
const route = useRoute();
const shopStore = useShopStore();
const shopDetailStore = useShopDetailStore();
const loaderStore = useLoaderStore();
const isLoading = ref(false);
const { t } = useI18n();
const stateload = computed(() => loaderStore.isLoading);
const id = computed(() => route.params.id as string);

const fetchShopById = () => {
  isLoading.value = true;
  shopStore.fetchShopById(id.value).finally(() => {
    isLoading.value = false;
  });
};

onBeforeMount(fetchShopById);

onBeforeUnmount(() => {
  shopStore.$reset();
  shopDetailStore.setVerifiedOrRejectedStatusBadge(false);
});

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

const pendingOrRejected = computed(
  () =>
    verificationStatus.value === PRODUCT_VERIFICATION_STATUS.PENDING ||
    verificationStatus.value === PRODUCT_VERIFICATION_STATUS.REJECTED
);

const verifyShop = () => {
  isLoading.value = true;
  shopDetailStore.setVerifiedOrRejectedStatusBadge(true);
  shopStore.verifyShop().finally(() => {
    isLoading.value = false;
  });
};

const rejectShop = () => {
  isLoading.value = true;
  shopDetailStore.setVerifiedOrRejectedStatusBadge(true);
  shopStore.rejectShop().finally(() => {
    isLoading.value = false;
  });
};

const activeStatusText = computed(() => {
  if (verificationStatus.value === PRODUCT_VERIFICATION_STATUS.ACCEPTED) {
    return t("lang-36f1d867-e30c-411d-b31f-97143d9adf44");
  } else if (
    verificationStatus.value === PRODUCT_VERIFICATION_STATUS.REJECTED
  ) {
    return t("lang-d77a8c0b-cf4a-488a-a6f0-026716359bd7");
  }
});

const activeDescriptionBadge = computed(() => {
  if (verificationStatus.value === PRODUCT_VERIFICATION_STATUS.REJECTED) {
    return t("lang-ae2d0a7b-4d85-4fbc-ad1d-50d61a1012b3");
  } else if (
    verificationStatus.value === PRODUCT_VERIFICATION_STATUS.ACCEPTED
  ) {
    return t("lang-cddb45b5-eff8-43d2-815e-4869a7603c04");
  }
});
</script>

<style scoped lang="scss">
@import "styles";
</style>
