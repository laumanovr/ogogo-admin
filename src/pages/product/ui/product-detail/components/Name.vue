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
      :date="product.validationDetails.fields.name.moderationDate"
      :comment="nameComment"
      @edit="editNameComment"
    />
    <CommentInput
      v-else
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="nameComment"
      :is-show-actions="isShowButtons"
      @input="handleInput"
      @submit="addNameComment"
      @cancel="cancelNameComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { CommentInput, CommentContainer } from "@/shared/ui";
import { useProductStore } from "@/entities/product/store/product.store";

const productStore = useProductStore();
const nameComment = ref("");
const isShowButtons = ref(false);
const hasComment = ref(false);
const product = computed(() => productStore.getSelectedProduct);

onMounted(() => {
  nameComment.value =
    product.value.validationDetails.fields.name.validationComment;
  hasComment.value = Boolean(nameComment.value);
});

const handleInput = (value: string) => {
  nameComment.value = value;
  isShowButtons.value = Boolean(value && value.trim());
};

const addNameComment = () => {
  productStore.setValidationCommentForField(
    "name",
    nameComment.value,
    product.value.id
  );
  hasComment.value = true;
};

const cancelNameComment = () => {
  nameComment.value = "";
  isShowButtons.value = false;
};

const editNameComment = () => {
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
