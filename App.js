import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Cita from './src/components/Cita';
import Form from './src/components/Form';
import asyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [citas, setCitas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        console.log(citasStorage);

        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitas(JSON.stringify(citasFiltradas));
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  //hide keyboard
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  //save appointments on async storage
  const guardarCitas = async citasJSON => {
    try {
      await asyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={ocultarTeclado}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <View>
          <TouchableWithoutFeedback onPress={mostrarFormulario} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostarForm}>
              {mostrarForm ? 'Ocultar formulario' : 'Crear Nueva Cita'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Form
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitas={guardarCitas}
              />
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
    </TouchableWithoutFeedback>
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
