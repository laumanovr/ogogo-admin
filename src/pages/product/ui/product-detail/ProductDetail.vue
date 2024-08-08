<template>
  <div class="product-detail-container s-mt-3">
    <SLoader v-if="isLoading" />
    <div class="s-flex s-items-center s-mb-5">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" class="s-text-gray-500" />
        {{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}
      </SButton>
      <div class="s-flex s-items-center s-ml-5 s-mr-5">
        <img
          :src="selectedProductShop.logoBase64"
          alt=""
          class="s-mr-2 s-w-6"
        />
        {{ selectedProductShop.name }}
      </div>
    </div>
    <h2 class="s-text-title-1 s-mb-6 s-mt-6" id="main">
      {{ $t("lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9") }}
    </h2>
    <div class="s-flex s-mt-5">
      <div class="content-block">
        <div>
          <SInput
            :label="$t('lang-cb1dea14-fb31-4e97-9364-9e33b4227c3a')"
            v-model="selectedProduct.productName"
            hide-details
            readonly
          />
          <div class="s-flex s-mt-3" v-if="isPendingOrRejected">
            <FieldComment
              fieldName="name"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="s-mt-5 description">
          <STextArea
            :label="$t('lang-240d2d7a-5a93-4647-a066-22a368702e04')"
            width="100%"
            readonly
            v-model="selectedProduct.description"
            hide-details
          />
          <div class="s-flex s-mt-5" v-if="isPendingOrRejected">
            <FieldComment
              fieldName="description"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="price-block s-mt-8" id="price">
          <div class="s-text-title-1 s-mb-6 s-mt-6">
            {{ $t("lang-3bbbc87b-85a5-4434-a8b7-999c9146de08") }}
          </div>
          <div class="s-flex">
            <SInput
              :label="$t('lang-333319c2-2df4-4057-a56a-28ddd7a790a1')"
              class="s-mr-3"
              readonly
              v-model="selectedProduct.price"
              hide-details
            />
            <SInput
              :label="$t('lang-1f6f2dca-070c-48bc-941f-e1300024ffbb')"
              class="s-mr-3"
              readonly
            />
            <SInput
              :label="$t('lang-5eb99c46-ed5f-4a24-85ad-d551ad812256')"
              readonly
            />
          </div>
          <div class="s-flex s-mt-3" v-if="isPendingOrRejected">
            <FieldComment
              fieldName="price"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="leftover" id="leftover">
          <div class="s-text-title-1 s-mb-6 s-mt-6">
            {{ $t("lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd") }}
          </div>
          <SInput
            :label="$t('lang-3a76c0f0-6ebc-413e-8455-9363f5436da1')"
            readonly
            v-model="selectedProduct.countOfProduct"
            hide-details
          />
          <div class="s-flex s-mt-3" v-if="isPendingOrRejected">
            <FieldComment
              fieldName="countOfProduct"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="photo-block" id="photo">
          <div class="s-text-title-1 s-mb-6 s-mt-6">
            {{ $t("lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde") }}
          </div>
          <p class="hint s-mb-5">
            {{ $t("lang-7c1a3ecf-841c-4ea1-951b-a5d27099a805") }}
          </p>
          <div class="s-flex flex-wrap">
            <img
              v-for="(photoId, i) in selectedProduct.photos"
              :src="getFileById(photoId)"
              alt="image"
              class="photo s-mr-2 s-mb-2"
              :key="i"
            />
          </div>
          <div class="s-flex s-mt-3" v-if="isPendingOrRejected">
            <FileComment
              field-name="photo"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="video-block" id="video" :key="videoKey">
          <div class="s-text-title-1 s-mb-6 s-mt-6">
            {{ $t("lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0") }}
          </div>
          <p class="hint s-mb-5">
            {{ $t("lang-9fc0c45e-0828-49af-a325-a11dbc4a9829") }}
          </p>
          <div class="s-flex s-flex-wrap">
            <video class="video" controls width="180" height="180">
              <source
                :src="getFileById(selectedProduct.videos[0])"
                type="video/mp4"
                v-if="selectedProduct.videos?.length"
              />
            </video>
          </div>
          <div class="s-flex s-mt-3" v-if="isPendingOrRejected">
            <FileComment
              field-name="video"
              :isPending="isPending"
              v-if="isCommentReady"
            />
          </div>
        </div>
        <div class="characteristic-block" id="character">
          <div class="s-text-title-1 s-mb-6 s-mt-6">
            {{ $t("lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51") }}
          </div>
          <p class="hint s-mb-5">
            {{ $t("lang-0c4310a2-d07f-450a-9258-a907b7feb038") }}
          </p>
          <div class="s-flex s-flex-wrap s-justify-between">
            <div
              class="s-mb-4 selects"
              v-for="property in properties"
              :key="property.propertyId"
            >
              <SSelect
                class="s-w-full"
                :label="showPropertyName(property)"
                :items="property.allowedValues"
                itemTitle="propertyValueText"
                itemValue="propertyValueId"
                v-model="property.selectedValueId"
                hide-details
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="anchor-block s-ml-10">
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
    <div class="s-flex s-mt-8 actions">
      <SButton
        size="large"
        class="s-mr-3"
        @click="publishProduct"
        :disabled="isPublished"
        v-if="isPending || isPublished"
      >
        {{
          isPending
            ? $t("lang-01b61f03-58d8-4b95-880e-a6b75920efad")
            : $t("lang-b47e5143-97ba-4e6d-880e-d6d70c7262e8")
        }}
      </SButton>
      <SButton
        size="large"
        type="secondary"
        @click="rejectProduct"
        :disabled="!isPending"
        v-if="!isPublished"
      >
        {{
          isPending
            ? $t("lang-4d92287d-f47c-47a1-80c1-3eb9f68352d4")
            : $t("lang-ae2d0a7b-4d85-4fbc-ad1d-50d61a1012b3")
        }}
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
  SLoader,
} from "@tumarsoft/ogogo-ui";
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "@/entities/product/store/product.store";
import { useAlertStore } from "@/shared/store/alert";
import { FieldComment, FileComment } from "./components";
import { PRODUCT_STATUS } from "@/entities/product";
import { useCategoryStore } from "@/entities/category";
import { getFileById } from "@/shared/composable";

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
const alertStore = useAlertStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const currentAnchor = ref("");
const isDisableScroll = ref(false);
const productId = route.params.id as string;
const videoKey = ref(0);
const isCommentReady = ref(false);
const isLoading = ref(false);
const selectedProduct = computed(() => productStore.getSelectedProduct);
const isPending = computed(
  () => selectedProduct.value.status === PRODUCT_STATUS.PENDING
);
const isPublished = computed(
  () => selectedProduct.value.status === PRODUCT_STATUS.PUBLISHED
);
const isPendingOrRejected = computed(
  () =>
    selectedProduct.value.status === PRODUCT_STATUS.PENDING ||
    selectedProduct.value.status === PRODUCT_STATUS.REJECTED
);
const properties = computed(() => categoryStore.getProperties);
const selectedProductShop = computed(() => productStore.getSelectedProductShop);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  getProductById();
  getShopById();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const getProductById = () => {
  isLoading.value = true;
  productStore
    .fetchProductById(productId)
    .then(() => {
      getPropertiesByCategoryId(selectedProduct.value.categoryId);
      isCommentReady.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getPropertiesByCategoryId = (categoryId: string) => {
  isLoading.value = true;
  categoryStore
    .fetchCategoryById(categoryId, selectedProduct.value)
    .finally(() => {
      isLoading.value = false;
    });
};

const getShopById = () => {
  isLoading.value = true;
  productStore
    .fetchProductShopById(route.query.shopId as string)
    .finally(() => {
      isLoading.value = false;
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

const showPropertyName = (property: any) => {
  return property.name;
};

const goBack = () => {
  router.push({ name: "products" });
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
  isLoading.value = true;
  productStore
    .addVerifyComments(productId)
    .then((message: string) => {
      router.push({ name: "products" });
      alertStore.showSuccess(message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const publishProduct = () => {
  const payload = { id: productId, activeStatus: true };
  productStore.publishProduct(payload).then((message: string) => {
    router.push({ name: "products" });
    alertStore.showSuccess(message);
  });
};
</script>

<style lang="scss" scoped>
@import "styles";
</style>
