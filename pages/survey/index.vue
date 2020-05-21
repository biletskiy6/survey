<template>
  <div class="survey">

    <div style="background: #fff; height: 100%;" class="">
      <vs-tabs color="#00C58E" alignment="fixed">
        <vs-tab icon="build" :label="surveyLabel">
          <div class="con-tab-ejemplo">
            <splitpanes style="height: 100%">
              <pane size="15" min-size="5">
                <Toolbar/>
              </pane>
              <pane size="60" min-size="50">
                <perfect-scrollbar :wheelPropagation="true">
                  <Viewport/>
                </perfect-scrollbar>
              </pane>
              <pane size="25" min-size="10">
                <perfect-scrollbar class="ps--panel">
                  <Panel/>
                </perfect-scrollbar>
              </pane>
            </splitpanes>
          </div>
        </vs-tab>
        <vs-tab icon="settings" :label="settingsLabel">
          <div class="con-tab-ejemplo">
            <Settings/>
          </div>
        </vs-tab>
        <vs-tab icon="group" :label="inviteParticipantsLabel">
          <div class="con-tab-ejemplo">
            Invite Participants
          </div>
        </vs-tab>
        <vs-tab icon="show_chart" :label="evaluationLabel">
          <div class="con-tab-ejemplo">
            <Evaluation/>
          </div>
        </vs-tab>
        <vs-tab :disabled="!pageWidgetsLength.length" icon="visibility" :label="testSurveyLabel">
          <div  class="con-tab-ejemplo">
            <TestSurvey/>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
  import {Splitpanes, Pane} from 'splitpanes';
  import {Tabs, Tab} from '@crow1796/vue-bulma-tabs';

  import 'splitpanes/dist/splitpanes.css';

  import Toolbar from '@/components/Toolbar';
  import Viewport from '@/components/Viewport';
  import Panel from '@/components/Panel';
  import TestSurvey from '@/components/TestSurvey';
  import Settings from '@/components/Settings';
  import Evaluation from "@/components/Evaluation";

  export default {
    name: 'index',
    components: {
      Evaluation,
      Toolbar,
      Viewport,
      Panel,
      Splitpanes,
      Pane,
      Tabs,
      Tab,
      TestSurvey,
      Settings
    },
    computed: {
      pageWidgetsLength() {
        return this.$store.getters['widget/pageWidgetsLength'];
      },
      surveyLabel() {
        return this.$t('navTabs.surveyBuilder');
      },
      settingsLabel() {
        return this.$t('navTabs.settings');
      },
      inviteParticipantsLabel() {
        return this.$t('navTabs.inviteParticipants');
      },
      evaluationLabel() {
        return this.$t('navTabs.evaluation');
      },
      testSurveyLabel() {
        return this.$t('navTabs.testSurvey');
      },
      widgets() {
        return this.$store.getters['widget/pageWidgets'];
      }
    }
  };
</script>
