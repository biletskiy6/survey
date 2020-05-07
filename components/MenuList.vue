<template>
    <ul class="main-menu-list">
        <li>
            <nuxt-link exact :to="localePath('/')">
                <span class="menu-icon">
                    <vs-icon icon="home"></vs-icon>
                </span>
                <span>
                    {{ $t('navbar.overview') }}
               </span>
            </nuxt-link>
        </li>
        <li>
            <nuxt-link exact :to="localePath('/survey')">
                <span class="menu-icon">
                    <vs-icon icon="add"></vs-icon>
                </span>
                <span>
                    {{ $t('navbar.newSurvey') }}
               </span>
            </nuxt-link>
        </li>
<!--        <li>-->
<!--            <nuxt-link :to="localePath('/layout')">-->
<!--                 <span class="menu-icon">-->
<!--                    <vs-icon icon="code"></vs-icon>-->
<!--                </span>-->
<!--                <span>-->
<!--                    {{ $t('navbar.layout') }}-->
<!--                </span>-->
<!--            </nuxt-link>-->
<!--        </li>-->

    </ul>
</template>

<script>
    export default {
        name: "MenuList",

        mounted() {

        },
        data() {

            return {
                menuList: [
                    {id: "1", title: this.$t('navbar.overview'), path: "/"},
                    {id: "2", title: this.$t('navbar.layout'), path: "/layout"},
                ]
            }
        },
    }
</script>

<style scoped>

</style>
