import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';

export default function MentheScreen() {
  return (
    <View style={styles.container}>

      {/* Header fixe */}
      <View style={styles.header}>

        <View style={styles.headerRow}>

          <Ionicons
            name="leaf"
            size={28}
            color="white"
          />

          <Text style={styles.headerTitle}>
            Menthe
          </Text>

        </View>

      </View>
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.sectionRow}>

        <Ionicons
          name="bulb-outline"
          size={24}
          color="#2E7D32"
        />

        <Text style={styles.sectionTitle}>
          Conseils pour une menthe en bonne santé
        </Text>

      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Arrosage</Text>
        <Text>
          la menthe a absolument besoin d'un sol constamment frais et humide pour s'épanouir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lumière</Text>
        <Text>
          La menthe aime la lumière.
          4 à 6 heures de soleil par jour.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sol</Text>
        <Text>
          Utiliser un sol riche en matière organique
          et bien drainé.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Taille</Text>
        <Text>
          Couper régulièrement les tiges pour
          favoriser la croissance.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pot</Text>
        <Text>
          Utiliser un pot avec un bon drainage.
        </Text>
      </View>

      <View style={styles.healthCard}>
        <Image
          source={require('../../assets/images/menthe.jpg')}
          style={styles.healthImage}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.healthTitle}>
            Menthe en bonne santé
          </Text>

          <Text>✔ Feuilles vertes et brillantes</Text>
          <Text>✔ Tiges solides</Text>
          <Text>✔ Croissance rapide</Text>
          <Text>✔ Odeur fraîche</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>

        <Ionicons
          name="warning"
          size={24}
          color="#FF9800"
        />

        <Text style={styles.sectionTitle}>
          Maladies fréquentes
        </Text>

      </View>

      <View style={styles.diseaseCard}>

        <View style={styles.diseaseContent}>

          <View style={{ flex: 1 }}>

            <Text style={styles.diseaseTitle}>
              Feuilles jaunes
            </Text>

            <Text>
              Causes :
              {'\n'}• Trop d'eau
              {'\n'}• Mauvais drainage
              {'\n'}• Manque d'azote
            </Text>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.picturethisai.com/fr/disease/Mentha-spicata-Leaf-yellowing.html'
                )
              }>
              En savoir plus
            </Text>

          </View>

          <Image
            source={require('../../assets/images/jaune.webp')}
            style={styles.diseaseImage}
          />

        </View>

      </View>

      <View style={styles.diseaseCard}>

        <View style={styles.diseaseContent}>

          <View style={{ flex: 1 }}>

            <Text style={styles.diseaseTitle}>
              Taches Noires
            </Text>

            <Text>
              Causes :
              {'\n'}• Champignons
              {'\n'}• Humidité excessive
              {'\n'}• Mauvaise circulation d'air
            </Text>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.picturethisai.com/fr/disease/Mentha-spicata-Dark-blotch.html'
                )
              }>
              En savoir plus
            </Text>

          </View>

          <Image
            source={require('../../assets/images/noire.jpg')}
            style={styles.diseaseImage}
          />

        </View>

      </View>

      <View style={styles.diseaseCard}>

        <View style={styles.diseaseContent}>

          <View style={{ flex: 1 }}>

            <Text style={styles.diseaseTitle}>
              Feuilles Blanches
            </Text>

            <Text>
              Causes :
              {'\n'}• Oïdium
              {'\n'}• Humidité élevée
              {'\n'}• Mauvaise aération
            </Text>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.picturethisai.com/fr/disease/Mentha-spicata-Powdery-mildew.html'
                )
              }>
              En savoir plus
            </Text>

          </View>

          <Image
            source={require('../../assets/images/blanche.jpg')}
            style={styles.diseaseImage}
          />

        </View>

      </View>

    </ScrollView>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  content: {
  flex: 1,
},

  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 45,
    paddingBottom: 20,
  },

  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: 'white',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 15,
  },

  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  healthCard: {
    backgroundColor: '#E8F5E9',
    margin: 15,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
  },

  healthImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },

  healthTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },

  diseaseCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
  },

  diseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  link: {
    color: '#2196F3',
    marginTop: 10,
    fontWeight: 'bold',
  },

  diseaseContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  diseaseImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
  },
});