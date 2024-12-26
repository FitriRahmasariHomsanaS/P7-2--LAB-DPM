import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Animated, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Card,
    Dialog,
    FAB,
    Portal,
    Provider as PaperProvider,
    Text,
    TextInput,
    IconButton
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTodos } from '@/context/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '@/config/config';

const TodosScreen = () => {
    const { todos, fetchTodos } = useTodos();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [gradientAnimation, setGradientAnimation] = useState(new Animated.Value(0));
    const router = useRouter();

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            await fetchTodos();
            setLoading(false);
        };
        loadTodos();

        const gradientColors = [
            ['#FFB6C1', '#FF69B4', '#FF1493'], // Soft Pink Gradient
            ['#B0E0E6', '#ADD8E6', '#87CEFA'], // Light Blue Gradient
            ['#FFE4E1', '#FFB6C1', '#FF69B4']  // Light Coral Gradient
        ];

        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % gradientColors.length;
            setGradientAnimation(new Animated.Value(0));
            Animated.timing(gradientAnimation, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: false,
            }).start();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleAddTodo = async () => {
        if (!title || !description) {
            setDialogMessage('Both title and description are required.');
            setDialogVisible(true);
            return;
        }
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${API_URL}/api/todos`, {
                title,
                description
            }, { headers: { Authorization: `Bearer ${token}` } });
            fetchTodos();
            setTitle('');
            setDescription('');
            setIsAdding(false);
        } catch (error) {
            setDialogMessage('Failed to add todo');
            setDialogVisible(true);
        }
    };

    const handleDeleteTodo = async (id: string): Promise<void> => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            await axios.delete(`${API_URL}/api/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTodos();
        } catch (error) {
            setDialogMessage('Failed to delete todo');
            setDialogVisible(true);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFB6C1', '#FF69B4', '#FF1493']} // Soft Pink Gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.background}
                />
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Todo List</Text>
                    {loading ? (
                        <ActivityIndicator style={styles.loading} animating={true} size="large" color="#FF1493" />
                    ) : (
                        <FlatList
                            data={todos}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Card style={styles.card} elevation={5}>
                                    <Card.Content>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </Card.Content>
                                    <Card.Actions style={styles.cardActions}>
                                        <IconButton
                                            icon="delete"
                                            iconColor="#FF6347"
                                            size={20}
                                            onPress={() => handleDeleteTodo(item._id)}
                                        />
                                    </Card.Actions>
                                </Card>
                            )}
                            contentContainerStyle={styles.listContainer}
                        />
                    )}
                    {isAdding && (
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inputContainer}>
                            <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} mode="outlined" />
                            <TextInput label="Description" value={description} onChangeText={setDescription} style={styles.input} mode="outlined" multiline />
                            <Button mode="contained" onPress={handleAddTodo} style={styles.addButton}>
                                Add Todo
                            </Button>
                            <Button onPress={() => setIsAdding(false)} style={styles.cancelButton}>
                                Cancel
                            </Button>
                        </KeyboardAvoidingView>
                    )}
                    {!isAdding && (
                        <FAB style={styles.fab} icon="plus" onPress={() => setIsAdding(true)} label="Add Todo" />
                    )}
                    <Portal>
                        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Text>{dialogMessage}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => setDialogVisible(false)}>OK</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginVertical: 20,
        fontFamily: 'serif', // Elegant font
    },
    listContainer: {
        paddingVertical: 10,
    },
    card: {
        marginBottom: 16,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#FF69B4', // Pink color
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        marginBottom: 12,
    },
    addButton: {
        marginTop: 16,
        backgroundColor: '#FF1493', // Deep Pink
    },
    cancelButton: {
        marginTop: 8,
        backgroundColor: '#FF6347', // Tomato color
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default TodosScreen;
