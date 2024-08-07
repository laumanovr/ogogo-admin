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
        Все
      </STabItem>
      <STabItem
        :value="ProductStatus.AWAITING_MODERATION"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        Ожидает модерации
      </STabItem>
      <STabItem
        :value="ProductStatus.REQUIRE_IMPROVEMENT"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        Требует доработки
      </STabItem>
      <STabItem
        :value="ProductStatus.PUBLISHED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        Опубликовано
      </STabItem>
      <STabItem
        :value="ProductStatus.DRAFT"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        Черновик
      </STabItem>
      <STabItem
        :value="ProductStatus.BLOCKED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        Заблокировано
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
  { title: "Товар", key: "productName" },
  { title: "Продавец", key: "shopName" },
  { title: "Статус", key: "status" },
  { title: "Модератор", key: "verifierName" },
  { title: "", key: "action" },
]);

const statuses = ref([
  { id: ProductStatus.ALL, name: "Все", color: "red" },
  { id: ProductStatus.DRAFT, name: "Черновик", color: "grey" },
  { id: ProductStatus.PUBLISHED, name: "Опубликовано", color: "green" },
  {
    id: ProductStatus.AWAITING_MODERATION,
    name: "Ожидает модерации",
    color: "blue",
  },
  {
    id: ProductStatus.AWAITING_APPROVE_TO,
    name: "Ожидает модерации ТО",
    color: "orange",
  },
  { id: ProductStatus.APPROVED, name: "Одобрено ТО", color: "green" },
  { id: ProductStatus.ARCHIVED, name: "В архиве", color: "dark-grey" },
  {
    id: ProductStatus.REQUIRE_IMPROVEMENT,
    name: "Требует доработки",
    color: "red",
  },
  { id: ProductStatus.BLOCKED, name: "Заблокировано", color: "red" },
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
