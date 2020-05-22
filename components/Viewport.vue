<template>
  <div class="survey-viewport">
    <div class="pages">
      <perfect-scrollbar class="page-horizontal-scroll" :options="scrollOptions">
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
              <div class="page" :class="{ active: activePageId === page.id }"
                   @click.stop="handleSelectPage(page.id)"
                   :key="page.id" v-for="(page, index) in pageStore">
                <vs-button color="primary" class="btn-drag" type="flat" icon="drag_indicator"></vs-button>


                <div class="page-content"> Page {{ index + 1 }}</div>


                <vs-dropdown>
                  <vs-button class="btn-drop" color="primary" type="flat" icon="more_horiz"></vs-button>
                  <vs-dropdown-menu class="pages-more">
                    <vs-dropdown-item v-if="index > 0">
                      <vs-button color="danger" @click.stop="handleDelete(page.id)" type="flat"
                                 icon="delete"></vs-button>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <vs-button color="primary" @click.stop="handleCopy(page.id)" type="flat"
                                 icon="file_copy"></vs-button>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition-group>
          </draggable>

          <vs-button class="new-page" color="dark" @click="handleAddPage" icon="add" type="filled">New Page</vs-button>

        </div>
      </perfect-scrollbar>
      <div class="mb-3">


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

    <!--        <div class="survey-viewport-empty" v-else>-->
    <!--            <div class="survey-viewport-empty-content">-->
    <!--                <h3 class="fw-b">Please choose a question from the Toolbar.</h3>-->
    <!--                <img :src="require(`~/assets/icons/cloud.svg`)"/>-->
    <!--            </div>-->
    <!--        </div>-->
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
        scrollOptions: {
          suppressScrollY: true,
          useBothWheelAxes: true
        }

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
