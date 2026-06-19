<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="login-container">
        <h2>Welcome Back</h2>
        <p class="subtitle">Sign in to your account</p>

        <form @submit.prevent="handleLogin">
          <!-- Email Field -->
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
            ></ion-input>
          </ion-item>

          <!-- Password Field -->
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
            ></ion-input>
          </ion-item>

          <!-- Error Message -->
          <div v-if="error" class="error-message">
            <ion-text color="danger">
              <p>{{ error }}</p>
            </ion-text>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="success-message">
            <ion-text color="success">
              <p>{{ success }}</p>
            </ion-text>
          </div>

          <!-- Login Button -->
          <ion-button
            expand="block"
            type="submit"
            :disabled="isLoading"
            class="ion-margin-top"
          >
            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
            <span v-else>Login</span>
          </ion-button>
        </form>

        <!-- Register Link -->
        <div class="register-link">
          <p>
            Don't have an account?
            <router-link to="/register">Register here</router-link>
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
} from "@ionic/vue";
import { loginUser } from "@/services/api";

export default {
  name: "LoginPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      isLoading: false,
      error: "",
      success: "",
    };
  },
  methods: {
    async handleLogin() {
      // Reset messages
      this.error = "";
      this.success = "";

      // Validate form
      if (!this.formData.email || !this.formData.password) {
        this.error = "Email and password are required";
        return;
      }

      this.isLoading = true;

      try {
        const response = await loginUser(this.formData);

        if (response.success) {
          this.success = "Login successful! Redirecting...";

          // Store user data and token
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);

          // Redirect to home after 1 second
          setTimeout(() => {
            this.$router.replace("/home");
          }, 1000);
        } else {
          this.error = response.message || "Login failed";
        }
      } catch (err) {
        this.error = err.message || "An error occurred during login";
        console.error("Login error:", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    // Check if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.replace("/home");
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  text-align: center;
}

h2 {
  margin-bottom: 8px;
  font-weight: bold;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

form {
  margin: 30px 0;
}

ion-item {
  margin-bottom: 15px;
}

.error-message,
.success-message {
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  font-size: 14px;
}

.error-message {
  background-color: #fff3f3;
}

.success-message {
  background-color: #f0fdf4;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
