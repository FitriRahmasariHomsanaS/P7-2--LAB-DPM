import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, Card, Divider } from 'react-native-paper';

const ExploreScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([
        { id: '1', title: 'Eiffel Tower, Paris', description: 'Discover the iconic Eiffel Tower, one of the world\'s most recognized landmarks, with breathtaking views of Paris.' },
        { id: '2', title: 'Great Barrier Reef, Australia', description: 'Explore the world’s largest coral reef system, full of vibrant marine life and crystal-clear waters.' },
        { id: '3', title: 'Machu Picchu, Peru', description: 'Experience the ancient Incan city of Machu Picchu, a UNESCO World Heritage site with rich history and breathtaking views.' },
        { id: '4', title: 'Santorini, Greece', description: 'Known for its white-washed buildings, blue-domed churches, and stunning sunsets over the Aegean Sea.' },
        { id: '5', title: 'Tokyo, Japan', description: 'Immerse yourself in the bustling metropolis of Tokyo, where tradition and technology meet in vibrant harmony.' },
        { id: '6', title: 'Grand Canyon, USA', description: 'Explore the Grand Canyon’s natural beauty, offering spectacular views and adventurous activities in the heart of nature.' },
        { id: '7', title: 'Kyoto, Japan', description: 'Visit Kyoto for its tranquil temples, stunning gardens, and traditional tea houses, especially during cherry blossom season.' },
        { id: '8', title: 'Victoria Falls, Zimbabwe/Zambia', description: 'Witness the grandeur of Victoria Falls, one of the world’s largest and most spectacular waterfalls.' },
        { id: '9', title: 'Bora Bora, French Polynesia', description: 'Relax in paradise with overwater bungalows, clear turquoise waters, and a peaceful atmosphere perfect for a getaway.' },
        { id: '10', title: 'Rome, Italy', description: 'Walk through history in the Eternal City, with landmarks like the Colosseum, Roman Forum, and Vatican City.' },
    ]);
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = () => {
        const filtered = data.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.welcomeText}>Welcome to Explore!</ThemedText>
                <ThemedText style={styles.subText}>Discover new destinations and experiences</ThemedText>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search destinations..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
                    Search
                </Button>
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.title} />
                        <Divider />
                        <Card.Content>
                            <ThemedText style={styles.descriptionText}>{item.description}</ThemedText>
                        </Card.Content>
                    </Card>
                )}
                ListEmptyComponent={
                    <ThemedText style={styles.emptyText}>No destinations found</ThemedText>
                }
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subText: {
        fontSize: 16,
        color: '#black',
        marginTop: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginRight: 8,
    },
    searchButton: {
        backgroundColor: '#64b5f6',
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 3,
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#black',
    },
    descriptionText: {
        color: '#000', // Set description text color to black
    },
});

export default ExploreScreen;
