import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Cita from './src/components/Cita';

const App = () => {
  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Joan', sintomas: 'No come'},
    { id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No duerme'},
    { id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No canta'}
  ]);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <Text style={styles.titulo}>
          {citas.length ? 'Administra tus citas' : 'no hay citas, agrega una'}
        </Text>
        <FlatList
          data={citas}
          renderItem={({ item }) => (
            <Cita cita={item} eliminarPaciente={eliminarPaciente} />
          )}
          keyExtractor={cita => cita.id}
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
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
  },
});

export default App;
