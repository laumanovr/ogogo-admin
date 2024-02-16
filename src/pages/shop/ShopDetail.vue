<template>
  <div class="shop-detail-container">
    <div class="top-block">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left"/>
        {{$t('lang-943d7231-c402-4b11-929c-b26a3ee10276')}}
      </SButton>
      <div class="shop-title"><img src="../../app/assets/img/shop-logo.png" alt="" class="sm-img mr-8">Мой телефон</div>
    </div>
    <h2 class="head-title md">Изменённые данные</h2>
    <div class="shop-logo-block">
      <div class="d-flex items-center">
        <img src="../../app/assets/img/shop-logo.png" alt="logo" class="logo mr-24">
        <div class="logo-title">Мой телефон</div>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="img" class="mr-12">
        <SInput :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')" width="100%"/>
      </div>
    </div>
    <div class="shop-name-block mt-32">
      <div>
        <SInput :label="$t('lang-83ea23b9-0c12-4c48-a823-39cbc73f7219')" width="100%"/>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
        <SInput :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')" width="100%"/>
      </div>
    </div>
    <div class="description-block mt-32">
      <div>
        <STextArea :label="$t('lang-b1c420fe-8beb-4452-bf7c-165f69e8eabf')" width="100%" height="150px"/>
      </div>
      <div class="d-flex mt-24">
        <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
        <SInput :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')" width="100%"/>
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
  router.push('/shops');
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
      font-weight: 600;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }

  .shop-logo-block {
    .logo {
      width: 96px;
      height: 96px;
    }
    .logo-title {
      font-weight: 600;
    }
  }
}
</style>

