<template>
  <div>
    <BaseSettings :activeElement="activeElement"/>
    <vs-divider/>


    <v-select class="mb-1 settings-gutter" placeholder="Select count of scales" v-model="scaleCount" :options="scaleCountOptions"></v-select>

    <vs-checkbox class="ml-1" v-model="startAtZero">Start At Zero?</vs-checkbox>

    <div class="mt-1">
      <vs-checkbox class="ml-1" v-model="isRequired">Is Required?</vs-checkbox>
      <AdditionalTextbox :activeElement="activeElement" />
    </div>

    <!--    <vs-select-->

    <!--      v-model="numberOfScales"-->
    <!--      class="con-select-example"-->
    <!--      label="Number of scales"-->
    <!--      icon="keyboard_arrow_down"-->
    <!--    >-->
    <!--      <vs-select-item-->
    <!--        :key="index"-->
    <!--        :value="item.id + 1"-->
    <!--        :text="item.id + 1"-->
    <!--        v-for="(item, index) in activeElement.scales"-->
    <!--      />-->
    <!--    </vs-select>-->
  </div>
</template>

<script>
  import AdditionalTextbox from "@/components/widgets/AdditionalTextbox";
  import BaseSettings from "@/components/widgets/BaseSettings";

  export default {
    name: 'opinion-scale-widget',
    props: ['activeElement'],

    mounted() {
      this.generateScaleCountOptions();
    },


    data() {
      return {
        scaleCountOptions: []
      }
    },
    components: {
      BaseSettings,
      AdditionalTextbox
    },
    computed: {
      scaleCount: {
        get() {

        },
        set(value) {
          this.$store.commit('widget/updateNumberOfScales', {
            id: this.activeElement.uuid,
            value
          })
        }
      },
      numberOfScales: {
        get() {
          this.$store.getters['widget/numberOfScales'](this.activeElement.uuid)
        },
        set(value) {
          this.$store.commit('widget/updateNumberOfScales', {
            id: this.activeElement.uuid,
            value
          });
        }
      },
      isRequired: {
        get() {
          return this.$store.getters['widget/isRequired'];
        },
        set(value) {
          this.$store.commit('widget/setRequiredField', value);
        },
      },
      startAtZero: {
        get() {
          return this.$store.getters['widget/startAtZero'];
        },
        set(value) {
          this.$store.commit('widget/setStartAtZero', value);
        },
      }
    },
    methods: {
      generateScaleCountOptions() {
        let scaleCountOptions = [];
        for(let i = 1; i <= 20; i++) {
          scaleCountOptions.push({ label: i, value: i  })
        }
        this.scaleCountOptions = scaleCountOptions;
      },
      updateWidgetData(e, uuid, key) {
        this.$store.commit('widget/updateData', {
          uuid,
          value: e.target.value,
          key: [key]
        });
      }
    },
    filters: {
      toFixed: function (data) {
        return data.toFixed(1);
      }
    }
  };
</script>
