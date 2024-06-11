<template>
  <div class="shop-container">
    <h2 class="head-title">
      {{ $t("lang-dec7f483-cf4a-406a-8241-bfeb9cf1baef") }}
    </h2>
    <FilterSearch
      @onClick="openModal"
      @onSearch="searchShop"
      :show-filter="false"
    />

    <STabs :tab-mode="'filter-tabs'" class="s-mb-4">
      <STabItem value="0" :active-tab="tab" @changeTab="selectTab">
        Все
      </STabItem>
      <STabItem value="14300" :active-tab="tab" @changeTab="selectTab">
        {{ $t(`moderation-status.14300`) }}
      </STabItem>
      <STabItem value="14302" :active-tab="tab" @changeTab="selectTab">
        {{ $t(`moderation-status.14302`) }}
      </STabItem>
      <STabItem value="14301" :active-tab="tab" @changeTab="selectTab">
        {{ $t(`moderation-status.14301`) }}
      </STabItem>
    </STabs>

    <STable
      :headers="headers"
      :data="shops"
      :totalItems="totalShops"
      :itemsPerPage="pageSize"
      paginateRange="2"
      @onSelectPage="onChangePage"
    >
      <template v-slot:status="{ item }">
        <SBadge
          :content="$t(`moderation-status.${item.verificationStatus}`)"
          :color="getColorByStatus(item)"
        />
      </template>
      <template v-slot:moderator="{ item }">
        {{ currentModeratorNameValue(item.moderatorName) }}
      </template>
      <template v-slot:date="{ item }">
        {{
          formatDate(item.moderationDate) ??
          $t("lang-f0ce9d5c-5729-43ae-8af0-9e402155a6a9")
        }}
      </template>
      <template v-slot:action="{ item }">
        <router-link :to="{ name: 'shopDetail', params: { id: item.id } }">
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
    <FilterModal ref="filterModal" />
  </div>
</template>

<script lang="ts" setup>
import { STable, SBadge, STabs, STabItem } from "@tumarsoft/ogogo-ui";
import { ref, reactive, computed, onBeforeMount } from "vue";
import FilterSearch from "@/widgets/filter-search/FilterSearch.vue";
import { FilterModal } from "@/shared/ui";
import {
  PRODUCT_VERIFICATION_STATUS,
  ShopEntity,
  useShopStore,
} from "@/entities/shop";
import { SORT_DIRECTION } from "@/shared/api/api.types";
import { useI18n } from "vue-i18n";
import moment from "moment";

const headers = reactive([
  { title: "Магазин", key: "name" },
  { title: "Статус", key: "status" },
  { title: "Модератор", key: "moderator" },
  { title: "Дата", key: "date" },
  { title: "Действия", key: "action" },
]);

const currentStatus = computed(() =>
  Number(tab.value) ? { statuses: [Number(tab.value)] } : {}
);

const shopStore = useShopStore();
const { t } = useI18n();
const searchTimer = ref(null);
const tab = ref("");
const params = ref({
  pageSize: 10,
  sortDirection: SORT_DIRECTION.ASCENDING,
  queryParams: {},
  pageIndex: 0,
  search: "",
});

onBeforeMount(() => {
  selectTab("0");
});

const selectTab = (selectedTab: string) => {
  tab.value = selectedTab;
  params.value.pageIndex = 0;
  params.value.search = "";
  params.value.queryParams = currentStatus.value;
  fetchShops();
};

const fetchShops = () => {
  shopStore.fetchShopPagedList(params.value);
};

const shops = computed(() => shopStore.getShopPagedList.items);
const pageSize = computed(() => shopStore.getShopPagedList.pageSize);
const totalShops = computed(() => shopStore.getShopPagedList.totalCount);

const filterModal = ref(null);

const getColorByStatus = (item: ShopEntity) => {
  switch (item.verificationStatus) {
    case 0:
      return "grey";
    case PRODUCT_VERIFICATION_STATUS.PENDING:
      return "orange";
    case PRODUCT_VERIFICATION_STATUS.ACCEPTED:
      return "green";
    case PRODUCT_VERIFICATION_STATUS.REJECTED:
      return "red";
  }
};

const currentModeratorNameValue = (value: string) =>
  value ? value : t("lang-dc04a546-3af6-410c-bd94-520236c92e72");

const formatDate = (date: string) => {
  return moment(date).format("DD.MM.YYYY, HH:mm");
};

const searchShop = (value: string) => {
  clearTimeout(searchTimer.value);
  params.value.pageIndex = 0;
  params.value.queryParams = { statuses: [] };
  params.value.search = value;
  searchTimer.value = setTimeout(() => {
    fetchShops();
  }, 1000);
};

const onChangePage = (selectedPage: number) => {
  params.value.pageIndex = selectedPage - 1;
  params.value.queryParams = currentStatus.value;
  fetchShops();
};

const openModal = () => {
  filterModal.value.toggleFilterModal();
};
</script>
