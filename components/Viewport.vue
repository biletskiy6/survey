<template>
  <div class="survey-viewport">
    <div class="pages">
      <div class="pages-wrapper">

        <div class="page" :class="{ active: activePageId === page.id }" @click.stop="handleSelectPage(page.id)"
             :key="page.id" v-for="(page, index) in pages">

          <div v-if="index > 0 && activePageId === page.id" class="page-toolbar">
            <vs-button color="danger" @click.stop="handleDelete(page.id)" type="line" icon="delete"></vs-button>
            <vs-button color="primary" @click.stop="handleCopy(page.id)" type="line" icon="file_copy"></vs-button>
          </div>

          <div class="page-content"> Page {{ index + 1 }}</div>

        </div>
      </div>
      <div>

        <vs-button color="primary" @click="handleAddPage" type="gradient">New Page</vs-button>

      </div>
    </div>

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
          <WidgetToolbar @click="handleClick(val.uuid)" :widgetUuid="val.uuid"/>
          <component
            @click.native="handleClick(val.uuid)"
            class="widget"
            :is="val.type"
            :isDev="true"
            :widgetIdx="index"
            :val="val"
            :formData="formData"
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
    beforeCreate() {
      this.$store.commit('widget/setActivePage');
    },
    data() {
      return {
        formData: {},
      }
    },
    computed: {
      pageWidgetsLength: {
        get() {
          return this.$store.getters['widget/pageWidgetsLength'];
        }
      },
      pages() {
        return this.$store.getters['widget/pages'];
      },
      id() {
        return this.$store.getters['widget/uuid'];
      },
      activePageId() {
        return this.$store.getters['widget/activePageId'];
      },
      widgetStore: {
        get() {
          return this.$store.getters['widget/pageWidgets'];
        },
        set(value) {
          this.$store.commit('widget/updateStoreWidgets', value);
        }
      }
    },
    watch: {
      widgetStore(value) {
        this.formData = this.$store.getters['widget/widgetsUuid'];
        console.log(this.formData);
      }
    },
    methods: {
      handleCopy(uuid) {
        this.$store.commit('widget/copyPage', uuid);
      },
      handleDeletePage() {
        alert(1);
      },
      handleDelete(uuid) {
        this.$store.commit('widget/deletePage', uuid);
      },
      handleSelectPage(uuid) {
        this.$store.commit('widget/selectPage', uuid);
      },
      handleAddPage() {
        this.$store.commit('widget/addNewPage');
      },
      onUnpublishedChange(param) {
        // console.log(this.widgetStore);
        //update state
        // alert(1);

        // this.$store.dispatch('widget/updateWidgets', this.widgetStore);
        // this.widgetStore = this.$store.getters['widget/widgets'];
      },
      handleClick(uuid) {
        this.$store.commit('widget/select', {uuid});
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
