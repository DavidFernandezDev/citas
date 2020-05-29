import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Cita from './src/components/Cita';

const App = () => {
  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Joan', sintomas: 'No come'},
    { id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No duerme'},
    { id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No canta'}
  ]);

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.encabezado}>Administrador de citas</Text>
        <FlatList
          data={citas}
          renderItem={({ item }) => <Cita cita={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  encabezado: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
  },
});

export default App;
