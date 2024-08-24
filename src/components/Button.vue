<script lang="ts" setup>
const text = "Button";
const disabled = false;
</script>

<template>
  <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-3 w-full rounded disabled:bg-violet-200"
    :disabled="disabled">
    {{text}}
  </button>
</template>
