<template>
    <div v-if="tips === null"></div>
    <ContentRenderer v-else-if="component === 'md' && md" :value="md">
    </ContentRenderer>
    <template v-else-if="component === 'html'">
        <div v-html="tips?.content.html"></div>
    </template>
    <template v-else-if="component === 'text'">
        <p>{{ tips?.content.text }}</p>
    </template>
    <div v-else>
        Mohon menunggu...
    </div>
</template>

<script setup lang="ts">
import { TipsContent } from '~/types/core_content';

const props = defineProps<{
    type: 'document' | 'media' | 'it' | 'other',
    slug: string
}>()

const router = useRouter();

const tipsQuery = useAsyncData('tips-' + props.type + '-' + props.slug, () => queryContent('/tips').where({
    _dir: props.type,
    _partial: false
}).findOne());

const md = ref();

const tips = computed<TipsContent | null>(() => {
    if (tipsQuery.data.value) {
        return tipsQuery.data.value as TipsContent;
    }
    return null;
});

const component = ref<string | null>()

watch(() => tips.value, async (value) => {
    console.log(value, 'ViewTipsSingle');
    if (value === null) {
        return;
    }

    component.value = value.content?.component;


    if (component.value === 'md') {
        console.log('tips-md-' + props.slug, 'tips/' + props.type + '/' + props.slug, 'tips' + value.content.md)
        md.value = await useAsyncData('tips-md-' + props.slug, () => queryContent('tips/' + props.type + '/' + props.slug).where({
            _partial: true,
            _file: 'tips' + value.content.md!
        }).findOne());
        md.value = md.value.data;
    }
});

// onMounted(async () => {
//     const test = await useAsyncData('test', () => queryContent('tips/document/konversi-pdf-ke-dokumen').where({
//         _partial: true,
//         _file: 'tips/document/konversi-pdf-ke-dokumen/_intro.md',
//         // _dir: 'konversi-pdf-ke-dokumen',
//     }).find());

//     console.log(test.data.value);
// });

</script>