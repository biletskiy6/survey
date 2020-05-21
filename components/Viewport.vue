<template>
  <div class="survey-viewport">
    <div class="pages">
      <div class="pages-wrapper">
        <draggable
          v-if="pageStore.length"
          @change="onUnpublishedChange"
          v-model="pageStore"
          @start="isDragging = true"
          @end="isDragging = false"
          handle=".btn-drag"
          draggable=".page"
        >
          <transition-group class="d-flex ai-fe" type="transition" name="flip-list">
            <div class="page" :class="{ active: activePageId === page.id }" @click.stop="handleSelectPage(page.id)"
                 :key="page.id" v-for="(page, index) in pageStore">

              <div v-if="index > 0 && activePageId === page.id" class="page-toolbar">
                <vs-button color="primary" class="btn-drag" type="line" icon="drag_indicator"></vs-button>
                <vs-button color="danger" @click.stop="handleDelete(page.id)" type="line" icon="delete"></vs-button>
                <vs-button color="primary" @click.stop="handleCopy(page.id)" type="line" icon="file_copy"></vs-button>
              </div>

              <div class="page-content"> Page {{ index + 1 }}</div>

            </div>
          </transition-group>
        </draggable>

      </div>
      <div class="mb-3">

        <vs-button color="primary" @click="handleAddPage" type="gradient">New Page</vs-button>

      </div>
    </div>


    <WelcomePage v-if="isWelcomePageVisible && currentPageArrayIndex === 0" :isDev="true"/>


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
<!--          <WidgetToolbar @click="handleClick(val.uuid)" :widgetUuid="val.uuid"/>-->
          <WidgetToolbar @click="handleClick(val)" :widget="val"/>
          <component
            @click.native="handleClick(val)"
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
        <h3 class="fw-b">Please choose a question from the Toolbar.</h3>
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
  import WelcomePage from '@/components/WelcomePage';

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
      currentPageArrayIndex() {
        return this.$store.getters['widget/currentPageArrayIndex'];
      },
      isWelcomePageVisible: {
        get() {
          return this.$store.getters['widget/isWelcomePageVisible'];
        }
      },
      pageWidgetsLength: {
        get() {
          return this.$store.getters['widget/pageWidgetsLength'];
        }
      },
      id() {
        return this.$store.getters['widget/uuid'];
      },
      activePageId() {
        return this.$store.getters['widget/activePageId'];
      },
      pageStore: {
        get() {
          return this.$store.getters['widget/pages'];
        },
        set(value) {
          this.$store.commit('widget/updatePageStore', value)
        }
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
      handleClick(val) {
        this.$store.commit('widget/select', val);
      },
      handleSelect(widget) {
        this.$store.commit('widget/select', widget);
      }
    },

    components: {
      draggable,
      WidgetToolbar,
      WelcomePage,
    }
  };
</script>

<style>

</style>
