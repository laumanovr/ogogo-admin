<template>
  <div class="login-container">
    <div class="login-block">
      <div class="login-logo">
        <img src="../../shared/ui/assets/Ogogo-logo.png" alt="img" />
      </div>
      <SForm class="form-block" ref="loginForm">
        <div class="form-title">
          {{ $t("lang-29a329cd-0145-44d5-804d-446c68eb158a") }}
        </div>
        <div>
          <SInput
            :label="$t('lang-5b5360db-a6ff-43a7-a8d4-f35517b9c4a8')"
            width="100%"
            :rules="requiredField"
            v-maska:[options]
            v-model="loginObj.pin"
          />
        </div>
        <div class="input-password">
          <SInput
            type="password"
            :label="$t('lang-ad3a8ec6-bcb6-4dce-9ff6-a3ccc17c1e8d')"
            width="100%"
            :rules="requiredField"
            v-model="loginObj.password"
          />
        </div>
        <SButton size="large" color="violet" @click="onSubmitLogin">
          {{ $t("lang-09888a35-0a9f-46d7-bc1e-34bbae78ccd9") }}
        </SButton>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SForm, SInput } from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { requiredField } from "@/shared/lib/utils/rules";
import { useAuthStore } from "@/shared/store/auth";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";

const options = reactive({
  mask: "996-(###)-##-##-##",
  eager: true,
});

const authStore = useAuthStore();
const alertStore = useAlertStore();
const loaderStore = useLoaderStore();
const router = useRouter();

const loginObj = reactive({ pin: "", password: "" });
const loginForm = ref(null);

const onSubmitLogin = () => {
  const removedDashesAndBrackets = loginObj.pin.replace(/\D/g, "");

  loginObj.pin = removedDashesAndBrackets;

  if (loginForm.value.validateForm()) {
    loaderStore.setLoaderState(true);
    authStore
      .login(loginObj)
      .then(() => {
        loaderStore.setLoaderState(false);
        router.push("/property");
      })
      .catch((err: any) => {
        loaderStore.setLoaderState(false);
        alertStore.showError(err?.error?.errorMessage);
      });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-block {
    .login-logo {
      text-align: center;
      margin-bottom: 32px;
    }
  }

  .form-block {
    background: #fff;
    width: 360px;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 12px 32px 0 rgba(40, 43, 48, 0.15);

    .form-title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 35px;
    }

    .input-password {
      margin: 16px 0 35px;
    }

    .button {
      width: 100%;
    }

    .input-container {
      width: 100%;
    }
  }
}
</style>
