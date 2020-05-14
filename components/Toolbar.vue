<template>
  <div class="survey-toolbar">
    <h4 class="fw-b">Toolbar</h4>
    <vs-divider/>

    <ul class="widget-list columns">
      <li
        v-for="item in widgets"
        :key="item.name"
        :class="{ active: activeElement.type === item.setting.type }"
        class="widget-list-item column col-6"
        @click="
          e => {
            addWidget(e, item);
          }
        "
      >

        <span v-html="item.icon"></span>
        <span class="menu-caption">
          {{ item.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import widget from '@/utils/widget-plugin';

  export default {
    name: 'Toolbar',
    computed: {
      activeElement() {
        return this.$store.getters['widget/activeElement']
      },
      widgets() {
        return widget.getWidgets();
      }
    },
    mounted() {
      console.log(this.widgets);
    },
    methods: {
      addWidget(e, item) {
        this.$store.dispatch('widget/add', item);
      }
    }
  };
</script>

<style scoped></style>
