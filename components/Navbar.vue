<template>
    <nav class="main-navbar">
        <Logo/>
        <MenuList/>
        <LanguageSwitcher/>
    </nav>
</template>

<script>
    import Logo from '@/components/Logo';
    import LanguageSwitcher from '@/components/LanguageSwitcher';
    import MenuList from '@/components/MenuList';
    export default {
        name: "Navbar",
        components: {
          Logo,
            LanguageSwitcher,
            MenuList
        },

    }
</script>

<style>

</style>
