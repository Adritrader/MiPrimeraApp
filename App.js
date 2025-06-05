import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VentaItem from './components/ventaItem'; // Asegúrate de que sea correcta la ruta
import styles from './styles'; // Importación de estilos

export default function App() {
  const [ventas, setVentas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoVenta, setEditandoVenta] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [nuevaVenta, setNuevaVenta] = useState({
    articulo: '',
    talla: '',
    precio: '',
    fecha: '',
  });

  // Cargar ventas al iniciar
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('ventas');
        if (json) setVentas(JSON.parse(json));
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar las ventas');
      }
    })();
  }, []);

  // Guardar ventas cada vez que cambien
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('ventas', JSON.stringify(ventas));
      } catch (error) {
        Alert.alert('Error', 'No se pudieron guardar las ventas');
      }
    })();
  }, [ventas]);

  const abrirModal = () => {
    const hoy = new Date().toISOString().split('T')[0];
    setNuevaVenta({ articulo: '', talla: '', precio: '', fecha: hoy });
    setModalVisible(true);
  };

  const handleGuardar = () => {
    if (!nuevaVenta.articulo || !nuevaVenta.precio) {
      Alert.alert('Faltan datos', 'Por favor completa artículo y precio');
      return;
    }

    const precioNum = parseFloat(nuevaVenta.precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      Alert.alert('Precio inválido', 'El precio debe ser un número mayor a cero');
      return;
    }

    if (editandoVenta) {
      const nuevas = ventas.map(v =>
        v.id === editandoVenta.id ? { ...editandoVenta, ...nuevaVenta } : v
      );
      setVentas(nuevas);
    } else {
      const nueva = { id: Date.now().toString(), ...nuevaVenta };
      setVentas([...ventas, nueva]);
    }

    setNuevaVenta({ articulo: '', talla: '', precio: '', fecha: '' });
    setEditandoVenta(null);
    setModalVisible(false);
  };

  const handleEditar = (venta) => {
    setEditandoVenta(venta);
    setNuevaVenta(venta);
    setModalVisible(true);
  };

  const handleEliminar = (id) => {
    Alert.alert('Eliminar', '¿Seguro que quieres eliminar esta venta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setVentas(ventas.filter(v => v.id !== id)),
      },
    ]);
  };

  const filtrarVentas = () => {
    return ventas
      .filter(v =>
        v.articulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.fecha.includes(busqueda)
      )
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  };

  const exportarCSV = async () => {
    if (ventas.length === 0) {
      Alert.alert('No hay ventas', 'No hay datos para exportar');
      return;
    }

    try {
      const csv = Papa.unparse(ventas);
      const fileUri = FileSystem.documentDirectory + 'ventas.csv';
      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Error', 'No se pudo exportar el archivo');
    }
  };

  const totalVentas = ventas.reduce(
    (acc, venta) => acc + parseFloat(venta.precio || 0),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registro de Ventas</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por artículo o fecha"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={filtrarVentas()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VentaItem
            venta={item}
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay ventas registradas</Text>
        }
      />

      <Text style={styles.totalText}>
        Total Vendido: €{totalVentas.toFixed(2)}
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.card, { flex: 1, marginRight: 8 }]} onPress={abrirModal}>
          <Text style={styles.cardTitle}>Añadir Venta</Text>
        </Pressable>
        <Pressable style={[styles.card, { flex: 1, marginLeft: 8 }]} onPress={exportarCSV}>
          <Text style={styles.cardTitle}>Exportar CSV</Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editandoVenta ? 'Editar' : 'Nueva'} Venta</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Artículo"
            value={nuevaVenta.articulo}
            onChangeText={(text) => setNuevaVenta({ ...nuevaVenta, articulo: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Talla"
            value={nuevaVenta.talla}
            onChangeText={(text) => setNuevaVenta({ ...nuevaVenta, talla: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Precio"
            keyboardType="numeric"
            value={nuevaVenta.precio}
            onChangeText={(text) => setNuevaVenta({ ...nuevaVenta, precio: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Fecha (YYYY-MM-DD)"
            value={nuevaVenta.fecha}
            onChangeText={(text) => setNuevaVenta({ ...nuevaVenta, fecha: text })}
          />

          <View style={styles.modalButtons}>
            <Pressable style={[styles.card, { flex: 1, marginRight: 8, alignItems: 'center' }]} onPress={handleGuardar}>
              <Text style={styles.cardTitle}>Guardar</Text>
            </Pressable>
            <Pressable
              style={[styles.card, { flex: 1, marginLeft: 8, alignItems: 'center', backgroundColor: '#e74c3c' }]}
              onPress={() => {
                setModalVisible(false);
                setNuevaVenta({ articulo: '', talla: '', precio: '', fecha: '' });
                setEditandoVenta(null);
              }}
            >
              <Text style={styles.cardTitle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}