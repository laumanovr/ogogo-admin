<template>
  <div class="empty-container">
    <div class="empty-action">
      <img src="/icons/empty-folder.svg" alt="empty" />
      <p>{{ props.text }}</p>
      <div>
        <SButton size="large" @click="addData">
          + {{ props.buttonTitle }}
        </SButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["onClick"]);

const props = defineProps({
  buttonTitle: {
    type: String,
    default: "Добавить",
  },
  text: {
    type: String,
    default: "Здесь пока пусто, добавьте свойство",
  },
});

const addData = () => {
  emit("onClick");
};
</script>

<style scoped lang="scss">
.empty-container {
  margin-top: 40px;
  text-align: center;
  display: flex;
  justify-content: center;

  .button {
    margin: 0 auto;
  }

  p {
    margin: 24px 0;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
