<template>
  <div class="layout-wrapper">
    <div
      v-show="sidebarActive"
      class="sidebar"
      :class="{ active: sidebarActive }"
    >
      <MenuApp @toggle="toggleSidebar"/>
    </div>
    <div class="main-content">
      <Toolbar>
        <template #start>
          <Button
            icon="pi pi-bars"
            aria-label="Toggle"
            @click="toggleSidebar"
          />
        </template>
      </Toolbar>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuApp from "@/components/MenuApp.vue";

export default {
  data() {
    return {
      sidebarActive: false,
      isMobile: window.innerWidth < 768,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 768 && this.isMobile) {
        this.isMobile = false;
      }
      if (windowWidth < 768 && this.sidebarActive && !this.isMobile) {
        this.sidebarActive = false;
        this.isMobile = true;
      }
    },
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  border: 1px solid rgb(226, 225, 225);
  border-radius: 6px;
  margin-right: 5px;
  color: white;
  background: white;
  transition: transform 0.3s ease;
  transform: translateX(-999px);
}

.sidebar.active {
  transform: translateX(0);
}

.sidebar-logo {
  background-color: #222;
  padding: 10px;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.topbar {
  background-color: #222;
  color: white;
  padding: 10px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    transform: translateX(-100%);
    position: fixed;
    z-index: 1;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar.active {
    transform: translateX(0);
  }
}
</style>
