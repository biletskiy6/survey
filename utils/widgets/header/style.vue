<template>
  <div>
    <BaseSettings :activeElement="activeElement"/>


    <div class="settings-gutter">
      <vs-checkbox v-model="separatorLine">Show separator line below to the survey title</vs-checkbox>
    </div>


    <transition name="fadeHeight">

      <div class="settings-gutter" v-if="separatorLine">
        <div>
          <vs-divider>
            <h6 class="fw-b">Separator Line Color</h6>
          </vs-divider>
          <color-picker :width="170" :height="170" v-model="separatorColorLine"></color-picker>
        </div>


        <div>
          <vs-divider>
            <h6 class="fw-b">Separator Line Height</h6>
          </vs-divider>
          <vs-slider icon="zoom_in" :min="1" :max="10" v-model="separatorLineHeight"/>

        </div>


      </div>
    </transition>


    <div class="settings-container">
      <vs-divider/>
      <div class="header-font-size">
        <h6 class="fw-b">Header Font Size:</h6>
        <vs-divider/>
        <div class="d-flex ai-c">
          <vs-slider icon="zoom_in" :min="18" :max="50" v-model="headerFontSize"/>
          <span class="badge"> {{ headerFontSize }}</span>
        </div>
      </div>


      <vs-divider/>
      <h5 class="fw-b">Header Alignment:</h5>
      <vs-divider/>

      <ul class="d-flex jcsb leftx">
        <li>
          <vs-radio v-model="headerAlignment" vs-name="headerAlignment" vs-value="left">Left</vs-radio>
        </li>
        <li>
          <vs-radio v-model="headerAlignment" vs-name="headerAlignment" vs-value="center">Center</vs-radio>
        </li>
        <li>
          <vs-radio v-model="headerAlignment" vs-name="headerAlignment" vs-value="right">Right</vs-radio>
        </li>
      </ul>


      <div class="header-color mb-2">
        <vs-divider/>
        <h6 class="fw-b">Header Color:</h6>
        <div style="" class="d-flex jcsb ai-c header-color-info mb-3">
          <div class="mt-3 mb-3 header-color-hex"> Hex <span class="badge ml-1">{{ headerColor }}</span></div>
          <vs-button
            v-clipboard="() => headerColor"
            v-clipboard:success="clipboardSuccessHandler"
            type="flat"
            icon="colorize"
          ></vs-button>
        </div>

        <color-picker :width="200" :height="200" v-model="headerColor"></color-picker>
        <vs-divider/>
      </div>
      <!--            <div class="d-flex ai-c">-->
      <!--                <h6 class="fw-b">Italic Style:</h6>-->
      <!--                <vs-switch class="ml-1" v-model="isHeaderItalic">-->

      <!--                </vs-switch>-->
      <!--            </div>-->
      <!--            <vs-divider/>-->

    </div>


  </div>
</template>

<script>
  import BaseSettings from "@/components/widgets/BaseSettings";
  import ColorPicker from 'vue-color-picker-wheel';

  export default {
    name: 'header-widget-style',
    props: ['activeElement'],
    data() {
      return {
        color: '#ffffff'
      }
    },
    computed: {
      separatorLineHeight: {
        get() {
          return this.$store.getters['widget/getSeparatorLineHeight'];
        },
        set(value) {
          this.$store.commit('widget/setSeparatorLineHeight', value);
        }
      },
      separatorColorLine: {
        get() {
          return this.$store.getters['widget/getSeparatorColor'];
        },
        set(value) {
          this.$store.commit('widget/setSeparatorColor', value);
        }
      },
      isHeaderItalic: {
        get() {
          return this.$store.getters['widget/isWidgetHeaderItalic'];
        },
        set(value) {
          this.$store.commit('widget/isWidgetHeaderItalic', value);
        }
      },
      headerColor: {
        get() {
          return this.$store.getters['widget/getWidgetHeaderColor'];
        },
        set(value) {
          this.$store.commit('widget/setWidgetHeaderColor', value);
        },
      },
      headerFontSize: {
        get() {
          return this.$store.getters['widget/getWidgetHeaderFontSize'];
        },
        set(value) {
          this.$store.commit('widget/setWidgetHeaderFontSize', {
            value
          });
        }
      },
      headerAlignment: {
        get() {
          return this.$store.getters['widget/getWidgetHeaderAlignment'];
        },
        set(value) {
          this.$store.commit('widget/setWidgetHeaderAlignment', {
            value
          });
        }
      },
      separatorLine: {
        get() {
          return this.$store.getters['widget/getSeparatorLineForHeaderWidget'];
        },
        set(value) {
          this.$store.commit('widget/setSeparatorLineForHeaderWidget', {
            value
          });
        }
      }
    },
    components: {
      BaseSettings,
      ColorPicker
    },
    filters: {
      toFixed: function (data) {
        return data.toFixed(1);
      }
    },
    methods: {
      clipboardSuccessHandler() {
        this.$vs.notify({
          title: `Copied color: ${this.headerColor}`,
          color: 'primary'
        });
      },
      onInput(hue) {
        this.color.hue = hue;
      },

    },
    mounted() {
      // setTimeout(() => {
      //   this.$store.commit("widget/updateWidgetText", "Updated string");
      // }, 1500);
    }
  };
</script>
<style>
  @import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
