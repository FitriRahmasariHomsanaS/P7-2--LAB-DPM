import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password,
            });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            router.replace("/(tabs)"); // Prevent back navigation to login
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            Alert.alert("Login Failed", errorMessage);
        }
    };

    return (
        <LinearGradient
            colors={["#ff9a9e", "#fad0c4"]}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                <Image
                    source={require("../../assets/images/visual.jpg")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Log in to continue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="black"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.push("/auth/RegisterScreen")}
                >
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        width: "90%",
        alignItems: "center",
        padding: 16,
        borderRadius: 16,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        shadowColor: "#000",
        shadowOffset: { width: 20, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "black",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: "black",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        fontSize: 16,
        color: "black",
    },
    loginButton: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff6f61",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    loginButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "600",
    },
    registerButton: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff50",
        borderWidth: 1,
        borderColor: "#ffffff",
    },
    registerButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "600",
    },
});
