<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import Menubar from "primevue/menubar";

const router = useRouter();
const isContentPage = computed(() => {
    // check if current route is not index page
    return router.currentRoute.value.path !== "/";
})

const items = [
    { label: "Dokumen", icon: PrimeIcons.BOOK , to:'/tips/document'},
    { label: "Media", icon: PrimeIcons.VIDEO },
    { label: "Dunia IT", icon: PrimeIcons.DESKTOP },
    { label: "Tentang Kami", icon: PrimeIcons.INFO, to: '/about' },
];
</script>

<template>
    <header class="relative z-10">
        <Menubar :model="items" class="rounded-none">
            <template #start>
                <router-link to="/" class="flex items-center">
                    <img alt="logo" src="/assets/images/logo_ci.png" class="h-14 p-2 cursor" />
                    <span class="text-2xl font-bold mr-7 dark:text-gray-200 text-gray-800">Cara Instan!</span>
                </router-link>
            </template>
        </Menubar>
    </header>
    <main :class="{
        'dark:text-white': true,
        'text-gray-800': true,
    }">
        <slot />
    </main>
</template>
