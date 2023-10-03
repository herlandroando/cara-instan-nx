<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { AsyncData } from 'nuxt/app';
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { SelectionMethodRender } from '~/types/core_content';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';
import Image from 'primevue/image';
import Panel from 'primevue/panel';

const props = defineProps<{
    // type: 'document' | 'media' | 'it' | 'other',
    image?: string,
    alt?: string,
    text?: string
    md?: string
    unique?: string
    step?: string
    selection?: SelectionMethodRender[]
}>()
const emit = defineEmits<{
    (event: 'changeStep', step: string): void
}>()
const router = useRouter();
const mdQuery = ref<_AsyncData<ParsedContent, null>>();

const header = ref<HTMLElement | null>(null);

// const mdRender = computed(() => {
//     if (mdQuery.value && mdQuery.value?.data?.value) {
//     console.log(mdQuery.value, 'MD Render Variable');
//         return mdQuery.value.data.value;
//     }
//     return null;
// });
const mdRender = ref();

const labelStep = computed(() => {
    if (props.step) {
        return 'Step ' + props.step;
    }
    return 'Step';
});

const heightContent = ref<string>('0px');

const close = () => {
    let current = router.currentRoute.value;
    // delete the last part of the path
    let path = current.path.split('/');
    path.pop();
    // don't make it push. So the back button will work
    router.replace({ path: path.join('/') });
}

const onResize = () => {
    let rem = 2.5 * 16;

    if (header.value) {
        heightContent.value = (window.innerHeight - header.value.parentElement!.clientHeight - rem) + 'px';
    }
}

const onRerender = async () => {
    mdRender.value = null;
    if (!props.md) {
        return;
    }
    mdQuery.value = await useAsyncData('md-method-' + props.unique, () => queryContent().where({
        _partial: true,
        _file: 'tips' + props.md
    }).findOne());

    if (mdQuery.value?.data) {
        mdRender.value = mdQuery.value.data;
    }
    // console.log(mdQuery.value, 'Render');
}

const onClickSelection = (selection: SelectionMethodRender) => {
    if (selection.to) {
        emit('changeStep', selection.to);
    }
}

watch(() => props.step, async (value) => {
    if (value === '') {
        return;
    }
    onRerender();
});

onMounted(() => {
    onRerender();
    onResize();
    window.addEventListener('resize', onResize);
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
})


</script>

<template>
    <Teleport to="body">
        <div class="container fixed top-0 z-20">
            <Panel class="w-screen mx-auto max-h-[100vh] h-screen" :pt="{
                header: { class: 'z-40 flex items-center justify-between border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 p-5' }
                // content: { class: 'h-fit p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80', },
            }">
                <template #header>
                    <div ref="header" class="flex flex-row justify-between items-center gap-3 px-8">
                        <Button icon="pi pi-times" severity="danger" @click="close" size="small" />
                        <h1 class="text-xl font-bold">{{ labelStep }}</h1>
                    </div>
                </template>
                <div class="flex md:flex-row flex-col md:px-8 px-0" :style="{ height: heightContent }">
                    <Image v-if="image" :src="image" :alt="alt" preview
                        class="md:w-4/6 lg:2/6 w-full h-auto object-cover my-auto" :pt="{
                            toolbar: { class: 'z-50 bg-white dark:bg-gray-900/40 p-image-toolbar absolute top-0 right-0 flex p-4 rounded' },
                        }" />
                    <Divider layout="vertical" class="md:block hidden" />
                    <Divider layout="horizontal" class="md:hidden block" />

                    <div class="md:w-2/6 lg:4/6 w-full overflow-y-auto" :style="{ height: heightContent }">
                        <p v-if="text">{{ text }}</p>
                        <ContentRenderer v-if="mdRender" :value="mdRender" class="mx-auto content-page p-0">
                        </ContentRenderer>
                        <div class="flex flex-col gap-2 mt-3">
                            <Button v-for="select in selection" :key="select.to" :label="select.label"
                                @click="onClickSelection(select)" />
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    </Teleport>
</template>

<style scoped lang="css"></style>

