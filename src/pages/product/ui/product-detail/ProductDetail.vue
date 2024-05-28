<template>
  <div class="product-detail-container mt-10">
    <div class="d-flex items-center mb-24">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="d-flex items-center ml-24 mr-24">
        <img :src="selectedProductShop.logoBase64" alt="" class="sm-img mr-8" />
        {{ selectedProductShop.name }}
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
            disabled
            v-model="selectedProduct.productName"
          />
          <div class="d-flex mt-10">
            <FieldComment fieldName="name" v-if="isCommentReady" />
          </div>
        </div>
        <div class="mt-24 description">
          <STextArea
            :label="$t('lang-240d2d7a-5a93-4647-a066-22a368702e04')"
            width="100%"
            disabled
            v-model="selectedProduct.description"
          />
          <div class="d-flex mt-10">
            <FieldComment fieldName="description" v-if="isCommentReady" />
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
              disabled
              v-model="selectedProduct.price"
            />
            <SInput
              :label="$t('lang-1f6f2dca-070c-48bc-941f-e1300024ffbb')"
              width="100%"
              class="mr-12"
              disabled
            />
            <SInput
              :label="$t('lang-5eb99c46-ed5f-4a24-85ad-d551ad812256')"
              width="100%"
              disabled
            />
          </div>
          <div class="d-flex mt-10">
            <FieldComment fieldName="price" v-if="isCommentReady" />
          </div>
        </div>
        <div class="leftover" id="leftover">
          <div class="head-title md">
            {{ $t("lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd") }}
          </div>
          <SInput
            :label="$t('lang-3a76c0f0-6ebc-413e-8455-9363f5436da1')"
            width="100%"
            disabled
            v-model="selectedProduct.countOfProduct"
          />
          <div class="d-flex mt-10">
            <FieldComment fieldName="countOfProduct" v-if="isCommentReady" />
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
              v-for="(photo, i) in productPhotos"
              :src="photo"
              alt="image"
              class="photo mr-8 mb-8"
              :key="i"
            />
          </div>
          <div class="d-flex mt-10">
            <FileComment field-name="photo" v-if="isCommentReady" />
          </div>
        </div>
        <div class="video-block" id="video" :key="videoKey">
          <div class="head-title md">
            {{ $t("lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0") }}
          </div>
          <p class="hint mb-24">
            {{ $t("lang-9fc0c45e-0828-49af-a325-a11dbc4a9829") }}
          </p>
          <div class="d-flex flex-wrap">
            <video class="video" controls width="180" height="180">
              <source :src="videoUrl" type="video/mp4" />
            </video>
          </div>
          <div class="d-flex mt-10">
            <FileComment field-name="video" v-if="isCommentReady" />
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
      <SButton
        size="large"
        color="violet"
        class="mr-12"
        @click="publishProduct"
        :disabled="isPublished"
        v-if="isPending || isPublished"
      >
        {{
          isPending
            ? $t("lang-01b61f03-58d8-4b95-880e-a6b75920efad")
            : "Опубликован"
        }}
      </SButton>
      <SButton
        size="large"
        color="gray"
        @click="rejectProduct"
        :disabled="!isPending"
        v-if="!isPublished"
      >
        {{ isPending ? "Отправить на доработку" : "Отправлен на доработку" }}
      </SButton>
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
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "@/entities/product/store/product.store";
import { FieldComment, FileComment } from "./components";
import { PRODUCT_STATUS } from "@/entities/product";

type IAnchor = { link: string; name: string };
const anchors = reactive<IAnchor[]>([
  { link: "main", name: "lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9" },
  { link: "price", name: "lang-333319c2-2df4-4057-a56a-28ddd7a790a1" },
  { link: "leftover", name: "lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd" },
  { link: "photo", name: "lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde" },
  { link: "video", name: "lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0" },
  { link: "character", name: "lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51" },
]);

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const currentAnchor = ref("");
const isDisableScroll = ref(false);
const productId = route.params.id as string;
const productPhotos = ref([]);
const videoUrl = ref("");
const videoKey = ref(0);
const selectedProductShop = ref({ name: "", logoBase64: "" });
const selectedProduct = computed(() => productStore.getSelectedProduct);
const isCommentReady = ref(false);
const isPending = computed(
  () => selectedProduct.value.status === PRODUCT_STATUS.PENDING
);
const isPublished = computed(
  () => selectedProduct.value.status === PRODUCT_STATUS.PUBLISHED
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  getProductById();
  getShopById();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const getProductById = () => {
  const sessionId = JSON.parse(window.localStorage.getItem("sessionId"));
  const defaultUrl = import.meta.env.VITE_API_SERVER;
  productStore.fetchProductById(productId).then(() => {
    selectedProduct.value.photos.forEach((photoId: string) => {
      const photo = `${defaultUrl}File/FileById?id=${photoId}&sessionId=${sessionId}`;
      productPhotos.value.push(photo);
    });
    if (selectedProduct.value.videos.length) {
      const videoId = selectedProduct.value.videos[0];
      videoUrl.value = `${defaultUrl}File/FileById?id=${videoId}&sessionId=${sessionId}`;
      videoKey.value++;
    }
    isCommentReady.value = true;
  });
};

const getShopById = () => {
  productStore
    .fetchProductShopById(route.query.shopId as string)
    .then((response) => {
      selectedProductShop.value = response;
    });
};

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

const rejectProduct = () => {
  productStore.addVerifyComments(productId).then(() => {
    router.push("/products");
  });
};

const publishProduct = () => {
  const payload = { id: productId, activeStatus: true };
  productStore.publishProduct(payload).then(() => {
    router.push("/products");
  });
};
</script>

<style lang="scss" scoped>
@import "styles";
</style>
