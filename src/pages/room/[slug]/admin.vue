<script lang="ts" setup>
const route = useRoute();

import { socket } from "~/lib/socket";

const questions = ref([]);

onMounted(() => {
    socket.emit("join-room", {
        roomId: route.params.slug,
    });

    socket.on("all-questions", (messageValue) => {
        try {
            console.log(messageValue);
            questions.value = messageValue;
        } catch (e) {
            console.error(e);
        }
    });
    socket.on("new-question", (messageValue: string) => {
        try {
            console.log(messageValue);
            questions.value.push(messageValue);
        } catch (e) {
            console.error(e);
        }
    });
});

onBeforeUnmount(() => {
    socket?.disconnect();
});
</script>
<template>
    <div class="bg-gray-50 min-h-screen">
        <HeaderRoom :code="route.params.slug" :isAdmin="true" />
        <main class="max-w-4xl w-full flex flex-col px-8 mx-auto">
            <div class="flex gap-4 items-center my-8">
                <h1 class="text-2xl font-bold font-poppins">Sala</h1>
                <span
                    class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-600 text-white"
                    v-if="questions.length">
                    {{ questions.length }} perguntas
                </span>
            </div>
            <ul>
                <QuestionCard v-for="q in questions" :key="q" :question="q">
                    <div class="flex justify-between items-center gap-2">
                        <span class="text-gray-600">
                            {{ q.like_count }}
                        </span>
                        <button class="text-purple-600">
                            <LucideThumbsUp />
                        </button>
                    </div>
                </QuestionCard>
            </ul>
        </main>
    </div>
</template>
