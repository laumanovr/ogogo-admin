<template>
  <div
    class="comment-block d-flex w-p-100"
    :class="{
      rejected: false,
    }"
  >
    <img src="/icons/ava.png" alt="" class="mr-12 comment-icon w-40 h-40" />
    <CommentInput
      v-if="true"
      :placeholder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
      :comment="nameComment"
      :is-show-actions="isShowButtons"
      @input="handleInput"
      @submit="addNameComment"
      @cancel="cancelNameComment"
    />
    <CommentContainer
      v-else
      :name="'moder-name'"
      :date="'01-01-2024'"
      :comment="nameComment"
      @edit="editNameComment"
      @delete="deleteNameComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { CommentInput, CommentContainer } from "@/shared/ui";
import { useProductStore } from "@/entities/product/store/product.store";

const productStore = useProductStore();
const nameComment = ref("");
const isShowButtons = ref(false);

const handleInput = (value: string) => {
  nameComment.value = value;
  isShowButtons.value = Boolean(value && value.trim());
};

const addNameComment = () => {
  console.log(nameComment.value);
  productStore.saveValidationCommentForField("productName", nameComment.value);
};

const cancelNameComment = () => {
  nameComment.value = "";
  isShowButtons.value = false;
};

const editNameComment = () => {};

const deleteNameComment = () => {};
</script>
