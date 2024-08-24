<template>
    <div class="flex min-h-screen">
        <Aside></Aside>
        <main class="basis-1/2 flex justify-center items-center">
            <div class="max-w-80 w-full flex flex-col">
                <a href="/" class="mx-auto mb-20">
                    <img width="170" src="~/assets/img/logo.svg" alt="Cruel doubt" />
                </a>
                <h2 class="text-center font-poppins font-bold text-2xl mb-4">
                    Criar uma nova sala
                </h2>
                <Input />
                <Button></Button>

                <p class="text-gray-400 text-sm mt-4">
                    Quer entrar em uma sala existente?
                    <NuxtLink to="/" class="text-purple-600">clique aqui</NuxtLink>
                </p>
            </div>
        </main>
    </div>
</template>