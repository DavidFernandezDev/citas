import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Form = ({ citas, setCitas, guardarMostrarForm }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const inputs = [
    { label: 'Paciente:', onChange: guardarPaciente },
    { label: 'Dueño:', onChange: guardarPropietario },
    { label: 'Teléfono Contacto:', onChange: guardarTelefono },
    { label: 'Síntomas:', onChange: guardarSintomas },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric'};
    guardarFecha(date.toLocaleDateString('es-Es', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit' };
    guardarHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (
      (paciente.trim() ||
        propietario.trim() ||
        telefono.trim() ||
        fecha.trim() ||
        hora.trim() ||
        sintomas.trim()) === ''
    ) {
      mostrarAlerta();
    }

    const cita = {
      id: shortid.generate(),
      paciente,
      propietario,
      telefono,
      fecha,
      hora,
      sintomas,
    };

    //adding new appointment to state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //hide form
    guardarMostrarForm(false);
  };

  //show alert if form validates fails
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', // Title
      'Todos los campos son obligatorios', // Message
      [{ text: 'OK' }], // Arreglo de botones
    )
  }

  return (
    <>
      <ScrollView style={styles.formulario}>
        <FlatList
          data={inputs}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => item.onChange(text)}
              />
            </View>
          )}
          keyExtractor={item => item.label}
        />
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora: </Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <TouchableHighlight onPress={crearNuevaCita} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default Form;