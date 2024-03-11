<template>
  <component :is="currentComponent">
    <Loader v-if="loaderStore.isLoading" />
    <SToaster ref="toaster" />
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Layout from "@/shared/ui/layouts/Layout.vue";
import Empty from "@/shared/ui/layouts/Empty.vue";
import Loader from "@/entities/Loader.vue";
import { shallowRef, ref, watch } from "vue";
import { SToaster } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { useRoute } from "vue-router";
import { getItem } from "@/shared/lib/utils/persistanceStorage";

const alertStore = useAlertStore();
const loaderStore = useLoaderStore();
const toaster = ref(null);
// const isLoggedIn = true;

const currentComponent = shallowRef(Empty);

const route = useRoute();

watch(
  () => route.path,
  () => {
    if (Boolean(getItem("sessionId") && route.path !== "/")) {
      currentComponent.value = Layout;
    } else {
      currentComponent.value = Empty;
    }
  }
);

watch(
  () => alertStore.successMessage,
  (newValue: any) => {
    if (newValue) {
      toaster.value.showSuccess(newValue);
    }
  }
);

watch(
  () => alertStore.errorMessage,
  (newValue: any) => {
    if (newValue) {
      toaster.value.showError(newValue);
    }
  }
);

watch(
  () => alertStore.infoMessage,
  (newValue: any) => {
    if (newValue) {
      toaster.value.showInfo(newValue);
    }
  }
);
</script>
