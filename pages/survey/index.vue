<template>
  <div class="survey">
    <Tabs class="tab-wrapper" orientation="vertical">
      <Tab class="tab" name="Survey Designer" :selected="true">
        <splitpanes style="height: 100%">
          <pane size="20" min-size="10">
            <Toolbar />
          </pane>
          <pane size="60" min-size="50">
            <Viewport />
          </pane>
          <pane size="20" min-size="10">
            <Panel />
          </pane>
        </splitpanes>
      </Tab>
      <Tab name="Test Survey">
        <TestSurvey />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes';
import { Tabs, Tab } from '@crow1796/vue-bulma-tabs';

import 'splitpanes/dist/splitpanes.css';

import Toolbar from '@/components/Toolbar';
import Viewport from '@/components/Viewport';
import Panel from '@/components/Panel';
import TestSurvey from '@/components/TestSurvey';

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
    TestSurvey
  }
};
</script>
