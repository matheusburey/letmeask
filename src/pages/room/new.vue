<script lang="ts" setup>
const roomTitle = ref("");

async function createNewRoom() {
    const res = await $fetch(`/api/room`, {
        method: "POST",
        body: { title: roomTitle.value.trim() },
    });
    console.log(res);
    if (res?.slug) {
        await navigateTo({ path: `/room/${res?.slug}/admin` });
    }
}
</script>
<template>
    <div class="flex min-h-screen">
        <LeftAside />
        <main class="basis-1/2 flex justify-center items-center">
            <div class="max-w-80 w-full flex flex-col">
                <a href="/" class="mx-auto mb-20">
                    <img width="170" src="~/assets/img/logo.svg" alt="Cruel doubt" />
                </a>
                <h2 class="text-center font-poppins font-bold text-2xl mb-4">
                    Criar uma nova sala
                </h2>
                <CustomInput placeholder="Digite o código da sala" v-model="roomTitle" />
                <Button @click="createNewRoom">Criar sala</Button>

                <p class="text-gray-400 text-sm mt-4">
                    Quer entrar em uma sala existente?
                    <NuxtLink to="/" class="text-purple-600">clique aqui</NuxtLink>
                </p>
            </div>
        </main>
    </div>
</template>
