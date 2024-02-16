<template>
  <div class="main-wrapper-property">
    <img class="six-dots" src="../../shared/ui/assets/six-dots-icon.png" />
    <div class="header-property">
      <div
        class="left-toolbar d-flex flex-row items-center justify-between gap-15"
      >
        <div class="d-flex flex-row items-center gap-10">
          <SIconRender name="ArrowIcon" direction="top" />
          <p>{{ props.title }}</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img class="w-14 h-14" src="../../shared/ui/assets/tree-icon.png" />
          <p>169</p>
          <p>{{ $t("lang-afd3cd36-ac2b-4852-bde7-3d2cb4d7842b") }}</p>
          <p>169</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img class="w-17 h-17" src="../../shared/ui/assets/star-icon.png" />
          <img
            class="w-17 h-17"
            src="../../shared/ui/assets/paper-and-mouse-icon.png"
          />
          <img
            class="w-17 h-17"
            src="../../shared/ui/assets/article-icon.png"
          />
        </div>
      </div>
      <img class="w-17 h-5" src="../../shared/ui/assets/three-dots.png" />
    </div>
    <img />
    <div class="body d-flex flex-row flex-wrap gap-8">
      <div class="add-value d-flex flex-row items-center gap-10">
        <img src="../../shared/ui/assets/plus-icon.png" />
        <p>{{ $t("lang-614cdebf-5132-4c67-b75c-767d3f711423") }}</p>
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Apple</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Bosch</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>

      <div class="value d-flex flex-row items-center gap-8">
        <p>Electronic</p>
        <SIconRender name="CloseRoundIcon" color="grey" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<style scoped lang="scss">
@import "../../app/style/colors";
.main-wrapper-property {
  position: relative;
  border-radius: 16px;
  border: 1px solid #dfe1e5;
  margin-top: 24px;
}

.main-wrapper-property {
  border-radius: 16px;
}
.header-property {
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 26px 18px;
  border-bottom: 1px solid #dfe1e5;
}
.body {
  padding: 16px;
}
.add-value {
  width: auto;
  padding: 14px 20px;
  border-radius: 384px;
  background-color: $violet-600;
  color: $white;
}
.value {
  width: auto;
  padding: 14px 20px;
  border-radius: 384px;
  background-color: $white;
  border: 1px solid #dfe1e5;
}

.six-dots {
  position: absolute;
  left: -22px;
  top: 10%;
}
</style>
