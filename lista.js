const frm = document.querySelector("form");
const dvQuadro = document.querySelector("#divQuadro");

// Adiciona um evento de submit ao formulário
frm.addEventListener("submit", (e) => {
  // Prevê o comportamento padrão do submit
  e.preventDefault();

  // Obtém o valor digitado na tarefa
  const tarefa = frm.inTarefa.value;
  
  // Obtém a data e hora atual
  var hora_data = new Date();
  var dataCriacao = hora_data.toLocaleString();

  // Cria elementos HTML h5 e h6
  const h5 = document.createElement("h5");
  const texto = document.createTextNode(tarefa);
  const h6 = document.createElement("h6");
  const data = document.createTextNode("Data e hora de criação: " + dataCriacao);

  // Adiciona o texto dos elementos h5 e h6
  h5.appendChild(texto);
  h6.appendChild(data);

  // Adiciona os elementos h5 e h6 a divQuadro
  dvQuadro.appendChild(h5);
  dvQuadro.appendChild(h6);

  // Limpa o campo de input e foca nele
  frm.inTarefa.value = "";
  frm.inTarefa.focus();
});

// Adiciona um evento de clique ao botão "btSelecionar"
frm.btSelecionar.addEventListener("click", () => {
  // Obtém todos os elementos h5 (tarefas)
  const tarefas = document.querySelectorAll("h5");

  // Verifica se existem tarefas para selecionar
  if (tarefas.length == 0) {
    alert("Não há tarefas para selecionar");
    return;
  }

  // Inicializa a variável auxiliar com -1
  let aux = -1;

  // Percorre todas as tarefas
  for (let i = 0; i < tarefas.length; i++) {
    // Verifica se a tarefa está selecionada
    if (tarefas[i].className == "tarefa-selecionada") {
      // Remove a seleção da tarefa
      tarefas[i].className = "tarefa-normal";
      // Armazena o índice da tarefa selecionada na variável auxiliar
      aux = i;
      break;
    }
  }

  // Verifica se a última tarefa estava selecionada
  if (aux == tarefas.length - 1) {
    // Inicializa novamente a variável auxiliar com -1
    aux = -1;
  }

  // Muda a classe da tarefa selecionada
  tarefas[aux + 1].className = "tarefa-selecionada" 
})

// Adiciona um event listener ao botão "btRetirar" para remover uma tarefa
frm.btRetirar.addEventListener("click", () => {
    // Seleciona todas as tarefas na página
    const tarefas = document.querySelectorAll("h5");
  
    // Inicializa a variável auxiliar com -1
    let aux = -1;
  
    // Percorre todas as tarefas procurando por uma tarefa selecionada
    tarefas.forEach((tarefa, i) => {
      if (tarefa.className == "tarefa-selecionada") {
        // Armazena o índice da tarefa selecionada na variável auxiliar
        aux = i;
        console.log(i);
      }
    });
  
    // Verifica se não há uma tarefa selecionada
    if (aux == -1) {
      // Exibe uma mensagem alertando o usuário para selecionar uma tarefa
      alert("Selecione uma tarefa para removê-la...");
      return;
    }
  
    // Confirma a exclusão da tarefa selecionada com o usuário
    if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {
      // Remove a tarefa selecionada
    dvQuadro.removeChild(tarefas[aux])        
  }
})

// Adiciona um evento de clique no botão de gravar
frm.btGravar.addEventListener("click", () => { 
    // Obtém todas as tarefas na página com o seletor "h5"
    const tarefas = document.querySelectorAll("h5")
    const datas = document.querySelectorAll("h6") 
  
    // Verifica se há tarefas para serem salvas
    if (tarefas.length == 0) {
      // Mostra uma mensagem de alerta caso não haja tarefas
      alert("Não há tarefas para serem salvas")      
      return                                     
    }
  
    // Inicializa a variável para armazenar os dados das tarefas
    let dados = ""
    let dados2 = ""                            
  
    // Percorre cada tarefa
    tarefas.forEach(tarefa => { 
      // Adiciona o texto da tarefa ao final da string de dados, separados por ponto e vírgula
      dados += tarefa.innerText + ";"         
    })

    datas.forEach(data => { 
        // Adiciona o texto da tarefa ao final da string de dados, separados por ponto e vírgula
        dados2 += data.innerText + ";"         
      })
  
    // Armazena os dados das tarefas no localStorage
    localStorage.setItem("tarefasDia", dados.slice(0, -1))
    localStorage.setItem("datasDia", dados2.slice(0, -1))
  
    // Verifica se os dados foram armazenados com sucesso
    if (localStorage.getItem("tarefasDia")) {
      // Mostra uma mensagem de alerta caso os dados tenham sido armazenados com sucesso
      alert("Ok! Tarefas Salvas")
    }
  })

  window.addEventListener("load", () => { 
  
    // Verifica se existem tarefas salvas em localStorage
    if (localStorage.getItem("tarefasDia")) {
      
      // Transforma a string de tarefas salvas em um array
      const dados = localStorage.getItem("tarefasDia").split(";")
      const dados2 = localStorage.getItem("datasDia").split(";")
  
      // Percorre os dados armazenados em localStorage
      dados.forEach(dado => {
        // Cria um elemento "h5"
        const h5 = document.createElement("h5")      
        // Cria um nó de texto com o conteúdo da tarefa
        const texto = document.createTextNode(dado)  
        // Adiciona o nó de texto ao elemento "h5"
        h5.appendChild(texto)                      
        // Adiciona o elemento "h5" ao elemento "dvQuadro"
        dvQuadro.appendChild(h5)                   
      })

      dados2.forEach(dado2 => {
        // Cria um elemento "h6"
        const h6 = document.createElement("h6")      
        // Cria um nó de texto com a data da tarefa
        const texto = document.createTextNode(dado2)  
        // Adiciona o nó de texto ao elemento "h6"
        h6.appendChild(texto)                      
        // Adiciona o elemento "h6" ao elemento "dvQuadro"
        dvQuadro.appendChild(h6)                   
      })
    }
  })


// Obtém referência ao botão "dark-button"
var darkButton = document.getElementById("dark-button");

// Obtém referência ao estilo "dark-style"
var darkStyle = document.getElementById("dark-style");

// Adiciona um event listener ao clique no botão "dark-button"
darkButton.addEventListener("click", function() {
  
  // Verifica se o estilo "dark-style" está desativado
  if (darkStyle.disabled) {
    
    // Ativa o estilo "dark-style"
    darkStyle.disabled = false;
    
    // Atualiza o texto do botão "dark-button" para "Modo Escuro"
    darkButton.innerHTML = "Modo Escuro";
  } else {
    
    // Desativa o estilo "dark-style"
    darkStyle.disabled = true;
    
    // Atualiza o texto do botão "dark-button" para "Modo Claro"
    darkButton.innerHTML = "Modo Claro";
  }
});