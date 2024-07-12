<template>
  <div
    class="comment-block"
    :class="{ rejected: logoStatus === DETAIL_STATUS.READ }"
  >
    <img src="/icons/ava.png" alt="img" class="s-mr-3 comment-icon" />
    <CommentInput
      v-if="logoStatus !== DETAIL_STATUS.READ"
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="logoComment"
      :is-show-actions="false"
      @input="handleUpdateLogoComment($event)"
      @submit="onAddLogoComment"
      @cancel="cancelLogoComment"
    />
    <CommentContainer
      v-else
      :name="shop.moderatorName"
      :date="verifyInfo.moderationResult.logo.validateDateTime"
      :comment="logoComment"
      @edit="editLogoComment"
      @delete="deleteLogoComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { useShopStore } from "@/entities/shop";
import { computed, onBeforeMount } from "vue";
import { CommentInput, CommentContainer } from "@/shared/ui";
import { useShopDetailStore } from "@/pages/shop-detail/store/store";
import { DETAIL_STATUS } from "@/pages/shop-detail/store/types";

const shopStore = useShopStore();
const shopDetailStore = useShopDetailStore();

const shop = computed(() => shopStore.getOpenedShop);
const verifyInfo = computed(() => shopStore.getShopInfoForVerify);
const logoComment = computed(() => {
  return verifyInfo.value.moderationResult?.logo.validationComment ?? null;
});
const logoStatus = computed(() => shopDetailStore.getLogoStatus);

onBeforeMount(() => {
  if (
    shop.value.moderationResult?.logo.validationComment === null ||
    Boolean(!shop.value.moderationResult?.logo.validationComment)
  ) {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.CREATE);
  } else {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.READ);
  }
});

const handleUpdateLogoComment = (value: string) => {
  if (value && value.trim() && logoStatus.value === DETAIL_STATUS.INITIAL) {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.CREATE);
  } else if (
    !value &&
    !value.trim() &&
    logoStatus.value === DETAIL_STATUS.CREATE
  ) {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.INITIAL);
  }
  shopStore.setVerifyInfoLogoComment(value);
};

const cancelLogoComment = () => {
  if (logoStatus.value === DETAIL_STATUS.UPDATE) {
    shopStore.setVerifyInfoLogoComment(
      shop.value.moderationResult.logo.validationComment
    );
    shopDetailStore.setLogoStatus(DETAIL_STATUS.READ);
  } else {
    shopStore.setVerifyInfoLogoComment(null);
    shopDetailStore.setLogoStatus(DETAIL_STATUS.INITIAL);
  }
};

const onAddLogoComment = () => {
  shopStore.verifyShop().then(() => {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.READ);
  });
};

const editLogoComment = () => {
  shopDetailStore.setLogoStatus(DETAIL_STATUS.UPDATE);
};

const deleteLogoComment = () => {
  shopStore.setVerifyInfoLogoComment(null);
  shopStore.verifyShop().then(() => {
    shopDetailStore.setLogoStatus(DETAIL_STATUS.INITIAL);
  });
};
</script>

<style scoped lang="scss">
@import "../../styles.scss";
</style>
