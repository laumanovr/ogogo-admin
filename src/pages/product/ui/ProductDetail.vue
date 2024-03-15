<template>
  <div class="product-detail-container mt-10">
    <div class="d-flex items-center mb-24">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="d-flex items-center ml-24 mr-24">
        <img src="/icons/shop-logo.png" alt="" class="sm-img mr-8" />
        Мой телефон
      </div>
      <Breadcrumbs />
    </div>
    <h2 class="head-title md" id="main">
      {{ $t("lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9") }}
    </h2>
    <div class="d-flex mt-24">
      <div class="content-block">
        <div>
          <SInput
            :label="$t('lang-cb1dea14-fb31-4e97-9364-9e33b4227c3a')"
            width="100%"
          />
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="mt-24 description">
          <STextArea
            :label="$t('lang-240d2d7a-5a93-4647-a066-22a368702e04')"
            width="100%"
          />
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="price-block mt-40" id="price">
          <div class="head-title md">
            {{ $t("lang-3bbbc87b-85a5-4434-a8b7-999c9146de08") }}
          </div>
          <div class="d-flex">
            <SInput
              :label="$t('lang-333319c2-2df4-4057-a56a-28ddd7a790a1')"
              width="100%"
              class="mr-12"
            />
            <SInput
              :label="$t('lang-1f6f2dca-070c-48bc-941f-e1300024ffbb')"
              width="100%"
              class="mr-12"
            />
            <SInput
              :label="$t('lang-5eb99c46-ed5f-4a24-85ad-d551ad812256')"
              width="100%"
            />
          </div>
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="leftover" id="leftover">
          <div class="head-title md">
            {{ $t("lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd") }}
          </div>
          <SInput
            :label="$t('lang-3a76c0f0-6ebc-413e-8455-9363f5436da1')"
            width="100%"
          />
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="photo-block" id="photo">
          <div class="head-title md">
            {{ $t("lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde") }}
          </div>
          <p class="hint mb-24">
            {{ $t("lang-7c1a3ecf-841c-4ea1-951b-a5d27099a805") }}
          </p>
          <div class="d-flex flex-wrap">
            <img
              v-for="i in 5"
              src="/icons/iphone.jpg"
              alt="image"
              class="photo mr-8 mb-8"
              :key="i"
            />
          </div>
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="video-block" id="video">
          <div class="head-title md">
            {{ $t("lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0") }}
          </div>
          <p class="hint mb-24">
            {{ $t("lang-9fc0c45e-0828-49af-a325-a11dbc4a9829") }}
          </p>
          <div class="d-flex flex-wrap">
            <img src="/icons/iphone.jpg" alt="image" class="video mr-8" />
          </div>
          <div class="d-flex mt-24">
            <img src="/icons/ava.png" alt="" class="mr-12" />
            <SInput
              :placeHolder="$t('lang-5b31da57-d71a-4a20-9490-6ffd5285671c')"
              width="100%"
            />
          </div>
        </div>
        <div class="characteristic-block" id="character">
          <div class="head-title md">
            {{ $t("lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51") }}
          </div>
          <p class="hint mb-24">
            {{ $t("lang-0c4310a2-d07f-450a-9258-a907b7feb038") }}
          </p>
          <div class="d-flex flex-wrap justify-between">
            <div class="mb-16 selects">
              <SSelect label="Цвет" />
            </div>
            <div class="mb-16 selects">
              <SSelect label="Конфигурация памяти" />
            </div>
            <div class="mb-16 selects">
              <SSelect label="Состояние" />
            </div>
            <div class="mb-16 selects">
              <SSelect label="Экран" />
            </div>
          </div>
        </div>
      </div>
      <div class="anchor-block ml-60">
        <div class="anchor-items">
          <a
            v-for="anchor in anchors"
            :key="anchor.link"
            class="anchor-item"
            :class="{ active: anchor.link === currentAnchor }"
            @click="changeAnchor(anchor.link)"
          >
            {{ $t(anchor.name) }}
          </a>
        </div>
      </div>
    </div>
    <div class="d-flex mt-40 actions">
      <SButton size="large" color="violet" class="mr-12">{{
        $t("lang-01b61f03-58d8-4b95-880e-a6b75920efad")
      }}</SButton>
      <SButton size="large" color="gray">{{
        $t("lang-c06435a1-c1cb-40b3-a0f0-f4220e0f88ab")
      }}</SButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SInput,
  SButton,
  STextArea,
  SSelect,
  SIconRender,
} from "@tumarsoft/ogogo-ui";
import { Breadcrumbs } from "@/shared/ui";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

type IAnchor = { link: string; name: string };
const anchors = reactive<IAnchor[]>([
  { link: "main", name: "lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9" },
  { link: "price", name: "lang-333319c2-2df4-4057-a56a-28ddd7a790a1" },
  { link: "leftover", name: "lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd" },
  { link: "photo", name: "lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde" },
  { link: "video", name: "lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0" },
  { link: "character", name: "lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51" },
]);

const currentAnchor = ref("");
const isDisableScroll = ref(false);

const changeAnchor = (anchor: string) => {
  isDisableScroll.value = true;
  currentAnchor.value = anchor;
  const element = document.getElementById(anchor);
  element.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    isDisableScroll.value = false;
  }, 800);
};

const goBack = () => {
  router.push("/products");
};

const handleScroll = () => {
  if (!isDisableScroll.value) {
    const sections = [
      "main",
      "price",
      "leftover",
      "photo",
      "video",
      "character",
    ];
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

<style lang="scss" scoped>
.product-detail-container {
  .content-block {
    max-width: 812px;
  }

  .hint {
    font-weight: 500;
    font-size: 14px;
  }

  .textarea-container {
    width: 100%;
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

  .selects {
    width: calc(50% - 6px);

    .dropdown {
      width: 100%;
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
      color: var(--black);
      border-left: 3px solid transparent;

      &.active {
        border-left-color: var(--violet-600);
      }
    }
  }

  .input-container {
    width: 100%;
  }

  .actions {
    .button {
      min-width: 165px;
    }
  }
}
</style>
