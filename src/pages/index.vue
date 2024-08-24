<script lang="ts" setup>
const route = useRoute()

</script>
<template>
  <div class="flex min-h-screen">
    <Aside></Aside>
    <main class="basis-1/2 flex justify-center items-center">
      <div class="max-w-80 w-full flex flex-col">
        <img class="mx-auto mb-20" width="170" src="~/assets/img/logo.svg" alt="Cruel doubt" />
        <NuxtLink to="/room/new" class="text-center border border-black hover:bg-gray-50 py-2 rounded">
          "Crie sua sala"
        </NuxtLink>
        <div class="flex justify-center items-center my-8">
          <hr class="basis-1/5" />
          <p class="text-gray-300 basis-3/5 text-center">"ou entre em uma sala"</p>
          <hr class="basis-1/5" />
        </div>
        <Input />
        <Button></Button>
      </div>
    </main>
  </div>
</template>
