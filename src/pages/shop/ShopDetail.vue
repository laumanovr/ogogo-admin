<template>
  <div class="shop-detail-container">
    <div class="top-block">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left"/>
        {{$t('lang-943d7231-c402-4b11-929c-b26a3ee10276')}}
      </SButton>
      <div class="shop-title"><img src="../../app/assets/img/shop-logo.png" alt="" class="mr-8">Moi telefon</div>
    </div>
    <h2 class="head-title md">Изменённые данные</h2>
    <div class="shop-logo-block">
      <div class="d-flex items-center">
        <img src="../../app/assets/img/shop-logo.png" alt="logo" class="logo mr-24">
        <div class="logo-title">Moi telefon</div>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="img" class="mr-12">
        <SInput placeHolder="Добавить комментарий" width="100%"/>
      </div>
    </div>
    <div class="shop-name-block mt-32">
      <div>
        <SInput label="Наименование" width="100%"/>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
        <SInput placeHolder="Добавить комментарий" width="100%"/>
      </div>
    </div>
    <div class="description-block mt-32">
      <div>
        <STextArea label="Описание" width="100%" height="150px"/>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
        <SInput placeHolder="Добавить комментарий" width="100%"/>
      </div>
    </div>
    <div class="d-flex mt-40">
      <SButton size="large" color="violet" class="mr-8">{{ $t('lang-12fe79b5-20d2-4f2f-90a4-58ce16506ba3') }}</SButton>
      <SButton size="large" color="gray">{{ $t('lang-c06435a1-c1cb-40b3-a0f0-f4220e0f88ab') }}</SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SButton, SInput, STextArea, SIconRender} from "@tumarsoft/ogogo-ui";
import {useRouter} from "vue-router";
const router = useRouter();

const goBack = () => {
  router.push('/shop');
}
</script>

<style lang="scss">
.shop-detail-container {
  margin-top: 10px;
  .top-block {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .shop-title {
      margin-left: 24px;
      font-weight: 500;
      font-size: 14px;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .shop-logo-block {
    .logo {
      width: 96px;
      height: 96px;
    }
  }
}
</style>

