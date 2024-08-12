<template>
  <div class="comment-input">
    <SInput
      :placeHolder="props.placeholder"
      :model-value="props.comment"
      @input="onInput"
      hide-details
    />
    <div class="comment-input-actions" v-show="isShowActions">
      <SButton size="small" @click="onSubmit">
        {{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}
      </SButton>
      <SButton type="secondary" size="small" @click="onCancel">
        {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
      </SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton } from "@tumarsoft/ogogo-ui";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  isShowActions: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "input", "cancel"]);

const onSubmit = () => {
  emit("submit", props.comment);
};
const onCancel = () => {
  emit("cancel");
};
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
