<template>
  <div class="empty-container">
    <div class="empty-action">
      <img src="../app/assets/img/empty-folder.svg" alt="empty">
      <p>{{props.text}}</p>
      <Button size="large" color="violet" @click="addData">+ {{props.buttonTitle}}</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "/node_modules/ogogo-uikit/src/components/SButton/SButton.vue";

const emit = defineEmits(['onClick']);

const props = defineProps({
  buttonTitle: {
    type: String,
    default: "Добавить"
  },
  text: {
    type: String,
    default: "Здесь пока пусто, добавьте свойство"
  }
});

const addData = () => {
  emit('onClick')
}
</script>

<style lang="scss">
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