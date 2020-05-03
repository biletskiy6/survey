<template>
    <div>
        Options for txt widget

        {{ activeElement }}
<!--        <vs-input class="inputx" placeholder="Placeholder" v-model=""/>-->
    </div>
</template>

<script>
    export default {
        name: 'braid-txt-style',
        props: ['activeElement'],
        filters: {
            toFixed: function(data) {
                return data.toFixed(1);
            }
        }
    }
</script>
