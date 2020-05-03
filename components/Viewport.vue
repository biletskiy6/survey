<template>
    <div class="survey-viewport">
        <draggable v-if="widgetStore.length"  @drag.prevent @change="onUnpublishedChange" v-model="widgetStore" draggable=".item">
            <component
                    v-for="(val, index) in widgetStore"
                    :key="val.uuid"

                    :is="val.type"
                    :val="val"
                    :data-uuid="val.uuid"
                    class="item"/>

        </draggable>

        <div class="survey-viewport-empty" v-else>
            <div class="survey-viewport-empty-content">
                <h3>Please drop a question here from the Toolbox.</h3>
                <img :src="require(`~/assets/icons/cloud.svg`)"/>
            </div>

        </div>
        <!--        <component-->
        <!--                v-for="val in widgetStore"-->
        <!--                :is="val.type"-->
        <!--                :data-title="val.type"-->
        <!--                :key="val.uuid"-->
        <!--                :val="val"-->
        <!--                :data-type="val.type"-->
        <!--                :data-uuid="val.uuid"-->
        <!--                class="layer"/>-->
    </div>
</template>

<script>

    import draggable from 'vuedraggable'

    export default {
        data() {
            return {
                test: [],
                widgetStore: [],
            }
        },
        name: "Viewport",
        mounted() {
            this.widgetStore = this.$store.getters['widget/widgets'];

            document
                .querySelector('.survey-viewport')
                .addEventListener('mousedown', this.handleSelection, false)

        },
        computed: {
            // widgetStore() {
            //     return this.$store.getters['widget/widgets'];
            // }
        },
        methods: {
            onUnpublishedChange(param) {
                // console.log(this.widgetStore);
                //update state
                // alert(1);

                this.$store.dispatch("widget/updateWidgets", this.widgetStore);
                // this.widgetStore = this.$store.getters['widget/widgets'];
                this.$forceUpdate();
            },
            handleSelection(e) {
                console.log(e.target);
                // this.$store.dispatch("widget/select", uuid);
            }
        },
        watch: {
            widgetStore(val) {
                console.log("WIDGET STORE", val)
                console.log("WIDGET STORE STATE", this.$store.getters['widget/widgets'])

            }
        },
        components: {
            draggable
        }
    }
</script>

<style scoped>

</style>
