<script lang="ts" setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 w-full rounded disabled:bg-violet-200"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>
