<template>
  <div class="product-detail-container mt-10">
    <div class="d-flex items-center mb-24">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left"/>
        {{ $t('lang-943d7231-c402-4b11-929c-b26a3ee10276') }}
      </SButton>
      <div class="d-flex items-center margin-0-24">
        <img src="../../app/assets/img/shop-logo.png" alt="" class="sm-img mr-8">
        Мой телефон
      </div>
      <BreadCrumbs/>
    </div>
    <h2 class="head-title md" id="main">{{ $t('lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9') }}</h2>
    <div class="d-flex mt-24">
      <div class="content-block">
        <div>
          <SInput label="Наименование товара" width="100%"/>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="mt-24">
          <STextArea label="Описание товара" width="100%"/>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="price-block mt-40" id="price">
          <div class="head-title md">{{ $t('lang-3bbbc87b-85a5-4434-a8b7-999c9146de08') }}</div>
          <SInput label="Цена" width="260px" class="mr-12"/>
          <SInput label="Скидка в %" width="260px" class="mr-12"/>
          <SInput label="Цена со скидкой" width="260px"/>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="leftover" id="leftover">
          <div class="head-title md">{{ $t('lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd') }}</div>
          <SInput label="Кол-во" width="100%"/>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="photo-block" id="photo">
          <div class="head-title md">{{ $t('lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde') }}</div>
          <p class="hint mb-24">{{ $t('lang-7c1a3ecf-841c-4ea1-951b-a5d27099a805') }}</p>
          <div class="d-flex flex-wrap">
            <img src="../../app/assets/img/iphone.jpg" alt="image" class="photo mr-8 mb-8" v-for="i in 5">
          </div>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="video-block" id="video">
          <div class="head-title md">{{ $t('lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0') }}</div>
          <p class="hint mb-24">{{ $t('lang-9fc0c45e-0828-49af-a325-a11dbc4a9829') }}</p>
          <div class="d-flex flex-wrap">
            <img src="../../app/assets/img/iphone.jpg" alt="image" class="video mr-8">
          </div>
          <div class="d-flex mt-24">
            <img src="../../app/assets/img/ava.png" alt="" class="mr-12">
            <SInput placeHolder="Добавить комментарий" width="100%"/>
          </div>
        </div>
        <div class="characteristic-block" id="character">
          <div class="head-title md">{{ $t('lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51') }}</div>
          <p class="hint mb-24">{{ $t('lang-0c4310a2-d07f-450a-9258-a907b7feb038') }}</p>
          <div class="selects d-flex flex-wrap justify-between">
            <SSelect label="Цвет" class="mb-16"/>
            <SSelect label="Конфигурация памяти" class="mb-16"/>
            <SSelect label="Состояние" class="mb-16"/>
            <SSelect label="Экран" class="mb-16"/>
          </div>
        </div>
      </div>
      <div class="anchor-block ml-60">
        <div class="anchor-items">
          <a
              v-for="anchor in anchors"
              :key="anchor.link"
              class="anchor-item"
              :class="{'active': anchor.link === currentAnchor}"
              @click="changeAnchor(anchor.link)"
          >
            {{ anchor.name }}
          </a>
        </div>
      </div>
    </div>
    <div class="d-flex mt-40">
      <SButton size="large" color="violet" class="mr-12">{{ $t('lang-01b61f03-58d8-4b95-880e-a6b75920efad') }}</SButton>
      <SButton size="large" color="gray">{{ $t('lang-c06435a1-c1cb-40b3-a0f0-f4220e0f88ab') }}</SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton, STextArea, SSelect, SIconRender } from "@tumarsoft/ogogo-ui";
import BreadCrumbs from "../../features/Breadcrumbs.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const anchors = reactive([
  {link: "main", name: "Главное о товаре"},
  {link: "price", name: "Цена"},
  {link: "leftover", name: "Остаток"},
  {link: "photo", name: "Фото"},
  {link: "video", name: "Видео"},
  {link: "character", name: "Характеристики"},
]);

const currentAnchor = ref("");
const isDisableScroll = ref(false);

const changeAnchor = (anchor) => {
  isDisableScroll.value = true;
  currentAnchor.value = anchor;
  const element = document.getElementById(anchor);
  element.scrollIntoView({behavior: "smooth"});
  setTimeout(() => {
    isDisableScroll.value = false;
  }, 800);
};

const goBack = () => {
  router.push("/products");
};

const handleScroll = () => {
  if (!isDisableScroll.value) {
    const sections = ["main", "price", "leftover", "photo", "video", "character"];
    const offset = window.pageYOffset;
    sections.forEach((anchorId) => {
      const section = document.getElementById(anchorId);
      if (section) {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (offset >= top && offset < top + height) {
          currentAnchor.value = anchorId;
        }
      }
    });
  }
};
</script>

<style lang="scss">
@import "../../app/style/colors.scss";

.product-detail-container {
  .content-block {
    max-width: 812px;
  }

  .hint {
    font-weight: 500;
    font-size: 14px;
  }

  .photo-block {
    .photo {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .video-block {
    .video {
      width: 256px;
      height: 256px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .dropdown {
    width: calc(50% - 6px);
    max-width: none; // delete later
    input {
      width: calc(100% - 48px); //delete later
    }
  }

  .anchor-block {
    .anchor-items {
      position: sticky;
      top: 12px;
    }

    .anchor-item {
      display: block;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 18px;
      padding-left: 14px;
      cursor: pointer;
      text-decoration: none;
      color: $black;
      border-left: 3px solid transparent;

      &.active {
        border-left-color: $violet-600;
      }
    }
  }
}
</style>