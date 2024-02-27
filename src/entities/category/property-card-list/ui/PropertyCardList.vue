<template>
  <div class="main-wrapper-property">
    <img
      class="six-dots"
      src="../../../../shared/ui/assets/six-dots-icon.png"
    />
    <div :class="!hideBody ? 'header-property' : 'header-property-closed'">
      <div
        class="left-toolbar d-flex flex-row items-center justify-between gap-15"
      >
        <div class="d-flex flex-row items-center gap-10">
          <SIconRender
            name="ArrowIcon"
            :direction="!hideBody ? 'top' : 'right'"
            @click="onHideBody"
          />
          <p>{{ props.title }}</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img
            class="w-14 h-14"
            src="../../../../shared/ui/assets/tree-icon.png"
          />
          <p>169</p>
          <p>{{ $t("lang-afd3cd36-ac2b-4852-bde7-3d2cb4d7842b") }}</p>
          <p>169</p>
        </div>
        <div class="d-flex flex-row items-center gap-10">
          <img
            class="w-17 h-17"
            src="../../../../shared/ui/assets/star-icon.png"
          />
          <img
            class="w-17 h-17"
            src="../../../../shared/ui/assets/paper-and-mouse-icon.png"
          />
          <img
            class="w-17 h-17"
            src="../../../../shared/ui/assets/article-icon.png"
          />
        </div>
      </div>
      <div
        class="relative hover:bg-slate-50 px-2 cursor-pointer rounded"
        @click="onOpenPropertyToolsDropdown"
      >
        <img
          class="w-17 h-5"
          src="../../../../shared/ui/assets/three-dots.png"
        />
        <ul
          v-if="openPropertyToolsDropdown"
          class="flex flex-col list-none rounded-lg shadow-2xl px-1.2 py-1.2 bg-white absolute left--14"
        >
          <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
          >
            <img src="../../../../shared/ui/assets/settings-icon.png" />{{
              $t("lang-910d305f-6cda-4bea-9829-3a26101da8a3")
            }}
          </li>
          <li
            class="flex gap-4 cursor-pointer hover:bg-slate-50 px-2.5 py-3 rounded"
          >
            <img src="../../../../shared/ui/assets/delete-icon.png" />{{
              $t("lang-4d04ae16-7603-4e88-8a14-bf133f2e2c4a")
            }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!hideBody" class="body d-flex flex-row flex-wrap gap-8">
      <div class="add-value d-flex flex-row items-center gap-10">
        <img src="../../../../shared/ui/assets/plus-icon.png" />
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
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

let hideBody = ref(false);

const onHideBody = () => {
  hideBody.value = !hideBody.value;
};

let openPropertyToolsDropdown = ref(false);

const onOpenPropertyToolsDropdown = () => {
  openPropertyToolsDropdown.value = !openPropertyToolsDropdown.value;
};
</script>
<style scoped lang="scss">
@import "../../../../app/style/colors";
.main-wrapper-property {
  position: relative;
  border-radius: 16px;
  border: 1px solid #dfe1e5;
  margin-top: 24px;
}

.main-wrapper-property {
  border-radius: 16px;
}
.header-property,
.header-property-closed {
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 26px 18px;
  border-bottom: 1px solid #dfe1e5;
}
.header-property-closed {
  border-bottom: none;
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
