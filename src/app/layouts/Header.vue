<template>
  <span>Header</span>

  <div>
    <form @submit.prevent="onSubmit">
      <label for="login">login</label>
      <input id="login" v-model="cred.login" />
      <label for="password">password</label>
      <input id="password" v-model="cred.password" />
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ILogin } from "@/shared/store/auth/index.types";
import { reactive } from "vue";
import { v4 as uuid } from "uuid";
import { getItem, setItem } from "@/shared/utils/persistanceStorage";
import { AuthLoginPayloadInterface } from "@/shared/api/auth/types";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";

const router = useRouter();

const authStore = useAuthStore();

const cred: ILogin = reactive({
  login: "",
  password: "",
});

function onSubmit(): void {
  let phoneNumber = cred.login;
  if (typeof phoneNumber === "string") {
    phoneNumber = cred.login
      .replace(/\s/g, "")
      .replace(/-/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "");
  }
  const certKey = getOrCreateCertKey();
  const payload: AuthLoginPayloadInterface = {
    login: phoneNumber,
    password: cred.password,
    deviceKey: certKey,
    // isMobile: this.$vuetify.breakpoint.xs,
  };

  // if (this.file) {
  //   payload.file = this.file;
  // }

  // add phone number to query
  const _url = router.resolve({
    path: "/",
    query: {
      phone: phoneNumber,
    },
  });
  // replace url to save phone number as query
  if (_url.href !== router.currentRoute.fullPath) {
    router.replace(_url.href);
  }

  authStore
    .login(payload)
    .then((path) => {
      return router.push({ path });
    })
    .catch((err) => {
      // if (err.message === "HasNotAvailableScreen") {
      //   this.$store.dispatch(
      //     notificationActionTypes.addErrorNotification,
      //     this.$t("label-b7162593-1b0a-4c35-b4e9-845fb90a47ad")
      //   );
      //   this.$store.commit(mutationTypes.getCurrentUserFailure);
      //   setItem("active-session", false);
      // }
      // const errorCode = err?.response?.data?.error?.errorCode;
      // const showOnErrorCodes = [
      //   "FaceImageNotUploaded",
      //   "InvalidFaceImageFormat",
      //   "FaceRecognitionNotVerified",
      // ];
      // if (showOnErrorCodes.includes(errorCode)) this.fileModal = true;
    })
    .finally(() => {
      // this.file = null;
    });
}

function getOrCreateCertKey() {
  const key = uuid();
  const certKey = getItem("certKey");
  if (!certKey) {
    setItem("certKey", key);
    return key;
  }
  return certKey;
}

// function login() {
//   // resetErrors();
//   // loading.value = true;
//   userStore
//     .login({ ...cred })
//     .then(() => {
//       router.push({ name: "crm" });
//     })
//     .catch((err: ILoginResultFail) => {
//       error.value = [err.localizatedErrorCode];
//     })
//     .finally(() => {
//       loading.value = false;
//     });
// }
</script>
