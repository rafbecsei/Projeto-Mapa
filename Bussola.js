import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Bussola = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Inicia a leitura dos dados do Magnetometer
    const subscription = Magnetometer.addListener((data) => {
      const { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle >= 0 ? angle : angle + 360; // Ajusta para manter o ângulo positivo
      setRotation(angle);
    });

    Magnetometer.setUpdateInterval(100); // Define o intervalo de atualização

    // Limpeza da assinatura quando o componente for desmontado
    return () => {
      subscription.remove();
    };
  }, []);

  const bussolaStyle = {
    transform: [{ rotate: `${rotation}deg` }],
  };

  return (
    <View style={styles.bussolaContainer}>
      <Text style={styles.bussolaLabel}>Bússola</Text>
      <View style={styles.bussola}>
        <Image
          source={require('/assets/bussola.png')}
          style={[styles.bussolaImage, bussolaStyle]}
        />
      </View>
      <Text style={styles.rotationText}>Rotação: {rotation.toFixed(2)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bussolaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bussolaLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bussola: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bussolaImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  rotationText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Bussola;
