<script lang="ts" setup>
defineProps({
    placeholder: String,
    model: [String, Number],
});
const value = ref("");
function input() {
    $emit("update:model", value);
}
</script>

<template>
    <input
        class="border border-gray-300 py-3 px-4 rounded mb-2"
        type="text"
        v-model="value"
        :placeholder="placeholder"
    />
</template>
