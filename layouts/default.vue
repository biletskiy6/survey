<template>
    <div class="default-layout">
        <Navbar/>
        <nuxt/>
    </div>
</template>


<script>

    import Navbar from '@/components/navbar';


    export default {
        mounted() {
            // Vue.use(widgets);
            // console.log("ALLO", widget.getWidgets());
        },
        // middleware: ['auth'],
        components: {
            Navbar
        }
    }

</script>
