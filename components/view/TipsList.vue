<template>
    <div>
        <h1 class="text-xl font-bold my-6">Tips - {{ labelCategory(type) }}</h1>
        <div class="flex flex-row flex-wrap">
            <!-- <template v-if="tips === 'wait'">
            <Skeleton class="mb-4 w-1/4 h-40" v-for="i in 4" :key="i + 'Skel'" />
        </template> -->
            <template v-if="tips.length === 0">
                <p class="text-center">Tidak ada tips.</p>
            </template>
            <template v-else>
                <CardTips v-for="tip in tips" :key="tip._id" :title="tip.title" :description="tip.description"
                    :category="tip._dir" :slug="tip.slug" :image="tip.main_image" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { labelCategory } from '~/assets/content-helper';
import { TipsContent } from '~/types/core_content';

const props = defineProps<{
    type: string,
}>()

const isReady = ref(false);

const tipsQuery = useAsyncData('tips-' + props.type, () => queryContent('/tips').where({
    _dir: props.type,
    _partial: false
}).find());

const tips = computed(() => {
    if (tipsQuery.data.value) {
        return tipsQuery.data.value as TipsContent[];
    }
    return [];
});

watch(() => tips.value, (value) => {
    console.log(value);
});
</script>