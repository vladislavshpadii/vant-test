<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTakeAwayStore } from '../store/takeaway'

import BaseObserver from './BaseObserver.vue'

const takeawayStore = useTakeAwayStore()

const activeCategory = ref('')
const observersRefArr = ref<HTMLDivElement[]>([])

takeawayStore.fetchMenu()

const menu = computed(() => takeawayStore.menu)
const categories = computed(() => menu.value.categories)
const products = computed(() => menu.value.products)

const putRef = (element: HTMLDivElement) => {
  observersRefArr.value.push(element)
}

const scrollToSection = (id: string, index: number) => {
  activeCategory.value = id
  observersRefArr.value[index].scrollIntoView({ behavior: 'smooth', block: 'end' })
}
</script>

<template>
  <div class="menu-tags">
    <template v-for="(category, index) in categories">
      <van-tag size="large" :plain="category.id != activeCategory" round type="primary" class="mx-1 cursor-pointer" @click="scrollToSection(category.id, index)">{{ category.name }}</van-tag>
    </template>
  </div>
  <div class="pt-10">
    <div v-for="category in categories" :ref="putRef">
      <BaseObserver @intersection="activeCategory = category.id" />
      <h1>{{ category.name }}</h1>
      <template v-for="product in category.productIds">
        <van-card
          num="2"
          :price="products[product].variants[0].prices.delivery"
          :title="products[product].name"
          :desc="products[product].description[0]"
          :thumb="products[product].imageUrl"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.mx-1 {
  margin: 0px 4px;
}

.my-1 {
  margin: 0px 4px;
}

.pt-10 {
  padding-top: 40px;
}

.menu-tags {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 11111;
  padding: 10px;
  background-color: #fff;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
