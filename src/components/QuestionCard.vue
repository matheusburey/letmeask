<script lang="ts" setup>
defineProps({
  question: Object,
});
</script>

<template>
  <li class="bg-white rounded p-6 shadow-md mt-8">
    {{ question.description }}
    <div class="flex justify-between items-center mt-6">
      <div class="flex gap-2 items-center">
        <span
          class="inline-flex items-center justify-center size-8 rounded-full bg-purple-500 text-xs font-semibold text-white leading-none"
        >
          {{ question.user.name.charAt(0) }}
        </span>
        <span class="text-gray-600">{{ question.user.name }}</span>
      </div>
      <slot></slot>
    </div>
  </li>
</template>
