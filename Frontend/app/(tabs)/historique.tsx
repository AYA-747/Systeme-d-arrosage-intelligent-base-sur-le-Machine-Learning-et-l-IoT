import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const API_URL = 'http://172.24.171.236:8080';

export default function HistoriqueScreen() {

  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/sensor/all`
      );

      const data = await response.json();

      setHistory(data.reverse());

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    loadHistory();

    const interval = setInterval(() => {
      loadHistory();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const formatDate = (timestamp: string) => {

    const date = new Date(timestamp);

    const jour = date.getDate().toString().padStart(2, '0');
    const mois = (date.getMonth() + 1).toString().padStart(2, '0');
    const annee = date.getFullYear();

    const heure = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const seconde = date.getSeconds().toString().padStart(2, '0');

    return {
      date: `${jour}/${mois}/${annee}`,
      heure: `${heure}:${minute}:${seconde}`,
    };

  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Ionicons
          name="time"
          size={28}
          color="white"
        />

        <Text style={styles.headerTitle}>
          Historique des mesures
        </Text>

      </View>

      <ScrollView>

        {/* Tableau */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >

          <View style={styles.table}>

            {/* Entête */}

            <View style={styles.tableHeader}>

              <Text style={[styles.headerCell, { width: 110 }]}>
                Date & Heure
              </Text>

              <Text style={[styles.headerCell, { width: 80 }]}>
                Temp.
              </Text>

              <Text style={[styles.headerCell, { width: 80 }]}>
                Humidité
              </Text>

              <Text style={[styles.headerCell, { width: 90 }]}>
                Pompe
              </Text>

            </View>

            {/* Données */}

            {history.map((item: any, index: number) => (

              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor:
                      index % 2 === 0
                        ? "#FFFFFF"
                        : "#F7FFF6",
                  },
                ]}
              >

                <View style={[styles.dateCell, { width: 110 }]}>

                  <Text style={styles.dateText}>
                    {formatDate(item.timestamp).date}
                  </Text>

                  <Text style={styles.timeText}>
                    {formatDate(item.timestamp).heure}
                  </Text>

                </View>

                <Text style={[styles.cell, { width: 80 }]}>
                  {item.temperature}°C
                </Text>

                <Text style={[styles.cell, { width: 80 }]}>
                  {item.soilMoisture}%
                </Text>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        item.pumpStatus === "ON"
                          ? "#4CAF50"
                          : "#F44336",
                    },
                  ]}
                >

                  <Text style={styles.badgeText}>
                    {item.pumpStatus}
                  </Text>

                </View>

              </View>

            ))}

          </View>

        </ScrollView>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  header: {
    backgroundColor: "#2E7D32",
    paddingTop: 45,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },

  table: {
    width: 470,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e9e6e6",
    paddingVertical: 15,
  },

  headerCell: {
    color: "bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
  },

  cell: {
    textAlign: "center",
    color: "#333",
    fontSize: 13,
  },

  badge: {
    width: 70,
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontWeight: "bold",
  },

  dateCell:{
  justifyContent:'center',
  alignItems:'center',
},

dateText:{
  fontSize:12,
  fontWeight:'bold',
  color:'#333',
},

timeText:{
  fontSize:11,
  color:'#757575',
  marginTop:2,
},
});