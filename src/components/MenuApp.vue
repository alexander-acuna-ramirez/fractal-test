<template>

    <Menu :model="items" class="w-full" flat style="border: none;">
      <template #start>
        <div class="flex justify-content-end w-full">
            <Button icon="pi pi-times" severity="primary"  rounded aria-label="Cancel" @click="toggleMenu"/>
        </div>
        <div class="flex justify-content-center w-full">
          <img src="@/assets/logo.png" />
        </div>
      </template>
      <template #submenuheader="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <router-link 
          :class="{ 'menu-item--active': isActive(item.to), 'menu-item': true }" 
          class="flex align-items-center py-3 px-2 mb-2 mx-2" 
          :to="item.to"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
  
      
    </Menu>
  </template>
  
  <script>
  import Logo from "@/assets/logo.png";
  export default {
    name: "MenuApp",
    data() {
      return {
        items: [
          
          {
            label: 'Acciones',
            items: [
              {
                label: 'Countries',
                to: '/home',
                icon: 'pi pi-map-marker',
              },
              {
                label: 'Stadistics',
                to: '/stadistics',
                icon: 'pi pi-chart-line',
              },
              {
                label: 'News',
                to: '/news',
                icon: 'pi pi-heart-fill',
              },
  
            ]
          }
        ]
      }
    },
    methods: {
      isActive(path) {
        return this.$route.path == path;
      },
      toggleMenu(){
        this.$emit("toggle", true);
      }
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    text-decoration: none;
    color: #334155;
    border-radius: 6px;
    transition: all 0.2s ease-in-out; 
  }
  
  .menu-item--active {
    color: white;
    background-color: var(--primary-color);
  }
  </style>