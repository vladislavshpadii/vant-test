// import axios from 'axios'
import { defineStore } from 'pinia'

import { categories } from '../mock-data/categories'
import { products } from '../mock-data/products'


export const useTakeAwayStore = defineStore('takeaway', {
    state: () => ({ menu: {
        categories: [] as any[],
        products: {}
    } }),
    actions: {
        async fetchMenu() {
            this.menu = await new Promise((resolve) => {
                resolve({ categories, products })   
            })
        }
    }
})