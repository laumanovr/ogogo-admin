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
import i18n from "@/shared/lib/plugins/i18n";
import { SButton } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["onClick"]);

const props = defineProps({
  buttonTitle: {
    type: String,
    default: i18n.global.t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4"),
  },
  text: {
    type: String,
    default: i18n.global.t("lang-aff478ae-d0ac-4050-b047-b01b13b8fbd2"),
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
