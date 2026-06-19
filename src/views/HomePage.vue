<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-no-padding">
      <!-- Header Section -->
      <div class="header-section">
        <div class="user-info">
          <div class="user-avatar">
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </div>
          <div class="user-details">
            <p class="welcome-text">Welcome</p>
            <p class="user-name">{{ userEmail }}</p>
          </div>
        </div>
        <div class="notification-icon" @click="openNotifications">
          <ion-icon :icon="notificationsOutline"></ion-icon>
          <span class="notification-badge" v-if="notificationCount > 0">{{
            notificationCount
          }}</span>
        </div>
      </div>

      <!-- Menu Icons Section (Scrollable) -->
      <div class="menu-section">
        <div class="menu-scroll-container">
          <div
            class="menu-item"
            v-for="menu in menuItems"
            :key="menu.id"
            @click="navigateToMenu(menu)"
          >
            <div class="menu-icon">
              <ion-icon :icon="menu.icon"></ion-icon>
            </div>
            <p class="menu-label">{{ menu.label }}</p>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="timeline-section">
        <div class="timeline-header">
          <h3>Timeline</h3>
        </div>

        <!-- Post Input -->
        <div class="post-input-container">
          <ion-textarea
            v-model="newPost"
            placeholder="Apa yang sedang Anda kerjakan?"
            :auto-grow="true"
            rows="2"
          ></ion-textarea>
          <ion-button
            @click="submitPost"
            size="small"
            :disabled="!newPost.trim()"
          >
            Post
          </ion-button>
        </div>

        <!-- Timeline Posts -->
        <div class="timeline-posts">
          <div
            class="timeline-item"
            v-for="post in timelinePosts"
            :key="post.id"
          >
            <div class="post-header">
              <div class="post-user-info">
                <div class="post-avatar">
                  <ion-icon :icon="personCircleOutline"></ion-icon>
                </div>
                <div>
                  <p class="post-user-name">{{ post.userName }}</p>
                  <p class="post-time">{{ post.time }}</p>
                </div>
              </div>
            </div>
            <div class="post-content">
              <p>{{ post.content }}</p>
            </div>
          </div>
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
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import {
  personCircleOutline,
  notificationsOutline,
  calendarOutline,
  airplaneOutline,
  cashOutline,
  businessOutline,
  checkmarkCircleOutline,
  peopleOutline,
  walletOutline,
  receiptOutline,
  listOutline,
  cardOutline,
  statsChartOutline,
  documentTextOutline,
  homeOutline,
  timeOutline,
  personOutline,
} from "ionicons/icons";

export default {
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonTextarea,
    IonButton,
  },
  data() {
    return {
      userEmail: "",
      notificationCount: 3,
      activeTab: "home",
      newPost: "",
      menuItems: [
        { id: 1, label: "Kehadiran", icon: calendarOutline },
        { id: 2, label: "Izin & Cuti", icon: airplaneOutline },
        { id: 3, label: "Gaji", icon: cashOutline },
        { id: 4, label: "Kalender", icon: calendarOutline },
        { id: 5, label: "Perusahaan", icon: businessOutline },
        { id: 6, label: "Approval", icon: checkmarkCircleOutline },
        { id: 7, label: "Tim", icon: peopleOutline },
        { id: 8, label: "Kasbon", icon: walletOutline },
        { id: 9, label: "Reimburse", icon: receiptOutline },
        { id: 10, label: "Tugas", icon: listOutline },
        { id: 11, label: "Petty Cash", icon: cardOutline },
        { id: 12, label: "KPI", icon: statsChartOutline },
        { id: 13, label: "Pengajuan", icon: documentTextOutline },
      ],
      timelinePosts: [
        {
          id: 1,
          userName: "John Doe",
          time: "2 jam yang lalu",
          content:
            "Sedang menyelesaikan laporan keuangan bulan ini. Progress 80%.",
        },
        {
          id: 2,
          userName: "Jane Smith",
          time: "4 jam yang lalu",
          content:
            "Meeting dengan client berjalan lancar. Berhasil closing deal baru!",
        },
        {
          id: 3,
          userName: "Mike Johnson",
          time: "6 jam yang lalu",
          content: "Update sistem HR sudah selesai dan siap untuk testing.",
        },
      ],
      personCircleOutline,
      notificationsOutline,
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
        this.userEmail = user.email || "user@example.com";
      }
    },
    openNotifications() {
      console.log("Open notifications");
      // TODO: Implement notification page navigation
    },
    navigateToMenu(menu) {
      console.log("Navigate to:", menu.label);
      // TODO: Implement menu navigation
    },
    navigateTab(tab) {
      this.activeTab = tab;
      console.log("Navigate to tab:", tab);
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
      } else if (tab === "profil") {
        this.$router.push("/profile");
      }
    },
    submitPost() {
      if (!this.newPost.trim()) return;

      const newPostItem = {
        id: Date.now(),
        userName: this.userEmail,
        time: "Baru saja",
        content: this.newPost,
      };

      this.timelinePosts.unshift(newPostItem);
      this.newPost = "";

      console.log("Post submitted:", newPostItem);
      // TODO: Send post to API
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
/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar ion-icon {
  font-size: 40px;
  color: white;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.welcome-text {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}

.user-name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  padding: 8px;
}

.notification-icon ion-icon {
  font-size: 28px;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ff4444;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
}

/* Menu Section */
.menu-section {
  padding: 16px 0;
  background: white;
  margin-bottom: 8px;
}

.menu-scroll-container {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.menu-scroll-container::-webkit-scrollbar {
  display: none;
}

.menu-item {
  flex: 0 0 calc((100% - 40px) / 6);
  min-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.menu-item:active {
  transform: scale(0.95);
}

.menu-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-icon ion-icon {
  font-size: 28px;
  color: white;
}

.menu-label {
  margin: 0;
  font-size: 11px;
  text-align: center;
  color: #333;
  line-height: 1.2;
}

/* Timeline Section */
.timeline-section {
  padding: 16px;
  background: #f5f5f5;
  min-height: calc(100vh - 400px);
}

.timeline-header h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: bold;
}

.post-input-container {
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.post-input-container ion-textarea {
  --padding-start: 0;
  --padding-end: 0;
}

.post-input-container ion-button {
  align-self: flex-end;
}

.timeline-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.post-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-avatar ion-icon {
  font-size: 32px;
  color: white;
}

.post-user-name {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
}

.post-time {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.post-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
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
