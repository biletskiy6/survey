<template>
    <div class="language-switcher">
        <vs-dropdown class="vs-dropdown-menu ">
            <a class="flex items-center" href="#">
                <img  :src="require(`~/assets/flags/${currentLocale[0].code}.png`)" alt="">
                <span>{{ currentLocale[0].name }}</span>

            </a>
            <vs-dropdown-menu class="language-switcher-dropdown" >
                <vs-dropdown-item v-for="locale in availableLocales">
                    <nuxt-link
                            :key="locale.code"
                            :to="switchLocalePath(locale.code)">
                        <img :src="require(`~/assets/flags/${locale.code}.png`)"/>
                        <span> {{ locale.name }}</span>
                    </nuxt-link>
                </vs-dropdown-item>
            </vs-dropdown-menu>
        </vs-dropdown>
    </div>
</template>

<script>
    export default {
        name: "LanguageSwitcher",
        computed: {
            availableLocales () {
                return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
            },
            currentLocale() {
                return this.$i18n.locales.filter(i => i.code === this.$i18n.locale)
            }
        }
    }
</script>

<style scoped>

</style>
