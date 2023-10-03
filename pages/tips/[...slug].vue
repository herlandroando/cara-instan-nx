<template>
  <Breadcrumb :home="home" :model="breadcrumbItems" class="my-6 mx-6">
    <template #item="{ item, label, props }">
      <a href="#" class="dark:text-gray-200 dark:hover:text-gray-500 text-gray-500 hover:text-gray-900"
        @click="item.command">
        <i :class="item.icon" v-if="item.icon" class="mr-2 text-gray-400"></i>{{ label }}
      </a>
    </template>
  </Breadcrumb>

  <ViewTipsList class="mx-6" v-if="typePage === 'tips-list'" :type="tipsType" />
  <ViewTipsSingle v-else-if="typePage === 'tips-view'" :type="(tipsType as 'document' | 'media' | 'it')" :slug="tipsSlug"
    class="content-page" />
  <ViewTipsMethod v-else-if="typePage === 'tips-method'" :type="(tipsType as 'document' | 'media' | 'it')"
    :slug="tipsSlug" :method="tipsMethod" class="content-page" />
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import { PrimeIcons } from 'primevue/api';
import { MenuItem } from 'primevue/menuitem';
import { labelCategory, slugToTitle } from '~/assets/content-helper';

const router = useRouter();
const typeAvailable = ['document', 'media', 'it', 'other'];
const home: MenuItem = {
  icon: PrimeIcons.HOME,
  command: () => router.push('/'),
}

const breadcrumbItems = ref<MenuItem[]>([

]);

const tipsType = computed(() => {
  // check if router is available
  if (!('slug' in router.currentRoute.value.params)) {
    return '';
  }
  if (router.currentRoute.value.params.slug.length === 0 || !typeAvailable.includes(router.currentRoute.value.params.slug[0])) {
    showError({ statusCode: 404, message: 'Tipe tips tidak ditemukan' });
    return '';
  }
  return router.currentRoute.value.params.slug[0];
});

const tipsSlug = computed(() => {
  if (!('slug' in router.currentRoute.value.params)) {
    return '';
  }
  console.log(router.currentRoute.value.params.slug);
  if (router.currentRoute.value.params.slug.length > 1) {
    return router.currentRoute.value.params.slug[1];
  }

  return '';
});

const tipsMethod = computed(() => {
  if (!('slug' in router.currentRoute.value.params)) {
    return '';
  }
  if (router.currentRoute.value.params.slug.length > 2) {
    return router.currentRoute.value.params.slug[2];
  }

  return '';
});

const typePage = computed(() => {
  let t = 'unknown'
  breadcrumbItems.value = [];
  if (tipsType.value !== '') {
    t = 'tips-list';
    breadcrumbItems.value.push({
      label: labelCategory(tipsType.value),
      // icon: PrimeIcons.LIST,
      command: () => router.push('/tips/' + tipsType.value)
    })
  }

  if (tipsSlug.value !== '') {
    t = 'tips-view';
    breadcrumbItems.value.push({
      label: slugToTitle(tipsSlug.value),
      command: () => router.push('/tips/' + tipsType.value + '/' + tipsSlug.value)
    })
  }

  if (tipsMethod.value !== '') {
    t = 'tips-method';
    breadcrumbItems.value.push({
      label: slugToTitle(tipsMethod.value),
      command: () => router.push('/tips/' + tipsType.value + '/' + tipsSlug.value + '/' + tipsMethod.value)
    })
  }

  return t;
})

// watch([tipsMethod, tipsSlug, tipsType], ([method, slug, type]) => {
//   let t = 'unknown';
//   if (type !== '') {
//     t = 'tips-list'
//   }

//   if (slug !== '') {
//     t = 'tips-view'
//   }

//   if (method !== '') {
//     t = 'tips-method'
//   }

//   typePage.value = t as 'tips-list' | 'tips-view' | 'tips-method' | 'unknown';
//   console.log(typePage.value);
// })

// onMounted(() => {
//   console.log(tipsType.value);
//   console.log(tipsSlug.value);
//   console.log(tipsMethod.value);
// });
</script>