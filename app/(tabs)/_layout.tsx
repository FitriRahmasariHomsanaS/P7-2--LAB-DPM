import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: 'black',
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: () => (
                    <LinearGradient
                        colors={['#B0BEC5', '#64B5F6']}
                        style={{ flex: 1, borderRadius: 20 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                ),
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderRadius: 20,
                        marginBottom: 16,
                        marginHorizontal: 8,
                        elevation: 5,
                    },
                    default: {
                        backgroundColor: '#E0E0E0',
                        borderRadius: 20,
                    },
                }),
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let iconColor = color; // Default icon color

                    // Custom logic for "Explore" tab
                    if (route.name === 'explore') {
                        iconColor = focused ? color : 'white'; // Set to white when not focused
                    }

                    switch (route.name) {
                        case 'index':
                            iconName = 'list.fill';
                            break;
                        case 'profile':
                            iconName = 'person.fill';
                            break;
                        case 'explore':
                            iconName = 'map.fill';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    const scale = new Animated.Value(focused ? 1.2 : 1);
                    Animated.spring(scale, { toValue: focused ? 1.3 : 1, useNativeDriver: true }).start();

                    return (
                        <Animated.View style={{ transform: [{ scale }] }}>
                            <IconSymbol size={30} name={iconName} color={iconColor} />
                        </Animated.View>
                    );
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Todos',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                }}
            />
        </Tabs>
    );
}