<template>
  <div class="shop-container">
    <div class="s-text-h-2 s-mb-6 s-mt-6">
      {{ $t("lang-dec7f483-cf4a-406a-8241-bfeb9cf1baef") }}
    </div>

    <SInput class="s-mb-4" isSearchable hide-details @input="searchShop" />

    <STabs :tab-mode="'filter-tabs'" class="s-mb-4">
      <STabItem
        :value="PRODUCT_VERIFICATION_STATUS.NONE"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t("lang-d738dc32-5ed0-4069-a614-72af9d8d84b8") }}
      </STabItem>
      <STabItem
        :value="PRODUCT_VERIFICATION_STATUS.PENDING"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t(`moderation-status.14300`) }}
      </STabItem>
      <STabItem
        :value="PRODUCT_VERIFICATION_STATUS.REJECTED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t(`moderation-status.14302`) }}
      </STabItem>
      <STabItem
        :value="PRODUCT_VERIFICATION_STATUS.ACCEPTED"
        :active-tab="tab"
        @changeTab="selectTab"
      >
        {{ $t(`moderation-status.14301`) }}
      </STabItem>
    </STabs>

    <STable
      :headers="headers"
      :data="shops"
      :totalItems="totalShops"
      :itemsPerPage="pageSize"
      :loading="isLoading"
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
  </div>
</template>

<script lang="ts" setup>
import { STable, SBadge, STabs, STabItem, SInput } from "@tumarsoft/ogogo-ui";
import { ref, reactive, computed, onBeforeMount } from "vue";
import {
  PRODUCT_VERIFICATION_STATUS,
  ShopEntity,
  useShopStore,
} from "@/entities/shop";
import { SORT_DIRECTION } from "@/shared/api/api.types";
import { useI18n } from "vue-i18n";
import moment from "moment";
import i18n from "@/shared/lib/plugins/i18n";

const headers = reactive([
  {
    title: i18n.global.t("lang-d13ef000-a5c0-41eb-95a0-a658494a4c8f"),
    key: "name",
  },
  {
    title: i18n.global.t("lang-75200a6e-e148-4665-9633-456fa1dca337"),
    key: "status",
  },
  {
    title: i18n.global.t("lang-ac03bd59-de6a-4baa-bb3b-c48e93959e66"),
    key: "moderator",
  },
  {
    title: i18n.global.t("lang-7df3b416-8fb4-4bc9-b88b-d8b734c96cbb"),
    key: "date",
  },
  {
    title: i18n.global.t("lang-9e7ab341-0291-4da5-a9e1-c24006a8a712"),
    key: "action",
  },
]);

const currentStatus = computed(() =>
  Number(tab.value) ? { statuses: [Number(tab.value)] } : {}
);

const shopStore = useShopStore();
const { t } = useI18n();
const searchTimer = ref(null);
const tab = ref("");
const isLoading = ref(false);
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
  isLoading.value = true;
  shopStore.fetchShopPagedList(params.value).finally(() => {
    isLoading.value = false;
  });
};

const shops = computed(() => shopStore.getShopPagedList.items);
const pageSize = computed(() => shopStore.getShopPagedList.pageSize);
const totalShops = computed(() => shopStore.getShopPagedList.totalCount);

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
</script>
