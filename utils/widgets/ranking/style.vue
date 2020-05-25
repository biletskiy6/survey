<template>
  <div>
    <BaseSettings :activeElement="activeElement" />

    <vs-divider/>
    <h5 class="fw-b tac">Advanced settings</h5>
    <vs-divider/>


    <div class="item mb-1 " :key="row.id" v-for="row in rankingRows">
      <input
        placeholder="Enter option text"
        class="custom-input"
        @input="updateRankingRow($event, row.id)"
        :value="row.value"
        type="text"
      />
    </div>

    <!--        <vs-input class="inputx" placeholder="Placeholder" v-model=""/>-->
  </div>
</template>

<script>
  import BaseSettings from "@/components/widgets/BaseSettings";
  export default {
    name: 'ranking-style',
    components: {BaseSettings},
    props: ['activeElement'],
    filters: {
      toFixed: function (data) {
        return data.toFixed(1);
      }
    },
    computed: {
      rankingRows: {
        get() {
          return this.$store.getters['widget/rankingRows'](this.activeElement.uuid);
        },
        set(value) {
          this.$store.commit('widget/updateRankingRows', value, { root: true });
        }
      }
    },
    methods: {
      updateWidgetData(e, uuid, key) {
        this.$store.commit('widget/updateData', {
          uuid,
          value: e.target.value,
          key: [key]
        });
      },
      updateRankingRow(e, id) {
        this.$store.commit('widget/updateRankingRow', {
          id,
          value: e.target.value
        });
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this.$store.commit("widget/updateWidgetText", "Updated string");
      // }, 1500);
    }
  };
</script>
