<template>
    <div>
        Options for multiple choice widget
    </div>
</template>

<script>
    export default {
        name: 'multiple-choice-widget',
        props: ['activeElement'],
        filters: {
            toFixed: function(data) {
                return data.toFixed(1);
            }
        }
    }
</script>
