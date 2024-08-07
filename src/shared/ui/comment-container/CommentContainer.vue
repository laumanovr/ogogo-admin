<template>
  <div class="container">
    <div class="info">
      <span class="name">{{ props.name }}</span>
      <span class="date">{{ formatDate(props.date) }}</span>
    </div>
    <div class="comment-body">{{ props.comment }}</div>
    <div class="btn-group" v-if="props.isPending">
      <span class="btn" @click="onEdit">
        {{ $t("lang-86a84b88-d2ec-4791-b06f-ca4d6aa58a4f") }}
      </span>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
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
