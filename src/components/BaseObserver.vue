<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'

const emit = defineEmits()

const observerRef = ref()
const observerInstance = ref<IntersectionObserver>()

onMounted(() => {
  observerInstance.value = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        emit('intersection');
    }
  })

  if (observerRef.value) {
    observerInstance.value.observe(observerRef.value)
  }
})

onBeforeUnmount(() => observerInstance.value?.disconnect())
</script>

<template>
  <div ref="observerRef" class="tw-h-1" />
</template>
