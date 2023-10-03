<template>
    <div class="py-[3rem] px-[2rem]">
        <div class=" flex flex-col items-center justify-center text-center my-4">
            <h1 class="typewrite text-3xl font-bold"><span class="wrap"></span></h1>
            <h3 class="mt-3 text-xl">Tapi bingung caranya?</h3>
            <p class="mt-6">
                Website ini ada untuk menjawab kebingungan anda. Kami mempunyai list
                website atau aplikasi yang akan memudahkan anda dalam bekerja.
            </p>
        </div>
        <div class="my-10">
            <h1 class="text-2xl font-bold text-center mb-5">Tips Terbaru</h1>
            <div class="flex flex-row flex-wrap justify-center gap-3">
                <template v-if="recentTips === 'wait'">
                    <Skeleton class="mb-4 w01/4 h-40" v-for="i in 4" :key="i + 'Skel'" />
                </template>
                <template v-else-if="recentTips === null || recentTips.length === 0">
                    <p class="text-center">Tidak ada tips terbaru.</p>
                </template>
                <template v-else>
                    <Card v-for="tip in recentTips" :key="tip._id" class="w-1/4">
                        <template #title>
                            <p>{{ tip.title }}</p>
                            <small class="mb-2 text-sm font-normal">{{ labelTypeTips(tip._dir) }}</small>
                        </template>
                        <template #content>
                            <p>
                                {{ tip?.description.substring(0, 100) + '...' ?? 'Tidak ada deskripsi' }}
                            </p>
                        </template>
                    </Card>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import Skeleton from 'primevue/skeleton';
import Card from 'primevue/card';

const recentTips = ref<ParsedContent[] | null | 'wait'>('wait');

onMounted(async () => {
    initTypewrite();
    const { data } = await useAsyncData('home', () => queryContent('/tips').where({
        _dir: { $ne: '' },
        _partial: false
    }).limit(8).find());
    recentTips.value = data.value;
    console.log(data.value);
});

const labelTypeTips = (type: string) => {
    switch (type) {
        case 'document':
            return 'Dokumen';
        case 'media':
            return 'Media';
        case 'it':
            return 'Dunia IT';
        default:
            return 'Lainnya';
    }
};

const TxtType = function (el: HTMLElement, toRotate: string[], period: number | string) {
    // @ts-ignore
    this.toRotate = toRotate; this.el = el; this.loopNum = 0; this.period = parseInt(period as string, 10) || 2000; this.txt = ""; this.tick(); this.isDeleting = false;
};

function initTypewrite() {
    TxtType.prototype.tick = function () {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    const dataper: string[] = [
        "Ingin Mengkonversi PDF Ke Word?",
        "Ingin Memotong Musik atau Video?",
        "Ingin Buat Game Tanpa Kode?",
    ];

    const elements = document.getElementsByClassName("typewrite") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elements.length; i++) {
        const toRotate = dataper;
        const period = 2000;
        if (toRotate) {
            // @ts-ignore
            new TxtType(elements[i], toRotate, period);
        }
    }

    // INJECT CSS
    const css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
}

</script>

<style></style>