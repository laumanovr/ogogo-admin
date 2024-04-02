<template>
  <div class="container">
    <div class="info">
      <span class="name">{{ props.name }}</span>
      <span class="date">{{ props.date }}</span>
    </div>
    <div class="comment-body">{{ props.comment }}</div>
    <div class="btn-group">
      <span class="btn" @click="onEdit">{{
        $t("lang-86a84b88-d2ec-4791-b06f-ca4d6aa58a4f")
      }}</span>
      <span class="btn" @delete="onDelete">{{
        $t("lang-490771e8-1e16-4c61-b9f9-7e962ec4309b")
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
});

const emit = defineEmits(["edit", "delete"]);

const onEdit = () => {
  emit("edit");
};

const onDelete = () => {
  emit("delete");
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
