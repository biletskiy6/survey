<template>
    <div class="container">
        <div>
<!--            <toolbar/>-->

<!--            <viewport/>-->
        </div>
    </div>
</template>

<script>
    import Logo from '@/components/Logo.vue';
    import Toolbar from '@/components/Toolbar';
    import Viewport from '@/components/Viewport';


    export default {
        components: {
            Toolbar,
            Viewport,
            Logo
        },
        computed: {
            widgetStore() {
                return this.$store.getters.widgets;
            },
        }
    }
</script>
