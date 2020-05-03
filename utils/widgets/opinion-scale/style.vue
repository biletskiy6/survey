<template>
    <div>
        Options for opinion widget
    </div>
</template>

<script>
    export default {
        name: 'opinion-scale-widget',
        props: ['activeElement'],
        filters: {
            toFixed: function(data) {
                return data.toFixed(1);
            }
        }
    }
</script>
