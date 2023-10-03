<template>
    <Card class="cursor-pointer w-1/4" @click="onClickCard">
        <template v-if="image" #header>
            <img :src="image" alt="tips" class="w-full h-32 object-cover rounded-tr rounded-tl" />
        </template>
        <template #title>
            <p class="text-lg">{{ title }}</p>
            <small class="mb-2 text-sm font-normal">{{ labelCategory(category ?? '') }}</small>
        </template>
        <template #content>
            <p class="text-base">
                {{ labelDescription }}
            </p>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import { labelCategory } from '~/assets/content-helper';

const props = defineProps<{
    image?: string,
    title?: string,
    description?: string,
    category?: string,
    slug?: string
}>()

const router = useRouter();

const labelDescription = computed(() => {
    if (!props.description) {
        return 'Tidak ada deskripsi';
    }

    if (props.description.length > 100) {
        return props.description.substring(0, 100) + '...';
    }

    return props.description;
});

const onClickCard = () => {
    router.push('/tips/' + props.category + '/' + props.slug);
}

</script>