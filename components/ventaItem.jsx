// components/VentaItem.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function VentaItem({ venta, onEditar, onEliminar }) {
  return (
    <View style={ventaItemStyles.card}>
      <Text style={ventaItemStyles.cardTitle}>{venta.articulo}</Text>
      {venta.talla && <Text style={ventaItemStyles.cardSize}>Talla: {venta.talla}</Text>}
      <Text style={ventaItemStyles.cardPrice}>Precio: €{parseFloat(venta.precio).toFixed(2)}</Text>
      <Text style={ventaItemStyles.cardDate}>Fecha: {venta.fecha}</Text>

      <View style={ventaItemStyles.cardActions}>
        <Pressable style={ventaItemStyles.editButton} onPress={onEditar}>
          <Text style={ventaItemStyles.actionText}>Editar</Text>
        </Pressable>
        <Pressable style={ventaItemStyles.deleteButton} onPress={onEliminar}>
          <Text style={ventaItemStyles.actionText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Puedes crear un archivo styles.js aparte también para componentes si quieres modularizar más
const ventaItemStyles = {
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSize: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '500',
    marginTop: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
}