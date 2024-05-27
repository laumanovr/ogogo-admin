<template>
  <div class="comment-block d-flex w-p-100" :class="{ 'bg-gray': hasComment }">
    <img
      src="/icons/ogogo-ava.svg"
      alt=""
      class="mr-12 comment-icon w-40 h-40"
    />
    <CommentContainer
      v-if="hasComment"
      :name="'Админ'"
      :date="getDate()"
      :comment="commentValue"
      @edit="editComment"
    />
    <CommentInput
      v-else
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="commentValue"
      :is-show-actions="isShowButtons"
      @input="handleInput"
      @submit="setComment"
      @cancel="cancelComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { CommentInput, CommentContainer } from "@/shared/ui";
import { useProductStore } from "@/entities/product/store/product.store";
import moment from "moment";

const productStore = useProductStore();
const commentValue = ref("");
const isShowButtons = ref(false);
const hasComment = ref(false);
const product = computed(() => productStore.getSelectedProduct);

onMounted(() => {
  commentValue.value =
    product.value.validationDetails.fields.price?.validationComment;
  hasComment.value = Boolean(commentValue.value);
});

const handleInput = (value: string) => {
  commentValue.value = value;
  isShowButtons.value = Boolean(value && value.trim());
};

const getDate = () => {
  let commentDate =
    product.value.validationDetails.fields.price?.moderationDate || "";
  return Boolean(commentDate)
    ? commentDate
    : moment(new Date()).format("YYYY-MM-DD HH:mm");
};

const setComment = () => {
  productStore.setValidationCommentForField(
    "price",
    commentValue.value,
    product.value.id
  );
  hasComment.value = true;
};

const cancelComment = () => {
  commentValue.value = "";
  isShowButtons.value = false;
};

const editComment = () => {
  hasComment.value = false;
};
</script>

<style lang="scss">
@import "../../../../../app/styles/colors.scss";
.comment-block {
  &.bg-gray {
    background: $gray-50;
    border-radius: 8px;
    padding: 5px;
  }
}
</style>
