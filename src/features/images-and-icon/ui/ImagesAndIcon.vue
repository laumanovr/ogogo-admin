<template>
  <p class="font-bold">
    {{ $t("lang-a4cb8b72-591b-4353-a8ac-0a910b6ea90d") }}
  </p>
  <div class="info-text-container">
    <IconRender name="WarningIcon" color="violet-700" />
    <p>{{ $t("lang-1c3dce6e-86b9-4523-a934-b391ddce337b") }}</p>
  </div>

  <div class="add-image-buttons-container">
    <div class="add-image-big-button">
      <img src="../../../shared/ui/assets/plus-icon.png" />
    </div>
    <div class="add-image-small-button">
      <img src="../../../shared/ui/assets/plus-icon.png" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.info-text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #6d28d9;
  gap: 10px;
}

.add-image-buttons-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 40px;
}
.add-image-big-button,
.add-image-small-button {
  width: 310px;
  height: 186px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #0000000a;
  cursor: pointer;
}
.add-image-small-button {
  width: 72px;
  height: 72px;
  border-radius: 8px;
}
</style>
