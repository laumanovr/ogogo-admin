<template>
  <div class="login-container">
    <Loader v-if="isLoading"/>
    <div class="login-block">
      <div class="login-logo">
        <img src="../../shared/ui/assets/Ogogo-logo.png" alt="img" />
      </div>
      <Form class="form-block" ref="loginForm">
        <div class="form-title">Вход</div>
        <div>
          <Input
            label="Логин"
            width="100%"
            :rules="requiredField"
            v-model="loginObj.pin"
          />
        </div>
        <div class="input-password">
          <Input
            type="password"
            label="Пароль"
            width="100%"
            :rules="requiredField"
            v-model="loginObj.password"
          />
        </div>
        <Button size="large" color="violet" @click="onSubmitLogin">Войти</Button>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Form from "/node_modules/ogogo-uikit/src/components/Form/Form.vue";
import Input from "/node_modules/ogogo-uikit/src/components/Input/Input.vue";
import Button from "/node_modules/ogogo-uikit/src/components/SButton/SButton.vue";
// ----------------------------------------------------
import { ref, reactive } from "vue";
import {requiredField} from "@/shared/lib/utils/rules";
import {useAuthStore} from "@/shared/store/auth";
const authStore = useAuthStore();

const loginObj = reactive({ pin: "", password: "" });
const loginForm = ref(null);
const isLoading = ref(false);

const onSubmitLogin = () => {
  const isValid = loginForm.value.validateForm();
  if (isValid) {
    isLoading.value = true;
    authStore.login(loginObj).then((resp) => {
      console.log(resp);
      isLoading.value = false;
    }).catch((err) => {
      console.log(err);
      isLoading.value = false;
    })
  }
};
</script>

<style lang="scss">
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
  }
}
</style>
