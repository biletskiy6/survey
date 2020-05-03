<template>
    <div class="survey">

        <splitpanes style="height: 100%">
            <pane size="12" min-size="10">
                <Toolbar/>
            </pane>
            <pane size="68" min-size="10">
                <Viewport/>
            </pane>
            <pane size="20" min-size="10">
               <Panel/>
            </pane>
        </splitpanes>
<!--        <multipane>-->
<!--            <div class="pane" :style="{ minWidth: '100px', width: '20%', maxWidth: '100%' }">-->
<!--                <Toolbar/>-->
<!--            </div>-->
<!--            <multipane-resizer></multipane-resizer>-->
<!--            <div >-->
<!--                <Viewport/>-->
<!--            </div>-->
<!--            <multipane-resizer></multipane-resizer>-->
<!--            <div class="pane" :style="{ flexGrow: 1 }">-->
<!--                <Panel/>-->
<!--            </div>-->
<!--        </multipane>-->
    </div>
</template>

<script>
    import { Splitpanes, Pane } from 'splitpanes';
    import 'splitpanes/dist/splitpanes.css';

    import Toolbar from "@/components/Toolbar";
    import Viewport from "@/components/Viewport";
    import Panel from "@/components/Panel";

    export default {
        name: "index",
        components: {
            Toolbar, Viewport, Panel, Splitpanes, Pane

        }
    }
</script>
