import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Cita from './src/components/Cita';
import Form from './src/components/Form';

const App = () => {
  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Joan', sintomas: 'No come'},
    { id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No duerme'},
    { id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No canta'}
  ]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <View>
          <TouchableHighlight onPress={mostrarFormulario} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostarForm}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Form />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length
                  ? 'Administra tus citas'
                  : 'no hay citas, agrega una'}
              </Text>
              <FlatList
                data={citas}
                renderItem={({ item }) => (
                  <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
