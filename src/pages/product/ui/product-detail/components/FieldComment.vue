<template>
  <div class="comment-block s-flex s-w-full" :class="{ 'bg-gray': hasComment }">
    <img
      src="/icons/ogogo-ava.svg"
      alt=""
      class="s-mr-3 comment-icon s-w-8 s-h-8"
    />
    <CommentContainer
      v-if="hasComment"
      :name="'Админ'"
      :date="getDate()"
      :comment="commentValue"
      :isPending="props.isPending"
      @edit="editComment"
    />
    <CommentInput
      v-if="!hasComment && props.isPending"
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
import { ValidationField } from "@/entities/product";

const props = defineProps({
  fieldName: {
    type: String,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
});

const productStore = useProductStore();
const commentValue = ref("");
const isShowButtons = ref(false);
const hasComment = ref(false);
const product = computed(() => productStore.getSelectedProduct);

onMounted(() => {
  commentValue.value =
    product.value.validationDetails.fields[
      props.fieldName as keyof ValidationField
    ]?.validationComment;
  hasComment.value = Boolean(commentValue.value);
});

const handleInput = (value: string) => {
  commentValue.value = value;
  isShowButtons.value = Boolean(value && value.trim());
};

const getDate = () => {
  let commentDate =
    product.value.validationDetails.fields[
      props.fieldName as keyof ValidationField
    ]?.moderationDate || "";
  return Boolean(commentDate)
    ? commentDate
    : moment(new Date()).format("YYYY-MM-DD HH:mm");
};

const setComment = () => {
  productStore.setFieldComment(
    props.fieldName as keyof ValidationField,
    commentValue.value
  );
  hasComment.value = true;
};

const cancelComment = () => {
  isShowButtons.value = false;
};

const editComment = () => {
  hasComment.value = false;
};
</script>

<style lang="scss" scoped>
@import "../../../../../app/styles/colors.scss";
.comment-block {
  &.bg-gray {
    background: $gray-50;
    border-radius: 8px;
    padding: 5px;
  }
}
</style>
