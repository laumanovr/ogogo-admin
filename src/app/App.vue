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
import { computed, ref, watch } from "vue";
import { SToaster } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import axios from "axios";
import { useAuthStore } from "@/shared/store/auth";
import { useRouter } from "vue-router";

const alertStore = useAlertStore();
const loaderStore = useLoaderStore();
const toaster = ref(null);
const isLoggedIn = true;

const currentComponent = computed(() => {
  if (isLoggedIn) {
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
