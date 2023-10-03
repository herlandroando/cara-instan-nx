<script setup lang="ts">
import { StepComponent, StepMethod } from '~/types/core_content';

const props = defineProps<{
    type: 'document' | 'media' | 'it' | 'other',
    slug: string,
    method: string
}>()

const router = useRouter();

const tipsMethodQuery = useAsyncData('tips-' + props.type + '-' + props.slug + '-' + props.method, () =>
    queryContent('/tips/' + props.type).where({
        _partial: true,
        _file: 'tips/' + props.type + '/' + props.slug + '/_' + props.method + '/index.json'
    }).findOne());

const methodObject = computed<StepMethod | null>(() => {
    console.log(tipsMethodQuery.data.value, 'ViewTipsSingle');
    if (tipsMethodQuery.data.value) {
        return tipsMethodQuery.data.value as StepMethod;
    }
    return null;
});
const uniqueComponent = computed(() => {
    return props.type + '-' + props.slug + '-' + props.method + '-' + selectedStep.value;
})

const md = ref();
const selectedStep = ref<string>('');
const selectedStepIndex = ref<number>(0);
const stepList = ref<StepComponent[]>([]);

// const component = ref<string | null>()

watch(() => methodObject.value, async (value) => {
    console.log(value, 'ViewTipsSingle');
    if (value === null) {
        return;
    }

    stepList.value = value.body as StepComponent[];

    if (stepList.value.length > 0) {
        selectedStepIndex.value = 0;
        selectedStep.value = stepList.value[selectedStepIndex.value].step;
    }
});

watch(() => selectedStep.value, (value) => {
    if (value === '') {
        showError({ statusCode: 404, message: 'Step tidak ditemukan' });
        return;
    }
    // searchStep(value);
});

const searchStep = (step: string, throwing: boolean = true) => {
    const index = stepList.value.findIndex((value) => value.step === step);
    if (index === -1) {
        if (throwing) {
            showError({ statusCode: 404, message: 'Step tidak ditemukan' });
        }
        return;
    }
    selectedStepIndex.value = index;
    selectedStep.value = step;
}

const onPressKeyLeft = (event: KeyboardEvent | MouseEvent) => {
    if (selectedStepIndex.value === 0) {
        return;
    }
    let d = stepList.value[selectedStepIndex.value];
    if (d.overridePrevTo) {
        searchStep(d.overridePrevTo);
        return;
    }

    searchStep(stepList.value[selectedStepIndex.value - 1].step);
}

const onPressKeyRight = (event: KeyboardEvent | MouseEvent) => {
    if (selectedStepIndex.value === stepList.value.length - 1) {
        return;
    }
    let d = stepList.value[selectedStepIndex.value];
    if (d.overrideNextTo) {
        searchStep(d.overrideNextTo);
        return;
    }

    searchStep(stepList.value[selectedStepIndex.value + 1].step);
}
</script>

<template>
    <div class="relative">
        <!-- <Teleport to="body"> -->
        <div class="button-prev-container" @keyup.left="onPressKeyLeft" @click="onPressKeyLeft">
            <div class="prev">
                <i class="pi pi-chevron-left"></i>
            </div>
        </div>
        <div class="button-next-container" @keyup.right="onPressKeyRight" @click="onPressKeyRight">
            <div class="next">
                <i class="pi pi-chevron-right"></i>
            </div>
        </div>
        <!-- </Teleport> -->
        <div class="container" v-if="stepList">
            <!-- <ContentRenderer v-if="stepList" :value="stepList[selectedStepIndex]" /> -->
            <ViewMethodRender v-if="stepList[selectedStepIndex]?.component" @change-step="searchStep"
                :text="stepList[selectedStepIndex]?.text" :image="stepList[selectedStepIndex]?.image"
                :alt="stepList[selectedStepIndex]?.alt" :md="stepList[selectedStepIndex]?.md" :unique="uniqueComponent"
                :step="selectedStep" :selection="stepList[selectedStepIndex]?.selection" />
        </div>
    </div>
</template>

<style scoped>
.button-prev-container:hover,
.button-next-container:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.button-prev-container:hover .prev,
.button-next-container:hover .next {
    border-radius: 100%;
    padding: 0.75em;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
}

.button-prev-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 30;
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
}


.button-next-container {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 30;
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
}
</style>