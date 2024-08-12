<template>
  <div class="login-container">
    <SLoader v-if="isLoading" />
    <div class="login-block">
      <div class="login-logo">
        <img src="/icons/Ogogo-logo.png" alt="ogogo-logo" />
      </div>
      <SForm class="form-block s-bg-white" ref="loginForm">
        <div class="form-title">
          {{ $t("lang-29a329cd-0145-44d5-804d-446c68eb158a") }}
        </div>

        <div
          v-if="showIncorrectLoginAndPassword"
          class="s-py-3 s-px-4 s-mb-4 s-border s-rounded-md s-border-red-300 s-bg-red-50"
        >
          {{ $t("lang-cd89ff76-e757-45a3-8737-03294b4e1345") }}
        </div>

        <div>
          <SInput
            :label="$t('lang-5b5360db-a6ff-43a7-a8d4-f35517b9c4a8')"
            :rules="[requiredField]"
            animated
            v-maska:[maskOptions]
            v-model="loginObj.pin"
          />
        </div>
        <div class="input-password">
          <SInput
            type="password"
            :label="$t('lang-ad3a8ec6-bcb6-4dce-9ff6-a3ccc17c1e8d')"
            :rules="[requiredField]"
            animated
            v-model="loginObj.password"
          />
        </div>
        <div class="light">
          <SButton size="large" @click="onSubmitLogin">
            {{ $t("lang-09888a35-0a9f-46d7-bc1e-34bbae78ccd9") }}
          </SButton>
        </div>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SForm, SInput, SLoader } from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { requiredField } from "@/shared/lib/utils/rules";
import { useAuthStore } from "@/shared/store/auth";
import { maskOptions } from "@/shared/helper";

const authStore = useAuthStore();
const router = useRouter();
const loginObj = reactive({ pin: "", password: "" });
const loginForm = ref(null);
const isLoading = ref(false);
const showIncorrectLoginAndPassword = ref(false);

const onSubmitLogin = () => {
  const removedDashesAndBrackets = loginObj.pin.replace(/\D/g, "");
  loginObj.pin = removedDashesAndBrackets;
  loginForm.value.validate().then((isValid: boolean) => {
    if (isValid) {
      isLoading.value = true;
      authStore
        .login(loginObj)
        .then(() => {
          router.push({ name: "products" });
          showIncorrectLoginAndPassword.value = false;
        })
        .catch(() => {
          showIncorrectLoginAndPassword.value = true;
        })
        .finally(() => {
          isLoading.value = false;
        });
    }
  });
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
