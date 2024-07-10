<template>
  <component :is="currentComponent">
    <Loader v-if="loaderStore.isLoading" />
    <SToaster ref="toaster" position="top-center" />
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import { Layout, Empty } from "@/shared/layouts";
import { Loader } from "@/shared/ui";
import { ref, watch, computed } from "vue";
import { SToaster } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { useRoute } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";
import { useAuthStore } from "@/shared/store/auth";
import { Nullable } from "@/shared/lib/utils/nullable";

type Toaster = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
};

const alertStore = useAlertStore();
const loaderStore = useLoaderStore();
const authStore = useAuthStore();
const route = useRoute();
const toaster = ref<Nullable<Toaster>>(null);

const currentComponent = computed(() => {
  if (route.path !== ROUTES.login && Boolean(authStore.getSessionId)) {
    return Layout;
  } else {
    return Empty;
  }
});

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
