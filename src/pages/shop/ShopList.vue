<template>
  <div class="shop-container">
    <h2 class="head-title">{{ $t('lang-dec7f483-cf4a-406a-8241-bfeb9cf1baef') }}</h2>
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
        <router-link :to="{name: 'shopDetail', params: {id: item.id}}">
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
  {title: "Магазин", key: "name"},
  {title: "Статус", key: "status"},
  {title: "Модератор", key: "moderator"},
  {title: "Дата", key: "date"},
  {title: "Действия", key: "action"}
]);

const tableData = reactive([
  {
    id: 1,
    moderator: "Марат А.",
    status: {name: "На проверке", color: "orange"},
    name: "Планета электроники",
    date: "01.01.24"
  },
  {id: 2, moderator: "Азамат А.", status: {name: "Модерируется", color: "blue"}, name: "Gadget.kg", date: "02.02.24"},
  {id: 3, moderator: "Алина А.", status: {name: "Проверен", color: "green"}, name: "Моби-маркет", date: "03.03.24"},
  {id: 4, moderator: "Не назначен", status: {name: "Отклонен", color: "rose"}, name: "Софтек", date: "04.04.24"}
]);

const onChangePage = (page) => {
  console.log(page);
}
</script>

<style lang="scss">

</style>