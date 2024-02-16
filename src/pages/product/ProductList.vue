<template>
  <div class="product-list-container">
    <h2 class="head-title">{{ $t('lang-9839245b-e40e-4ae1-92e9-0421dc97a154') }}</h2>
    <FilterSearch/>
    <STable
        :headers="headers"
        :data="tableData"
        totalItems="50"
        itemsPerPage="5"
        paginateRange="2"
        @onSelectPage="onChangePage"
    >
      <template v-slot:status="{item}">
        <SBadge :content="item.status.name" :color="item.status.color"/>
      </template>
      <template v-slot:action="{item}">
        <router-link :to="{name: 'productDetail', params: {id: item.id}}">
          {{ $t('lang-23981bea-cba2-425d-a435-41ae4a591794') }}
        </router-link>
      </template>
    </STable>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton, SIconRender, STable, SBadge } from "@tumarsoft/ogogo-ui";
import FilterSearch from "../../widgets/filter-search/FilterSearch.vue";
import { ref, reactive } from "vue";

const headers = reactive([
  {title: "Товар", key: "product"},
  {title: "Продавец", key: "name"},
  {title: "Статус", key: "status"},
  {title: "Дата", key: "date"},
  {title: "Действия", key: "action"}
]);

const tableData = reactive([
  {
    id: 1,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: {name: "На проверке", color: "orange"},
    name: "Планета электроники",
    date: "01.01.24"
  },
  {
    id: 2,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: {name: "Модерируется", color: "blue"},
    name: "Gadget.kg",
    date: "02.02.24"
  },
  {
    id: 3,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: {name: "Проверен", color: "green"},
    name: "Моби-маркет",
    date: "03.03.24"
  },
  {
    id: 4,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: {name: "Отклонен", color: "rose"},
    name: "Софтек",
    date: "04.04.24"
  }
]);

const onChangePage = (page) => {
  console.log(page);
}
</script>

<style lang="scss">

</style>