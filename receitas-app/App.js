import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: '🥞 Panqueca Americana Clássica',
      ingredientes: '• 1 xícara de farinha de trigo\n• 2 colheres (sopa) de açúcar\n• 2 colheres (chá) de fermento em pó\n• 1 pitada de sal\n• 1 ovo batido\n• 1 xícara de leite\n• 2 colheres (sopa) de manteiga derretida',
      preparo: '1. Misture os ingredientes secos em uma tigela grande.\n2. Em outro recipiente, misture o ovo, o leite e a manteiga.\n3. Junte as duas misturas e mexa até ficar homogêneo.\n4. Aqueça uma frigideira antiaderente e coloque porções da massa.\n5. Vire quando dourarem e surgirem bolhas na superfície.'
    }
  ]);

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const [modalVerVisivel, setModalVerVisivel] = useState(false);
  const [modalCadastrarVisivel, setModalCadastrarVisivel] = useState(false);

  const [nomeInput, setNomeInput] = useState('');
  const [ingredientesInput, setIngredientesInput] = useState('');
  const [preparoInput, setPreparoInput] = useState('');

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    setModalVerVisivel(true);
  };

  const fecharReceita = () => {
    setReceitaSelecionada(null);
    setModalVerVisivel(false);
  };

  const limparCampos = () => {
    setNomeInput('');
    setIngredientesInput('');
    setPreparoInput('');
  };

  const salvarReceita = () => {
    if (!nomeInput.trim() || !ingredientesInput.trim() || !preparoInput.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nomeInput,
      ingredientes: ingredientesInput,
      preparo: preparoInput,
    };

    setReceitas([...receitas, novaReceita]);
    alert('Receita adicionada com sucesso!');
    limparCampos();
    setModalCadastrarVisivel(false);
  };

  const cancelarCadastro = () => {
    limparCampos();
    setModalCadastrarVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>
      <Text style={styles.subtitle}>Colecione suas receitas preferidas</Text>

      <ScrollView style={styles.listaScroll} contentContainerStyle={styles.listaContainer} showsVerticalScrollIndicator={false}>
        {receitas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Button 
              title="Ver Receita" 
              color="#D9381E" 
              onPress={() => abrirReceita(item)} 
            />
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVerVisivel}
        onRequestClose={fecharReceita}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {receitaSelecionada && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.recipeTitle}>{receitaSelecionada.nome}</Text>
                
                <Text style={styles.sectionTitle}>Ingredientes:</Text>
                <Text style={styles.recipeText}>{receitaSelecionada.ingredientes}</Text>

                <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
                <Text style={styles.recipeText}>{receitaSelecionada.preparo}</Text>
              </ScrollView>
            )}

            <View style={styles.closeButtonContainer}>
              <Button 
                title="Fechar Receita" 
                color="#786053" 
                onPress={fecharReceita} 
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCadastrarVisivel}
        onRequestClose={cancelarCadastro}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentForm}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.recipeTitle}>Nova Receita</Text>

              <Text style={styles.label}>Nome da Receita</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bolo de Cenoura"
                placeholderTextColor="#A08875"
                value={nomeInput}
                onChangeText={setNomeInput}
              />

              <Text style={styles.label}>Ingredientes</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Digite os ingredientes..."
                placeholderTextColor="#A08875"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={ingredientesInput}
                onChangeText={setIngredientesInput}
              />

              <Text style={styles.label}>Modo de Preparo</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Passo a passo do preparo..."
                placeholderTextColor="#A08875"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={preparoInput}
                onChangeText={setPreparoInput}
              />

              <View style={styles.formButtonsContainer}>
                <View style={styles.flexButton}>
                  <Button title="Cancelar" color="#786053" onPress={cancelarCadastro} />
                </View>
                <View style={styles.spaceButton} />
                <View style={styles.flexButton}>
                  <Button title="Salvar" color="#D9381E" onPress={salvarReceita} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={() => setModalCadastrarVisivel(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingTop: 60
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2C1A11",
    textAlign: "center",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#786053",
    textAlign: "center",
    marginBottom: 20
  },
  listaScroll: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20
  },
  listaContainer: {
    paddingBottom: 100
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAD9CB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C1A11",
    marginBottom: 12
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "#FFF8F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5
  },
  modalContentForm: {
    backgroundColor: "#FFF8F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2C1A11",
    marginBottom: 20,
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D9381E",
    marginTop: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EAD9CB",
    paddingBottom: 4
  },
  recipeText: {
    fontSize: 15,
    color: "#4A362B",
    lineHeight: 22,
    marginBottom: 6
  },
  closeButtonContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#EAD9CB",
    paddingTop: 12
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2C1A11",
    marginBottom: 6,
    marginTop: 12
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAD9CB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#2C1A11"
  },
  inputMultiline: {
    minHeight: 80,
    height: "auto"
  },
  formButtonsContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 12
  },
  flexButton: {
    flex: 1
  },
  spaceButton: {
    width: 16
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D9381E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 28,
    includeFontPadding: false
  }
});
