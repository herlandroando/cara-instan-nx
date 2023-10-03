
<script setup lang="ts">
import Skeleton from 'primevue/skeleton';

</script>

<template>
    <h2>List Metode:</h2>
    <div class="flex flex-row gap-2 mb-6">
        <Suspense>
            <template #default>
                <slot>
                    Belum ada cara yang rilis untuk tips ini.
                </slot>
            </template>
            <template #fallback>
                <div>
                    <Skeleton class="w-1/4 h-40" />
                    <Skeleton class="w-1/4 h-40" />
                    <Skeleton class="w-1/4 h-40" />
                    <Skeleton class="w-1/4 h-40" />
                </div>
            </template>
        </Suspense>
    </div>
</template>