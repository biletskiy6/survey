<template>
  <div class="survey">

    <div style="background: #fff; height: 100%;" class="">
      <vs-tabs color="#00C58E" alignment="fixed">
        <vs-tab icon="build" label="Survey Builder">
          <div class="con-tab-ejemplo">
            <splitpanes style="height: 100%">
              <pane size="20" min-size="10">
                <Toolbar/>
              </pane>
              <pane size="60" min-size="50">
                <perfect-scrollbar>
                  <Viewport/>
                </perfect-scrollbar>
              </pane>
              <pane size="20" min-size="10">
                <perfect-scrollbar>
                  <Panel/>
                </perfect-scrollbar>
              </pane>
            </splitpanes>
          </div>
        </vs-tab>
        <vs-tab icon="settings" label="Settings">
          <div class="con-tab-ejemplo">
            <Settings/>
          </div>
        </vs-tab>
        <vs-tab icon="group" label="Invite Participants">
          <div class="con-tab-ejemplo">
            Invite Participants
          </div>
        </vs-tab>
        <vs-tab icon="show_chart" label="Evaluation">
          <div class="con-tab-ejemplo">
            Evaluation
          </div>
        </vs-tab>
        <vs-tab icon="visibility" :disabled="!widgets.length" label="Test Survey">
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

  export default {
    name: 'index',
    components: {
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
      widgets() {
        return this.$store.getters['widget/widgets'];
      }
    }
  };
</script>
