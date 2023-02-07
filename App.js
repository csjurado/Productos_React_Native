import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableHighlight, Modal, Pressable } from 'react-native';
import { useState } from 'react';

let productos = [
  { nombre: 'CocaCola', categoria: 'Bebidas', precioCompra: 0.73, precioVenta: 0.78, codigo: 101 },
  { nombre: 'Jabón', categoria: 'Higiene', precioCompra: 0.84, precioVenta: 0.9, codigo: 102 },
  { nombre: 'Pepsi', categoria: 'Bebidas', precioCompra: 0.35, precioVenta: 0.39, codigo: 103 },
  { nombre: 'Cepillo', categoria: 'Higiene', precioCompra: 0.46, precioVenta: 0.48, codigo: 104 },
  { nombre: 'Shampoo', categoria: 'Higiene', precioCompra: 0.13, precioVenta: 0.15, codigo: 105 },
];

// Es Nuevo e indica si se estyá creando un nueva persona o se está modificando 
let esNuevo = true;
//Esta variable alamacena el dindice del arreglo elemento seleccionado par edicición 
let indiceSeleccionado = -1;

export default function App() {
  const [txtcodigo, setTxtCodigo] = useState();
  const [txtNombre, setTxtNombre] = useState();
  const [txtCategoria, setTxtCategoria] = useState();
  const [txtPrecioCompra, setPrecioCompra] = useState();
  const [txtPrecioVenta, setTxtPrecioVenta] = useState();
  const [numElementos, setNumElementos] = useState(productos.length);
  const [modalVisible, setModalVisible] = useState(false);
  let v1;
  let calcularVenta = (txtPrecioCompra) => {
    v1 = parseFloat(txtPrecioCompra);
    v1 = (v1 * 1.20).toFixed(2);
    return v1;
  }


  let ItemProducto = (props) => {
    return (
      <View style={styles.itemPersona}>
        <View style={styles.itemIndice}>
          <Text style={styles.itemCodigo}>{props.producto.codigo}</Text>
        </View>
        <TouchableHighlight activeOpacity={0.6} onPress={() => {
          console.log("datos : ", props.producto);
          setTxtCodigo(props.producto.codigo + "");
          setTxtNombre(props.producto.nombre);
          setTxtCategoria(props.producto.categoria);
          setPrecioCompra(props.producto.precioCompra + "");
          setTxtPrecioVenta(props.producto.precioVenta + "");
          esNuevo = false;
          indiceSeleccionado = props.indice;

        }}>
          <View style={styles.itemContenido}>
            <Text style={styles.textoPrincipal}>
              {props.producto.nombre}
            </Text>

            <Text style={styles.textoSecundario}>
              {props.producto.categoria}
            </Text>

            <Text style={styles.textoTercero}>
              {props.producto.precioVenta} {" $"}
            </Text>
          </View>
        </TouchableHighlight>

        <View style={styles.itemBotones}>
          <Button
            title=' E '
            color='green'
            disabled={true}
            onPress={() => {
              console.log("datos : ", props.producto);
              setTxtCodigo(props.producto.codigo + "");
              setTxtNombre(props.producto.nombre);
              setTxtCategoria(props.producto.categoria);
              setPrecioCompra(props.producto.precioCompra + "");
              setTxtPrecioVenta(props.producto.precioVenta + "");
              esNuevo = false;
              indiceSeleccionado = props.indice;

            }}
          />

          
          <Button
            title=' X '
            color='red'
            onPress={() => {
              setModalVisible(false);
              indiceSeleccionado = props.indice;
              productos.splice(indiceSeleccionado, 1);
              console.log("Arreglo de prodcutos", productos);
              setNumElementos(productos.length);
              limpiar();
              
            }}
          />
        </View>
      </View>
    );
  }
  let limpiar = () => {
    setTxtCodigo(null);
    setTxtNombre(null);
    setTxtCategoria(null);
    setPrecioCompra(null);
    setTxtPrecioVenta(null);
    esNuevo = true;

  }
  let existeProducto = () => {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].codigo == txtcodigo) {
        return true;
      }
    }
    return false;
  }
  let guardarProducto = () => {
    if ((((txtcodigo == (null) || txtNombre == (null)) || txtCategoria == (null)) || txtPrecioCompra == (null))) {
      Alert.alert('ALTERTA', 'Debes llenar todos los campos ');
    } else {
      if (esNuevo) {
        if (existeProducto()) {
          Alert.alert("INFO", "Ya existe ese producto con código  : " + txtcodigo);
        } else {
          let x = parseFloat(txtPrecioVenta);
          x = (x * 1.2).toFixed(2);
          let producto = { nombre: txtNombre, categoria: txtCategoria, precioCompra: txtPrecioCompra, precioVenta: calcularVenta(txtPrecioCompra), codigo: txtcodigo };
          productos.push(producto);
        }
      } else {
        productos[indiceSeleccionado].codigo = txtcodigo;
        productos[indiceSeleccionado].nombre = txtNombre;
        productos[indiceSeleccionado].categoria = txtCategoria;
        productos[indiceSeleccionado].precioCompra = txtPrecioCompra;
        productos[indiceSeleccionado].precioVenta = calcularVenta(txtPrecioCompra);
      }
      limpiar();
      setNumElementos(productos.length);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text >LISTA DE PRODUCTOS  </Text>
        <TextInput
          style={styles.txt}
          value={txtcodigo}
          placeholder='CÓDIGO '
          onChangeText={setTxtCodigo}
          keyboardType='numeric'
          editable={esNuevo}
        />
        <TextInput
          style={styles.txt}
          value={txtNombre}
          placeholder='NOMBRE '
          onChangeText={setTxtNombre}
        />
        <TextInput
          style={styles.txt}
          value={txtCategoria}
          placeholder='CATEGORIA'
          onChangeText={setTxtCategoria}
        />
        <TextInput
          style={styles.txt}
          value={txtPrecioCompra}
          placeholder='PRECIO DE COMPRA '
          onChangeText={setPrecioCompra}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.txt}
          value={calcularVenta(txtPrecioCompra)}
          placeholder='PRECIO DE VENTA '
          onChangeText={setTxtPrecioVenta}
          editable={false}
        />
        <View style={styles.areaBotones}>
          <Button
            title='Guardar'
            onPress={() => {
              guardarProducto();
            }}
          />
          <Button
            title='Nuevo'
            onPress={() => {
              limpiar();
            }}
          />
        </View>
        <Text> PRODUCTOS : {numElementos}</Text>
      </View>

      <View style={styles.areaContenida}>

        <FlatList style={styles.lista}
          data={productos}
          renderItem={(obj) => {
            return <ItemProducto indice={obj.index} producto={obj.item} />
          }}
          keyExtractor={(item) => {
            return item.codigo;
          }}>
        </FlatList>

      </View>
      <StatusBar style="auto" />
      <View style={styles.areaPie}>
        <TouchableHighlight onPress={() => { Alert.alert('Probando', 'Probando el TouchableHighlight') }}>
          <Text> Autor : Carlos Jurado</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column', // eje principal --> vertical 
    justifyContent: 'flex-start',
    //alignItems: 'stretch',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  itemPersona: {
    backgroundColor: '#3c6e71',
    marginBottom: 15,
    padding: 6,
    borderRadius: 15,
    flexDirection: 'row',
  },
  textoPrincipal: {
    color: '#ffffff',
    fontSize: 20
  },
  textoSecundario: {
    color: '#d9d9d9',
    fontWeight: 'bold',
    fontSize: 16
  },
  textoTercero: {
    color: '#d9d9d9',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titulo: {
    color: '#353535',
    //marginBottom: 10,
    //fontSize: 25,
    //paddingHorizontal: 40,
    //paddingTop: 40,
    //fontWeight: 'bold',
    flex: 4,
    justifyContent: 'center',
  },
  areaContenida: {
    flex: 5,
    //backgroundColor: '#f77f00',
  },
  areaPie: {
    flex: 1,
    //backgroundColor: '#7209b7',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  itemIndice: {
    //backgroundColor:'#e63946',
    flex: 1,
    justifyContent: 'center',
    color: '#eaf0ce',
    alignItems: 'center',
  },
  itemCodigo: {
    flex: 1,
    color: '#c0c5c1',
    justifyContent: 'center',
    alignItems: 'center',

  },
  itemContenido: {
    paddingLeft: 5,
    //backgroundColor: '#8338ec',
    flex: 6,
    justifyContent: 'space-around',
  },
  itemBotones: {
    flexDirection: 'row',
    //backgroundColor: '#8338ec',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    paddingLeft: 8
  },
  txt: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingTop: 3,
    paddingHorizontal: 5,
    marginBottom: 8,
    borderRadius: 10,
  },
  areaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  /* Estilos para el Modal */
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});
