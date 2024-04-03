<template>
  <div
    class="comment-block"
    :class="{
      rejected: nameStatus === DETAIL_STATUS.READ,
    }"
  >
    <img src="/icons/ava.png" alt="" class="mr-12 comment-icon" />
    <CommentInput
      v-if="nameStatus !== DETAIL_STATUS.READ"
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="nameComment"
      :is-show-actions="isShowActions"
      @input="handleUpdateNameComment($event)"
      @submit="addNameComment"
      @cancel="cancelNameComment"
    />
    <CommentContainer
      v-else
      :name="shop.moderatorName"
      :date="verifyInfo.moderationResult.name.validateDateTime"
      :comment="nameComment"
      @edit="editNameComment"
      @delete="deleteNameComment"
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
const nameComment = computed(
  () => verifyInfo.value.moderationResult?.name.validationComment ?? null
);
const nameStatus = computed(() => shopDetailStore.getNameStatus);

const isShowActions = computed(
  () =>
    (nameStatus.value === DETAIL_STATUS.CREATE ||
      nameStatus.value === DETAIL_STATUS.UPDATE) &&
    Boolean(nameComment.value) &&
    Boolean(nameComment.value?.trim())
);

onBeforeMount(() => {
  if (
    shop.value.moderationResult?.name.validationComment === null ||
    Boolean(!shop.value.moderationResult?.name.validationComment)
  ) {
    shopDetailStore.setNameStatus(DETAIL_STATUS.CREATE);
  } else {
    shopDetailStore.setNameStatus(DETAIL_STATUS.READ);
  }
});

const handleUpdateNameComment = (value: string) => {
  if (value && value.trim() && nameStatus.value === DETAIL_STATUS.INITIAL) {
    shopDetailStore.setNameStatus(DETAIL_STATUS.CREATE);
  } else if (
    !value &&
    !value.trim() &&
    nameStatus.value === DETAIL_STATUS.CREATE
  ) {
    shopDetailStore.setNameStatus(DETAIL_STATUS.INITIAL);
  }
  shopStore.setVerifyInfoNameComment(value);
};

const cancelNameComment = () => {
  if (nameStatus.value === DETAIL_STATUS.UPDATE) {
    shopStore.setVerifyInfoNameComment(
      shop.value.moderationResult.name.validationComment
    );
    shopDetailStore.setNameStatus(DETAIL_STATUS.READ);
  } else {
    shopStore.setVerifyInfoNameComment(null);
    shopDetailStore.setNameStatus(DETAIL_STATUS.INITIAL);
  }
};

const addNameComment = () => {
  shopStore.verifyShop().then(() => {
    shopDetailStore.setNameStatus(DETAIL_STATUS.READ);
  });
};

const editNameComment = () => {
  shopDetailStore.setNameStatus(DETAIL_STATUS.UPDATE);
};

const deleteNameComment = () => {
  shopStore.setVerifyInfoNameComment(null);
  shopStore.verifyShop().then(() => {
    shopDetailStore.setNameStatus(DETAIL_STATUS.INITIAL);
  });
};
</script>

<style scoped lang="scss">
@import "../../styles.scss";
</style>
