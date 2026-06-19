<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-padding">
      <!-- Header -->
      <div class="header-section">
        <h2>Profil Saya</h2>
      </div>

      <!-- Profile Content -->
      <div class="profile-content">
        <!-- User Avatar & Info -->
        <div class="profile-header">
          <div class="avatar-large">
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </div>
          <h3 class="user-name">{{ userName }}</h3>
          <p class="user-email">{{ userEmail }}</p>
        </div>

        <!-- Profile Menu Items -->
        <div class="profile-menu">
          <div class="profile-menu-item" @click="editProfile">
            <div class="menu-icon">
              <ion-icon :icon="createOutline"></ion-icon>
            </div>
            <div class="menu-content">
              <p class="menu-title">Edit Profil</p>
              <p class="menu-subtitle">Ubah informasi pribadi Anda</p>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-arrow"></ion-icon>
          </div>

          <div class="profile-menu-item" @click="changePassword">
            <div class="menu-icon">
              <ion-icon :icon="lockClosedOutline"></ion-icon>
            </div>
            <div class="menu-content">
              <p class="menu-title">Ubah Password</p>
              <p class="menu-subtitle">Perbarui password Anda</p>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-arrow"></ion-icon>
          </div>

          <div class="profile-menu-item" @click="settings">
            <div class="menu-icon">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </div>
            <div class="menu-content">
              <p class="menu-title">Pengaturan</p>
              <p class="menu-subtitle">Kelola preferensi aplikasi</p>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-arrow"></ion-icon>
          </div>

          <div class="profile-menu-item" @click="about">
            <div class="menu-icon">
              <ion-icon :icon="informationCircleOutline"></ion-icon>
            </div>
            <div class="menu-content">
              <p class="menu-title">Tentang Aplikasi</p>
              <p class="menu-subtitle">Versi dan informasi aplikasi</p>
            </div>
            <ion-icon :icon="chevronForwardOutline" class="menu-arrow"></ion-icon>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="logout-section">
          <ion-button
            expand="block"
            color="danger"
            @click="confirmLogout"
            class="logout-button"
          >
            <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
            Logout
          </ion-button>
        </div>
      </div>

      <!-- Spacing for Bottom Navbar -->
      <div style="height: 70px"></div>
    </ion-content>

    <!-- Bottom Navbar -->
    <div class="bottom-navbar">
      <div
        class="nav-item"
        :class="{ active: activeTab === 'home' }"
        @click="navigateTab('home')"
      >
        <ion-icon :icon="homeOutline"></ion-icon>
        <span>Home</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'timeline' }"
        @click="navigateTab('timeline')"
      >
        <ion-icon :icon="timeOutline"></ion-icon>
        <span>Timeline</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'kehadiran' }"
        @click="navigateTab('kehadiran')"
      >
        <ion-icon :icon="calendarOutline"></ion-icon>
        <span>Kehadiran</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'perusahaan' }"
        @click="navigateTab('perusahaan')"
      >
        <ion-icon :icon="businessOutline"></ion-icon>
        <span>Perusahaan</span>
      </div>
      <div
        class="nav-item"
        :class="{ active: activeTab === 'profil' }"
        @click="navigateTab('profil')"
      >
        <ion-icon :icon="personOutline"></ion-icon>
        <span>Profil</span>
      </div>
    </div>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  alertController,
} from "@ionic/vue";
import {
  personCircleOutline,
  createOutline,
  lockClosedOutline,
  settingsOutline,
  informationCircleOutline,
  logOutOutline,
  chevronForwardOutline,
  homeOutline,
  timeOutline,
  calendarOutline,
  businessOutline,
  personOutline,
} from "ionicons/icons";
import { logoutUser } from "@/services/api";

export default {
  name: "ProfilePage",
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      userName: "",
      userEmail: "",
      activeTab: "profil",
      personCircleOutline,
      createOutline,
      lockClosedOutline,
      settingsOutline,
      informationCircleOutline,
      logOutOutline,
      chevronForwardOutline,
      homeOutline,
      timeOutline,
      calendarOutline,
      businessOutline,
      personOutline,
    };
  },
  methods: {
    loadUserData() {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        this.userName = user.name || "User";
        this.userEmail = user.email || "user@example.com";
      }
    },
    editProfile() {
      console.log("Navigate to edit profile");
      // TODO: Implement edit profile page
    },
    changePassword() {
      console.log("Navigate to change password");
      // TODO: Implement change password page
    },
    settings() {
      console.log("Navigate to settings");
      // TODO: Implement settings page
    },
    about() {
      console.log("Navigate to about");
      // TODO: Implement about page
    },
    async confirmLogout() {
      const alert = await alertController.create({
        header: "Logout",
        message: "Apakah Anda yakin ingin logout?",
        buttons: [
          {
            text: "Batal",
            role: "cancel",
          },
          {
            text: "Ya, Logout",
            role: "confirm",
            handler: async () => {
              await this.performLogout();
            },
          },
        ],
      });

      await alert.present();
    },
    async performLogout() {
      try {
        await logoutUser();

        // Clear local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to login
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    navigateTab(tab) {
      this.activeTab = tab;
      if (tab === "home") {
        this.$router.push("/home");
      } else if (tab === "timeline") {
        console.log("Navigate to timeline");
        // TODO: Implement timeline page
      } else if (tab === "kehadiran") {
        console.log("Navigate to kehadiran");
        // TODO: Implement kehadiran page
      } else if (tab === "perusahaan") {
        console.log("Navigate to perusahaan");
        // TODO: Implement perusahaan page
      }
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    this.loadUserData();
  },
};
</script>

<style scoped>
/* Header */
.header-section {
  padding: 20px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-section h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

/* Profile Content */
.profile-content {
  padding: 20px 16px;
  padding-bottom: 100px;
}

/* Profile Header */
.profile-header {
  text-align: center;
  padding: 30px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.avatar-large ion-icon {
  font-size: 80px;
  color: white;
}

.user-name {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.user-email {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* Profile Menu */
.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 30px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.profile-menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-menu-item:last-child {
  border-bottom: none;
}

.profile-menu-item:active {
  background-color: #f5f5f5;
}

.menu-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.menu-icon ion-icon {
  font-size: 24px;
  color: white;
}

.menu-content {
  flex: 1;
}

.menu-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.menu-subtitle {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.menu-arrow {
  font-size: 20px;
  color: #ccc;
  margin-left: 12px;
}

/* Logout Section */
.logout-section {
  margin-top: 20px;
}

.logout-button {
  --background: #ff4444;
  --background-hover: #ff2222;
}

/* Bottom Navbar */
.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.nav-item ion-icon {
  font-size: 24px;
}

.nav-item span {
  font-size: 11px;
}

.nav-item.active {
  color: #667eea;
}

.nav-item:active {
  transform: scale(0.95);
}
</style>
