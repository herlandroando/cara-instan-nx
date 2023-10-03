<template>
    <Card @click="onClickCard" class="cursor-pointer">
        <template #header>
            <img :src="image" alt="vendor" class="w-full h-32 object-cover rounded-tr rounded-tl p-4" :class="{
                'bg-gray-100': true
            }" />
        </template>
        <template #title>
            <p>{{ props.label }}</p>
        </template>
    </Card>
</template>

<script async setup lang="ts">
import Card from 'primevue/card';

const props = defineProps<{
    label: string
    slug: string
}>()
// label="I Love PDF", key="i-love-pdf"

console.log(props);
const router = useRouter();

const vendor = await useAsyncData('vendor-' + props.slug, () => queryContent('/_vendor/' + props.slug).findOne());

const image = computed(() => {
    if (vendor.data.value) {
        return vendor.data.value.image;
    }
    return '';
});

const onClickCard = () => {
    router.push(router.currentRoute.value.path + '/' + props.slug);
}
</script>