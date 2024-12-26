import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import API_URL from "../../config/config";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/register`, {
                username,
                password,
                email,
            });
            Alert.alert("Registration Successful", "You can now log in");
            router.replace("/auth/LoginScreen");
        } catch (error) {
            Alert.alert("Registration Failed", (error as any).response?.data?.message || "An error occurred");
        }
    };

    return (
        <LinearGradient
            colors={["#ff9a9e", "#fad0c4"]}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/visual.jpg")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Create an Account</Text>
                    <Text style={styles.subtitle}>Join us and get started</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#6e6e6e"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6e6e6e"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#6e6e6e"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace("/auth/LoginScreen")}
                >
                    <Text style={styles.backButtonText}>Back to Login</Text>
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        fontSize: 16,
        color: "black",
    },
    registerButton: {
        width: "100%",
        height: 50,
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
    registerButtonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        width: "100%",
        height: 50,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff50",
        borderWidth: 1,
        borderColor: "#ffffff",
    },
    backButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "600",
    },
});
