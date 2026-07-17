import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://172.24.171.236:8080';

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  const loadData = async () => {
    try {
      const sensorResponse = await fetch(
        `${API_URL}/api/sensor/latest`
      );
      const sensorJson = await sensorResponse.json();
      setSensorData(sensorJson);

      const configResponse = await fetch(
        `${API_URL}/api/config`
      );
      const configJson = await configResponse.json();
      setConfig(configJson);
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de se connecter au serveur.'
      );
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendCommand = async (endpoint: string) => {
    try {
      await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
      });

      loadData();
    } catch (error) {
      Alert.alert('Erreur', 'Commande non envoyée.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroContainer}>

        <Image
          source={require('../../assets/images/menthe.jpg')}
          style={styles.heroImage}
        />

        <View style={styles.header}>
<View style={styles.headerContent}>
    <Ionicons
        name="leaf"
        size={30}
        color="#09390b"
    />

    <Text style={styles.headerTitle}>
        Ma Plante
    </Text>
</View>
        </View>

        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>
            Bienvenue !
          </Text>

          <Text style={styles.heroSubtitle}>
            Surveillez votre plante en temps réel
          </Text>
        </View>

      </View>

      <View style={styles.row}>

        <View style={[styles.card, styles.smallCard]}>
          <View style={styles.labelContainer}>
            <Ionicons
              name="thermometer"
              size={22}
              color="#F44336"
            />

            <Text style={styles.labelText}>
              Température
            </Text>
          </View>

          <Text style={styles.value}>
            {sensorData?.temperature ?? '--'} °C
          </Text>
        </View>

        <View style={[styles.card, styles.smallCard]}>
          <View style={styles.labelContainer}>
            <Ionicons
              name="water"
              size={22}
              color="#2196F3"
            />

            <Text style={styles.labelText}>
              Humidité
            </Text>
          </View>

          <Text style={styles.value}>
            {sensorData?.soilMoisture ?? '--'} %
          </Text>
        </View>

      </View>

      <View style={[styles.card, styles.largeCard]}>

        <View style={styles.labelContainer}>
          <Ionicons
            name="funnel"
            size={22}
            color="#2196F3"
          />

          <Text style={styles.labelText}>
            État de la pompe
          </Text>
        </View>

        <View style={styles.pumpRow}>

          <Text
            style={[
              styles.pumpStatus,
              {
                color:
                  sensorData?.pumpStatus === 'ON'
                    ? '#4CAF50'
                    : '#F44336',
              },
            ]}>
            {sensorData?.pumpStatus ?? '--'}
          </Text>

          {!config?.autoMode && (
            <View style={styles.pumpButtonsContainer}>

              <TouchableOpacity
                style={[
                  styles.powerButton,
                  sensorData?.pumpStatus === 'OFF'
                    ? styles.powerOnActive
                    : styles.powerInactive,
                ]}
                onPress={() => sendCommand('/api/pump/on')}>
                <Ionicons
                  name="power"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.powerButton,
                  sensorData?.pumpStatus === 'ON'
                    ? styles.powerOffActive
                    : styles.powerInactive,
                ]}
                onPress={() => sendCommand('/api/pump/off')}>
                <Ionicons
                  name="power"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>

            </View>
          )}

        </View>

      </View>

      <View style={[styles.card, styles.largeCard]}>

        <View style={styles.labelContainer}>
          <Ionicons
            name="sync-circle"
            size={22}
            color="#FF9800"
          />

          <Text style={styles.labelText}>
            Mode automatique
          </Text>
        </View>

        <Text
          style={[
            styles.value,
            {
              color: config?.autoMode
                ? '#4CAF50'
                : '#F44336',
            },
          ]}>
          {config?.autoMode
            ? 'Activé'
            : 'Désactivé'}
        </Text>

      </View>

      <TouchableOpacity
        style={[
          styles.button,
          config?.autoMode
            ? styles.manualButton
            : styles.autoButton,
        ]}
        onPress={() =>
          sendCommand(
            config?.autoMode
              ? '/api/auto/disable'
              : '/api/auto/enable'
          )
        }>
        <Text style={styles.buttonText}>
          {config?.autoMode
            ? 'Passer en mode manuel'
            : 'Activer le mode automatique'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 20,

    marginBottom: 18,

    elevation: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,

    shadowRadius: 8,
  },

  label: {
    fontSize: 16,
    color: '#666',
  },

  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  button: {
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },

  onButton: {
    backgroundColor: '#4CAF50',
  },

  offButton: {
    backgroundColor: '#F44336',
  },

  autoButton: {
    backgroundColor: '#2196F3',
  },

  manualButton: {
    backgroundColor: '#FF9800',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  welcomeCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  welcomeTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  welcomeText: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 15,
  },

  smallCard: {
    width: '42%',
  },
  pumpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  centerCard: {
    width: '90%',
    alignSelf: 'center',
  },

  pumpStatus: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  onSwitch: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },

  offSwitch: {
    backgroundColor: '#F44336',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },

  switchText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heroContainer: {
    position: 'relative',
    marginBottom: 25,
  },

  heroImage: {
    width: '100%',
    height: 260,
  },

  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,

    backgroundColor: 'rgba(46,125,50,0.85)',

    padding: 15,
    borderRadius: 15,
  },

  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  plantInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },

  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  plantStatus: {
    marginTop: 5,
    color: '#4CAF50',
    fontSize: 28,
    fontWeight: 'bold',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
  },

  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  pumpButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 15,
  },

  pumpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    fontWeight: 'bold',
  },

  largeCard: {
    marginLeft: 18,
    marginRight: 18,
  },

  powerButton: {
  width: 52,
  height: 52,
  borderRadius: 26,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
},

powerOnActive: {
  backgroundColor: '#4CAF50',
},

powerOffActive: {
  backgroundColor: '#F44336',
},

powerInactive: {
  backgroundColor: '#BDBDBD',
},

headerContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

});