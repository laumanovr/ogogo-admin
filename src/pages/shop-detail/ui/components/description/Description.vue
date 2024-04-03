<template>
  <div
    class="comment-block"
    :class="{
      rejected: descriptionStatus === DETAIL_STATUS.READ,
    }"
  >
    <img src="/icons/ava.png" alt="" class="mr-12 comment-icon" />
    <CommentInput
      v-if="descriptionStatus !== DETAIL_STATUS.READ"
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="descriptionComment"
      :is-show-actions="isShowActions"
      @input="handleUpdateDescriptionComment($event)"
      @submit="onAddDescriptionComment"
      @cancel="cancelDescriptionComment"
    />
    <CommentContainer
      v-else
      :name="shop.moderatorName"
      :date="verifyInfo.moderationResult.description.validateDateTime"
      :comment="descriptionComment"
      @edit="editDescriptionComment"
      @delete="deleteDescriptionComment"
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
const descriptionComment = computed(
  () => verifyInfo.value.moderationResult?.description.validationComment ?? null
);
const descriptionStatus = computed(() => shopDetailStore.getDescriptionStatus);

const isShowActions = computed(
  () =>
    (descriptionStatus.value === DETAIL_STATUS.CREATE ||
      descriptionStatus.value === DETAIL_STATUS.UPDATE) &&
    Boolean(descriptionComment.value) &&
    Boolean(descriptionComment.value?.trim())
);

onBeforeMount(() => {
  if (
    shop.value.moderationResult?.description.validationComment === null ||
    Boolean(!shop.value.moderationResult?.description.validationComment)
  ) {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.CREATE);
  } else {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.READ);
  }
});

const handleUpdateDescriptionComment = (value: string) => {
  if (
    value &&
    value.trim() &&
    descriptionStatus.value === DETAIL_STATUS.INITIAL
  ) {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.CREATE);
  } else if (
    !value &&
    !value.trim() &&
    descriptionStatus.value === DETAIL_STATUS.CREATE
  ) {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.INITIAL);
  }
  shopStore.setVerifyInfoDescriptionComment(value);
};

const cancelDescriptionComment = () => {
  if (descriptionStatus.value === DETAIL_STATUS.UPDATE) {
    shopStore.setVerifyInfoDescriptionComment(
      shop.value.moderationResult.description.validationComment
    );
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.READ);
  } else {
    shopStore.setVerifyInfoDescriptionComment(null);
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.INITIAL);
  }
};

const onAddDescriptionComment = () => {
  shopStore.verifyShop().then(() => {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.READ);
  });
};

const editDescriptionComment = () => {
  shopDetailStore.setDescriptionStatus(DETAIL_STATUS.UPDATE);
};

const deleteDescriptionComment = () => {
  shopStore.setVerifyInfoDescriptionComment(null);
  shopStore.verifyShop().then(() => {
    shopDetailStore.setDescriptionStatus(DETAIL_STATUS.INITIAL);
  });
};
</script>

<style scoped lang="scss">
@import "../../styles.scss";
</style>
