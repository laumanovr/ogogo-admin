<template>
  <div class="product-list-container">
    <div class="s-text-h-2 s-mb-6 s-mt-6">
      {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
    </div>
    <FilterSearch
      @onClick="showFilterModal"
      @onSearch="searchProduct"
      :show-filter="true"
    />
    <STabs :tab-mode="'filter-tabs'" class="s-mb-4">
      <STabItem
        :value="ProductStatus.ALL"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-d738dc32-5ed0-4069-a614-72af9d8d84b8") }}
      </STabItem>
      <STabItem
        :value="ProductStatus.AWAITING_MODERATION"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-e9950db6-482c-423e-bc03-dcfdd2982298") }}
      </STabItem>
      <STabItem
        :value="ProductStatus.REQUIRE_IMPROVEMENT"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-325e66a7-5954-4447-b894-7a75a7869c84") }}
      </STabItem>
      <STabItem
        :value="ProductStatus.PUBLISHED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-b47e5143-97ba-4e6d-880e-d6d70c7262e8") }}
      </STabItem>
      <STabItem
        :value="ProductStatus.DRAFT"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-55078558-54bd-4a08-b5d4-8ec322321eea") }}
      </STabItem>
      <STabItem
        :value="ProductStatus.BLOCKED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-063c217d-47c2-4a7a-9305-6d22e114b2e0") }}
      </STabItem>
    </STabs>
    <STable
      :headers="headers"
      :data="products"
      :totalItems="totalItems"
      :loading="isLoading"
      @onSelectPage="onChangePage"
    >
      <template v-slot:productName="{ item }">
        <div class="s-flex">
          <img
            :src="getFullIcon(item.iconBase64)"
            class="product-img"
            v-if="item.iconBase64"
          />
          <span class="s-ml-2">{{ item.productName }}</span>
        </div>
      </template>
      <template v-slot:shopName="{ item }">
        <div class="s-flex">
          <img
            :src="item.shopIconBase64"
            class="shop-img"
            v-if="item.shopIconBase64"
          />
          <span class="s-ml-2">{{ item.shopName }}</span>
        </div>
      </template>
      <template v-slot:status="{ item }">
        <SBadge
          :content="getStatusInfo(item, 'name')"
          :color="getStatusInfo(item, 'color')"
        />
      </template>
      <template v-slot:action="{ item }">
        <router-link
          :to="{
            name: 'productDetail',
            params: { id: item.id },
            query: { shopId: item.shopId },
          }"
        >
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
    <FilterModal ref="filterModal" />
  </div>
</template>

<script lang="ts" setup>
import { STable, SBadge, STabs, STabItem } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import FilterSearch from "@/widgets/filter-search/FilterSearch.vue";
import { FilterModal } from "@/shared/ui";
import { useProductStore } from "@/entities/product/store/product.store";
import { ProductStatus } from "@/shared/lib/utils/enums";
import { getFullIcon } from "@/shared/composable";
import i18n from "@/shared/lib/plugins/i18n";

interface Status {
  name: string;
  color: string;
}

const productStore = useProductStore();
const filterModal = ref(null);
const params = ref({
  pageIndex: 0,
  productType: 14701,
  statuses: [],
  search: "",
  sortDirection: 1,
});
const tab = ref("0");
const searchTimer = ref(null);
const isLoading = ref(false);

const currentStatus = computed(() =>
  Number(tab.value) ? [Number(tab.value)] : []
);
const products = computed(() => productStore.getModerationProductList);
const totalItems = computed(() => productStore.getProductTotalCount);

const headers = ref([
  {
    title: i18n.global.t("lang-005fca64-7f65-4776-b5db-1f15c2035231"),
    key: "productName",
  },
  {
    title: i18n.global.t("lang-5ef270e6-2074-46fb-a423-e33253661570"),
    key: "shopName",
  },
  {
    title: i18n.global.t("lang-75200a6e-e148-4665-9633-456fa1dca337"),
    key: "status",
  },
  {
    title: i18n.global.t("lang-ac03bd59-de6a-4baa-bb3b-c48e93959e66"),
    key: "verifierName",
  },
  { title: "", key: "action" },
]);

const statuses = ref([
  {
    id: ProductStatus.ALL,
    name: i18n.global.t("lang-d738dc32-5ed0-4069-a614-72af9d8d84b8"),
    color: "red",
  },
  {
    id: ProductStatus.DRAFT,
    name: i18n.global.t("lang-55078558-54bd-4a08-b5d4-8ec322321eea"),
    color: "grey",
  },
  {
    id: ProductStatus.PUBLISHED,
    name: i18n.global.t("lang-b47e5143-97ba-4e6d-880e-d6d70c7262e8"),
    color: "green",
  },
  {
    id: ProductStatus.AWAITING_MODERATION,
    name: i18n.global.t("lang-e9950db6-482c-423e-bc03-dcfdd2982298"),
    color: "blue",
  },
  {
    id: ProductStatus.AWAITING_APPROVE_TO,
    name: i18n.global.t("lang-ede70066-b280-4c65-bad5-4f50dda5fef3"),
    color: "orange",
  },
  {
    id: ProductStatus.APPROVED,
    name: i18n.global.t("lang-6db83ab5-0763-4836-a1a6-522ddb67f9f8"),
    color: "green",
  },
  {
    id: ProductStatus.ARCHIVED,
    name: i18n.global.t("lang-bd71e6a8-5634-4ec7-b021-7b504b529b21"),
    color: "dark-grey",
  },
  {
    id: ProductStatus.REQUIRE_IMPROVEMENT,
    name: i18n.global.t("lang-325e66a7-5954-4447-b894-7a75a7869c84"),
    color: "red",
  },
  {
    id: ProductStatus.BLOCKED,
    name: i18n.global.t("lang-063c217d-47c2-4a7a-9305-6d22e114b2e0"),
    color: "red",
  },
]);

onMounted(() => {
  selectTab("0");
});

const selectTab = (value: string) => {
  tab.value = value;
  params.value.search = "";
  params.value.pageIndex = 0;
  params.value.statuses = currentStatus.value;
  getModerationProducts();
};

const getModerationProducts = () => {
  isLoading.value = true;
  productStore.fetchModerationProducts(params.value).finally(() => {
    isLoading.value = false;
  });
};

const getStatusInfo = (item: any, field: keyof Status) => {
  const foundStatus = statuses.value.find(
    (status) => status.id === item.status
  );
  return foundStatus ? foundStatus[field] : "";
};

const onChangePage = (selectedPage: number) => {
  params.value.pageIndex = selectedPage - 1;
  params.value.statuses = currentStatus.value;
  getModerationProducts();
};

const searchProduct = (value: string) => {
  clearTimeout(searchTimer.value);
  params.value.pageIndex = 0;
  params.value.statuses = [];
  params.value.search = value;
  searchTimer.value = setTimeout(() => {
    getModerationProducts();
  }, 1000);
};

const showFilterModal = () => {
  filterModal.value.toggleFilterModal();
};
</script>

<style lang="scss">
.product-list-container {
  .product-img {
    width: 44px;
    height: 44px;
  }
  .shop-img {
    width: 24px;
    height: 24px;
  }
}
</style>
