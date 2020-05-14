<template>
  <div class="survey-viewport">
    <draggable
      v-if="widgetStore.length"
      @change="onUnpublishedChange"
      v-model="widgetStore"
      @start="isDragging = true"
      @end="isDragging = false"
      draggable=".item"
      handle=".btn-drag"
    >
      <transition-group type="transition" name="flip-list">
      <div
        class="widget-list d-flex fd-c item"
        :class="{ active: id === val.uuid }"
        :key="val.uuid"
        v-for="(val, index) in widgetStore"
      >
        {{ val }}
        <WidgetToolbar :widgetUuid="val.uuid"/>
        <component
          class="widget"
          :is="val.type"
          :isDev="true"
          :widgetIdx="index"
          :val="val"
          :readonly="true"
          :data-uuid="val.uuid"
        />
      </div>
      </transition-group>
    </draggable>

    <div class="survey-viewport-empty" v-else>
      <div class="survey-viewport-empty-content">
        <h3>Please choose a question from the Toolbar.</h3>
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
  import draggable from 'vuedraggable';
  import WidgetToolbar from '@/components/widgets/WidgetToolbar';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Viewport',
    mounted() {
    },
    data() {
      return {
        formData: [],
      };
    },
    computed: {
      id() {
        return this.$store.getters['widget/uuid'];
      },
      widgetStore: {
        get() {
          return this.$store.getters['widget/widgets'];
        },
        set(value) {
          this.$store.dispatch('widget/updateWidgets', value);
        }
      }
      // widgetStore() {
      //     return this.$store.getters['widget/widgets'];
      // }
    },
    watch: {
      widgetStore(value) {
        this.formData = this.$store.getters['widget/widgetsUuid'];
        console.log(this.formData);
      }
    },
    methods: {
      onUnpublishedChange(param) {
        // console.log(this.widgetStore);
        //update state
        // alert(1);

        this.$store.dispatch('widget/updateWidgets', this.widgetStore);
        // this.widgetStore = this.$store.getters['widget/widgets'];
      },
      handleSelect(uuid) {
        this.$store.commit('widget/select', {uuid});
      }
    },

    components: {
      draggable,
      WidgetToolbar
    }
  };
</script>

<style scoped>

</style>
