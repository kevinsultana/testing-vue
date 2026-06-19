<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Create Account</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="register-container">
        <h2>Join Us</h2>
        <p class="subtitle">Create your new account</p>

        <form @submit.prevent="handleRegister">
          <!-- Name Field -->
          <ion-item>
            <ion-label position="stacked">Full Name</ion-label>
            <ion-input
              v-model="formData.name"
              type="text"
              placeholder="Enter your full name"
              required
            ></ion-input>
          </ion-item>

          <!-- Email Field -->
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              required
            ></ion-input>
          </ion-item>

          <!-- Password Field -->
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
              required
            ></ion-input>
          </ion-item>

          <!-- Confirm Password Field -->
          <ion-item>
            <ion-label position="stacked">Confirm Password</ion-label>
            <ion-input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
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

          <!-- Register Button -->
          <ion-button
            expand="block"
            type="submit"
            :disabled="isLoading"
            class="ion-margin-top"
          >
            <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
            <span v-else>Register</span>
          </ion-button>
        </form>

        <!-- Login Link -->
        <div class="login-link">
          <p>
            Already have an account?
            <router-link to="/login">Login here</router-link>
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
import { registerUser } from "@/services/api";

export default {
  name: "RegisterPage",
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      isLoading: false,
      error: "",
      success: "",
    };
  },
  methods: {
    async handleRegister() {
      // Reset messages
      this.error = "";
      this.success = "";

      // Validate form
      if (
        !this.formData.name ||
        !this.formData.email ||
        !this.formData.password ||
        !this.formData.confirmPassword
      ) {
        this.error = "All fields are required";
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.error = "Please enter a valid email address";
        return;
      }

      // Validate password length
      if (this.formData.password.length < 6) {
        this.error = "Password must be at least 6 characters long";
        return;
      }

      // Check if passwords match
      if (this.formData.password !== this.formData.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      this.isLoading = true;

      try {
        const response = await registerUser({
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
        });

        if (response.success) {
          this.success = "Registration successful! Redirecting to login...";

          // Store user data and token
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);

          // Redirect to home after 1.5 seconds
          setTimeout(() => {
            this.$router.replace("/home");
          }, 1500);
        } else {
          this.error = response.message || "Registration failed";
        }
      } catch (err) {
        this.error = err.message || "An error occurred during registration";
        console.error("Registration error:", err);
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
.register-container {
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

.login-link {
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
