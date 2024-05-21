<template>
  <div class="product-list-container">
    <h2 class="head-title">
      {{ $t("lang-9839245b-e40e-4ae1-92e9-0421dc97a154") }}
    </h2>
    <FilterSearch @onClick="showFilterModal" />
    <STable
      :headers="headers"
      :data="products"
      :totalItems="totalItems"
      itemsPerPage="10"
      paginateRange="2"
      @onSelectPage="onChangePage"
    >
      <template v-slot:productName="{ item }">
        <div class="d-flex">
          <img
            :src="`data:image/png;base64,${item.iconBase64}`"
            alt="img"
            class="product-img"
            v-if="item.iconBase64"
          />
          <span class="ml-8">{{ item.productName }}</span>
        </div>
      </template>
      <template v-slot:shopName="{ item }">
        <div class="d-flex">
          <img
            :src="`data:image/png;base64,${item.shopIconBase64}`"
            alt="img"
            class="shop-img"
            v-if="item.shopIconBase64"
          />
          <span class="ml-8">{{ item.shopName }}</span>
        </div>
      </template>
      <template v-slot:status="{ item }">
        <SBadge
          :content="getStatusInfo(item, 'name')"
          :color="getStatusInfo(item, 'color')"
        />
      </template>
      <template v-slot:action="{ item }">
        <router-link :to="{ name: 'productDetail', params: { id: item.id } }">
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
    <FilterModal ref="filterModal" />
  </div>
</template>

<script lang="ts" setup>
import { STable, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import FilterSearch from "@/widgets/filter-search/FilterSearch.vue";
import { FilterModal } from "@/shared/ui";
import { useProductStore } from "@/entities/product/store/product.store";

interface Status {
  name: string;
  color: string;
}

const productStore = useProductStore();
const filterModal = ref(null);
const params = ref({ pageIndex: 0, productType: 14701 });
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
  { id: 0, name: "Все", color: "red" },
  { id: 14800, name: "Черновик", color: "red" },
  { id: 14801, name: "Опубликовано", color: "green" },
  { id: 14802, name: "Ожидает модерации", color: "red" },
  { id: 14803, name: "Ожидает одобрения", color: "orange" },
  { id: 14804, name: "Одобрено", color: "green" },
  { id: 14805, name: "В архиве", color: "red" },
  { id: 14806, name: "Требует доработки", color: "red" },
  { id: 14807, name: "Заблокировано", color: "red" },
]);

onMounted(() => {
  getModerationProducts();
});

const getModerationProducts = () => {
  productStore.fetchModerationProducts(params.value);
};

const getStatusInfo = (item: any, field: keyof Status) => {
  const foundStatus = statuses.value.find(
    (status) => status.id === item.status
  );
  return foundStatus ? foundStatus[field] : "";
};

const onChangePage = (selectedPage: number) => {
  params.value.pageIndex = selectedPage;
  getModerationProducts();
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
