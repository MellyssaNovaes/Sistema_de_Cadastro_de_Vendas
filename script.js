let vendas = [];
let proximoId = 1;

function cadastrarVenda() {
    const inputVendedor = document.getElementById('vendedor');
    const inputValor = document.getElementById('valorVenda');
    
    const vendedor = inputVendedor.value;
    const valor = parseFloat(inputValor.value);

    if (vendedor === "" || isNaN(valor)) {
        alert("Por favor, preencha todos os campos com valores válidos!");
        return;
    }

    const desconto = valor * 0.10;
    const valorFinal = valor - desconto;
    const dataAtual = new Date().toLocaleString('pt-BR');

    const novaVenda = {
        id: proximoId++,
        vendedor: vendedor,
        valor: valor,
        desconto: desconto,
        valorFinal: valorFinal,
        data: dataAtual
    };

    vendas.push(novaVenda);

    inputVendedor.value = "";
    inputValor.value = "";
    atualizarTabela();
}

function atualizarTabela() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = "";

    vendas.forEach((venda, index) => {
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.vendedor}</td>
            <td>R$ ${venda.valor.toFixed(2)}</td>
            <td>R$ ${venda.desconto.toFixed(2)}</td>
            <td>R$ ${venda.valorFinal.toFixed(2)}</td>
            <td>${venda.data}</td>
            <td><button class="btn-remover-item" onclick="removerItem(${index})">Remover</button></td>
        `;
        
        corpoTabela.appendChild(linha);
    });
}

function removerItem(index) {
    vendas.splice(index, 1);
    atualizarTabela();
}

function removerUltimo() {
    if (vendas.length > 0) {
        vendas.pop();
        atualizarTabela();
    } else {
        alert("A lista está vazia!");
    }
}

function limparTudo() {
    if (vendas.length > 0) {
        if (confirm("Deseja remover todas as vendas?")) {
            vendas = [];
            proximoId = 1;
            atualizarTabela();
        }
    } else {
        alert("Não há registros para limpar.");
    }
}