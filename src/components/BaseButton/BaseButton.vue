<template lang="pug">
button.baseButton(@click="$emit('button-click')") {{ title }}
</template>

<script lang="ts">
  import '@/components/BaseButton/BaseButton.scss'
  import {defineComponent} from "vue";

  export default defineComponent({
    name: "BaseButton",
    props: {
      title: {
        default: ''
      }
    }
  });
</script>
