<template>
    <Header></Header>
    <main class="max-w-4xl w-full flex flex-col px-8 mx-auto">
        <div class="flex justify-between items-center my-8">
            <h1 class="text-2xl font-bold font-poppins">
                Sala 
            </h1>
        </div>
        <textarea
            placeholder="Qual sua pergunta?"
            class="w-full resize-none rounded p-4 text-lg leading-relaxed shadow-md"
        ></textarea>
        <div class="flex justify-between items-center my-8">
            <p v-if="true">
                Para enviar uma pergunta
                <button>faça seu login</button>
            </p>
            <div class="w-44">
                <Button></Button>
            </div>
        </div>
        <div>
            
        </div>
    </main>
</template>
