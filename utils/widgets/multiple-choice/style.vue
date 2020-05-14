<template>
  <div>
    <BaseSettings :activeElement="activeElement" />

    <vs-divider/>
    <h5 class="fw-b tac">Advanced settings</h5>
    <vs-divider/>

    <draggable
      v-model="multipleChoiceRows"
      draggable=".item"
      handle=".btn-drag"
    >
      <div
        class="multiple-choice item"
        :key="row.id"
        v-for="row in multipleChoiceRows"
      >
        <vs-button
          class="btn-drag"
          color="primary"
          type="flat"
          icon="list"
        ></vs-button>
        <!-- <input
            @input="updateMultipleChoiceCheckedRow(row.id)"
            :checked="row.isChecked"
            :value="row.isChecked"
            type="checkbox"
          /> -->
        <input
          class="custom-input mb1"
          placeholder="Question text"
          @input="updateMultipleChoiceQuestionRow($event, row.id)"
          :value="row.value"
          type="text"
        />
        <vs-button
          color="danger"
          @click="handleDeleteQuestionRow(row.id)"
          type="flat"
          icon="delete"
        ></vs-button>
      </div>
    </draggable>

    <div class="d-flex ai-c">
      <vs-button @click="handleAddQuestionRow" color="primary" type="line"
                 icon="add"></vs-button>
    </div>


    <vs-divider/>


    <AdditionalTextbox :activeElement="activeElement" />

<!--    <vs-checkbox class="mb-2" @input="updateTextareaVisibility($event)"-->
<!--    >Additional text box-->
<!--    </vs-checkbox-->
<!--    >-->

<!--    <v-select placeholder="Choose textarea width" v-model="textareaWidgetWidth"-->
<!--              :options="activeElement.textarea.widthOptions" v-if="activeElement.textarea.isVisible">-->
<!--    </v-select>-->


    <!--    <vs-select-->
    <!--      v-if="activeElement.textarea.isVisible"-->
    <!--      v-model="textareaWidgetWidth"-->
    <!--      class="con-select-example"-->
    <!--      label="Textarea size"-->
    <!--      icon="keyboard_arrow_down"-->
    <!--    >-->
    <!--      <vs-select-item-->
    <!--        :key="index"-->
    <!--        :value="item.value"-->
    <!--        :text="item.text"-->
    <!--        v-for="(item, index) in activeElement.textarea.widthOptions"-->
    <!--      />-->
    <!--    </vs-select>-->
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import AdditionalTextbox from "@/components/widgets/AdditionalTextbox";
  import BaseSettings from "@/components/widgets/BaseSettings";

  export default {
    name: 'multiple-choice-widget',
    props: ['activeElement'],
    components: {
      BaseSettings,
      draggable,
      AdditionalTextbox
    },
    computed: {
      textareaWidgetWidth: {
        get() {
        },
        set(value) {
          if (value) {
            this.$store.commit('widget/updateTextareaWidgetWidth', value.value);
          }
        }
      },
      multipleChoiceRows: {
        get() {
          return this.$store.getters['widget/multipleChoiceRows'];
        },
        set(value) {
          this.$store.commit('widget/updateMultipleChoiceRows', value);
        }
      }
    },
    methods: {
      handleSelect() {
        alert(1);
      },
      updateMultipleChoiceCheckedRow(id) {
        this.$store.commit('widget/updateMultipleChoiceCheckedRow', id);
      },
      updateMultipleChoiceQuestionRow(e, id) {
        this.$store.commit('widget/updateMultipleChoiceQuestionRow', {
          id,
          value: e.target.value
        });
      },
      handleAddQuestionRow() {
        this.$store.commit('widget/addMultipleChoiceQuestionRow');
      },
      updateTextareaVisibility(e) {
        this.$store.commit('widget/updateTextareaVisibility');
      },
      handleDeleteQuestionRow(id) {
        this.$store.commit('widget/deleteMultipleChoiceQuestionRow', id);
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
