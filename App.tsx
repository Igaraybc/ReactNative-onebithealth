import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Form } from './src/components/form';
import { Title } from './src/components/title';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='dark'/>
      <Title />
      <Form />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //Usar 100% da tela
    backgroundColor: '#E0E7E3',
    paddingTop: 80
  }
});
