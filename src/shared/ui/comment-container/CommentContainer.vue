<template>
  <div class="container">
    <div class="info">
      <span class="name">{{ props.name }}</span>
      <span class="date">{{ formatDate(props.date) }}</span>
    </div>
    <div class="comment-body">{{ props.comment }}</div>
    <SButton
      type="text"
      size="small"
      class="btn"
      @click="onEdit"
      v-if="props.isPending"
    >
      {{ $t("lang-86a84b88-d2ec-4791-b06f-ca4d6aa58a4f") }}
    </SButton>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
import moment from "moment";

const props = defineProps({
  comment: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  isPending: {
    type: Boolean,
    default: false,
  },
});

const formatDate = (date: string) => {
  return moment(date).format("D MMMM YYYY HH:mm");
};

const emit = defineEmits(["edit", "delete"]);

const onEdit = () => {
  emit("edit");
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
