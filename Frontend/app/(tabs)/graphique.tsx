import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';

const API_URL = 'http://172.24.171.236:8080';

export default function GraphiqueScreen() {
    const [history, setHistory] = useState<any[]>([]);

    const [selectedChart, setSelectedChart] = useState<
        'temperature' | 'humidity' | null
    >(null);

    const loadData = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/sensor/all`
            );

            const data = await response.json();

            setHistory(data.slice(-10));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();

        const interval = setInterval(() => {
            loadData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const labels = history.map(
        (_, index) => `${index + 1}`
    );

    const temperatureData = history
        .map((item) => Number(item.temperature))
        .filter((value) => !isNaN(value));

    const humidityData = history
        .map((item) => Number(item.soilMoisture))
        .filter((value) => !isNaN(value));

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <Ionicons
                    name="stats-chart"
                    size={30}
                    color="white"
                />

                <Text style={styles.headerTitle}>
                    Graphiques
                </Text>

            </View>

            <View style={{ height: 90 }} />

            <Text style={styles.subTitle}>
                Visualisez l'évolution de vos mesures
            </Text>

            {/* Barre de sélection */}
            <View style={styles.tabsContainer}>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedChart === 'temperature' &&
                        styles.activeTab,
                    ]}
                    onPress={() =>
                        setSelectedChart('temperature')
                    }>

                    <Text
                        style={[
                            styles.tabText,
                            selectedChart === 'temperature' &&
                            styles.activeTabText,
                        ]}>
                        Température
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        selectedChart === 'humidity' &&
                        styles.activeTab,
                    ]}
                    onPress={() =>
                        setSelectedChart('humidity')
                    }>

                    <Text
                        style={[
                            styles.tabText,
                            selectedChart === 'humidity' &&
                            styles.activeTabText,
                        ]}>
                        Humidité du sol
                    </Text>

                </TouchableOpacity>

            </View>

            {/* Aucun graphique */}
            {selectedChart === null && (
                <View style={styles.emptyContainer}>

                    <Text style={styles.emptyText}>
                        Veuillez sélectionner un graphique
                    </Text>

                </View>
            )}

            {/* Température */}
            {selectedChart === 'temperature' &&
                temperatureData.length > 1 && (
                    <View style={styles.card}>

                        <View style={styles.chartTitleRow}>

                            <Text style={styles.chartTitle}>
                                Température
                            </Text>

                        </View>

                        <LineChart
                            data={{
                                labels,
                                datasets: [
                                    {
                                        data: temperatureData,
                                    },
                                ],
                            }}
                            width={
                                Dimensions.get('window').width - 60
                            }
                            height={220}
                            yAxisSuffix="°C"
                            chartConfig={{
                                backgroundGradientFrom:
                                    '#FFFFFF',

                                backgroundGradientTo:
                                    '#FFFFFF',

                                decimalPlaces: 1,

                                color: (opacity = 1) =>
                                    `rgba(76,175,80,${opacity})`,

                                labelColor: (opacity = 1) =>
                                    `rgba(0,0,0,${opacity})`,
                            }}
                            bezier
                            style={{
                                borderRadius: 16,
                            }}
                        />

                    </View>
                )}

            {/* Humidité */}
            {selectedChart === 'humidity' &&
                humidityData.length > 1 && (
                    <View style={styles.card}>

                        <View style={styles.chartTitleRow}>

                            <Text style={styles.chartTitle}>
                                Humidité du sol
                            </Text>

                        </View>

                        <LineChart
                            data={{
                                labels,
                                datasets: [
                                    {
                                        data: humidityData,
                                    },
                                ],
                            }}
                            width={
                                Dimensions.get('window').width - 60
                            }
                            height={220}
                            yAxisSuffix="%"
                            chartConfig={{
                                backgroundGradientFrom:
                                    '#FFFFFF',

                                backgroundGradientTo:
                                    '#FFFFFF',

                                decimalPlaces: 0,

                                color: (opacity = 1) =>
                                    `rgba(33,150,243,${opacity})`,

                                labelColor: (opacity = 1) =>
                                    `rgba(0,0,0,${opacity})`,
                            }}
                            bezier
                            style={{
                                borderRadius: 16,
                            }}
                        />

                    </View>
                )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 20,
    },

    header: {
        backgroundColor: '#2E7D32',
        paddingTop: 45,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    chartTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    tabsContainer: {
        flexDirection: 'row',

        backgroundColor: '#FFFFFF',

        borderRadius: 15,

        overflow: 'hidden',

        marginBottom: 25,

        elevation: 4,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.1,

        shadowRadius: 4,
    },

    tabButton: {
        flex: 1,

        paddingVertical: 16,

        alignItems: 'center',
    },

    activeTab: {
        backgroundColor: '#4CAF50',
    },

    tabText: {
        fontSize: 16,

        fontWeight: 'bold',

        color: '#000',
    },

    activeTabText: {
        color: '#FFF',
    },

    emptyContainer: {
        height: 300,

        justifyContent: 'center',

        alignItems: 'center',
    },

    emptyText: {
        fontSize: 18,

        color: '#777',

        fontStyle: 'italic',
    },

    card: {
        backgroundColor: 'white',

        borderRadius: 20,

        padding: 15,

        marginBottom: 20,
    },

    chartTitle: {
        fontSize: 20,

        fontWeight: 'bold',

        marginBottom: 15,
    },

    subTitle: {
  textAlign: 'center',
  fontSize: 18,
  color: '#666',
  marginBottom: 25,
  marginTop: -30,
},
});