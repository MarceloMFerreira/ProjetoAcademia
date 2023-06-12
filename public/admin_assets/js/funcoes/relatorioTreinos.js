var json = [];
var idEmpresa;
var pilates;
var idSelecionadaParaExcluir = 0;
var idUsuarioAtivo = 0;
var idColaborador = 0;
var idPaciente = 0;
var dataInicio = 0;
var dataFinal = 0;

window.onload = function () {
    preencheCampos();
    carregaRelatorio();
};

//FALTA ARRUMAR NO CADASTRO DE TREINOS O VISUALIZAR TREINOS ANTERIORES
//FALTA NA AGENDA ARRUMAR O BOTÃO DE TREINOS JA INICIADOS
// FALTA TALVEZ MEXER LA NO RELATÓRIO

// --------------------------- Carrega Treinos -------------------------------
function habilitaDesabilitaBotoesModalTreino(apenasBotaoOk) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" onclick="excluirTreino()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusaoTreino()">Não</button>';
    }
    $("#botoesModal").html(buton);
}

function carregaRelatorio() {
    $.ajax({
        type: "GET",
        url: "/gettreinorelatorio",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            json = resultado.treino;
            pilates = resultado.boolPilates;
            idUsuarioAtivo = resultado.idUsuario;
            montaTabela();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}

function formataData(dateBD) {
    const dataDoBancoDeDados = dateBD; // Exemplo de data vinda do banco de dados
    const data = new Date(dataDoBancoDeDados); // Converte a string em um objeto Date
    const dia = data.getDate().toString().padStart(2, "0"); // Obtém o dia (com zero à esquerda, se necessário)
    const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Obtém o mês (com zero à esquerda, se necessário)
    const ano = data.getFullYear().toString(); // Obtém o ano
    const dataFormatada = `${dia}/${mes}/${ano}`; // Concatena a data no formato desejado

    return dataFormatada;
}

function montaTabela() {
    var rows = "";
    var index = 0;

    var paciente = $("#pacienteselect").val();
    var colaborador = $("#colaborador").val();
    var dataInicio = $("#dtIncio").val();
    var dataFim = $("#dtFinal").val();

    if (dataFim != "") {
        // Adiciona um dia ao valor de dataFim para considerar a seleção do dia inteiro
        var novaDataFim = new Date(dataFim);
        novaDataFim.setDate(novaDataFim.getDate() + 1);
        dataFim = novaDataFim.toISOString().substring(0, 10);
    }

    json.forEach((value) => {
        if (
            (colaborador == 0 || value.colaborador.INT_ID == colaborador) &&
            (paciente == 0 || value.paciente.INT_ID == paciente) &&
            (dataInicio == "" ||
                new Date(value.DATE_INICIO) >= new Date(dataInicio)) &&
            (dataFim == "" || new Date(value.DATE_INICIO) < new Date(dataFim))
        ) {
            rows +=
                "<div class='col-lg-4' style='margin-bottom: 10px;' >" +
                "<div class='card border-dark cardRelatorio'>" +
                "<div class='card-header  text-center'>" +
                "<h5 class='card-title'><span style='font-weight:bold;'>Paciente:</span> " +
                value.paciente.TXT_NOME +
                "</h5>" +
                "</div>" +
                "<div class='card-body'>" +
                "<p class='card-text'><span style='font-weight:bold;'>Data do treino:</span> " +
                formataData(value.DATE_INICIO) +
                "</p>" +
                "<p class='card-text'><span style='font-weight:bold;'>Colaborador:</span> " +
                value.colaborador.TXT_NOME +
                "</p>" +
                "</div>" +
                "<div class='card-footer text-center'>" +
                "<button class='btn btn-primary espaco-direita' data-toggle='modal'" +
                "data-target='#exampleModal' onclick='visualizarTreino(" +
                index +
                ")'>Visualizar</button>" +
                '<button class="btn btn-danger" data-toggle="modal"' +
                'data-target="#exampleModal" onclick="preparaExclusaoTreino(\'' +
                value.INT_ID +
                "')\">Excluir</button>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        index++;
    });

    $("#datagrid").html(rows);
}

function visualizarTreino($id) {
    var rw = "";

    rw = "<h3 class=' text-center'>Visualizar Treino</h3>";
    rw +=
        "<div class='col' style='margin-bottom: 10px;' >" +
        "<div class='card border-dark'>" +
        "<div class='card-header text-center'>" +
        "<h5 class='card-title'><span style='font-weight:bold;'>" +
        "Dor ao chegar: " +
        json[$id].INT_CHEGOU_COM_DOR +
        "</span></h5>" +
        "</div>";
    rw += "</div>" + "</div>";

    json[$id].treino_aparelho.forEach((value) => {
        rw +=
            "<div class='col' style='margin-bottom: 10px;' >" +
            "<div class='card border-dark'>" +
            "<div class='card-header text-center'>" +
            "<h5 class='card-title'><span style='font-weight:bold;'>" +
            value.aparelho.TXT_DESCRICAO +
            " (";
        var sep = "";
        value.treino_aparelho_tipo_treino.forEach((x) => {
            rw += sep + x.tipo_treino.TXT_DESCRICAO;
            sep = ", ";
        });
        rw += ") " + "</span></h5>" + "</div>" + "<div class='card-body'>";

        if (value.treino_aparelho_acessorio.length > 0) {
            value.treino_aparelho_acessorio.forEach((item) => {
                rw +=
                    "<p class='card-text'><span style='font-weight:bold;'>" +
                    item.acessorio.TXT_DESCRICAO +
                    "</span>";
                if (item.TXT_OBS != null && item.TXT_OBS != "")
                    rw += ": " + item.TXT_OBS;
                rw += "</p>";
            });
        } else {
            rw += "Nenhum acessório utilizado!";
        }
        rw += "</div>" + "</div>" + "</div>";
    });

    rw +=
        "<div class='col' style='margin-bottom: 10px;' >" +
        "<div class='card border-dark'>" +
        "<div class='card-header text-center'>" +
        "<h5 class='card-title'><span style='font-weight:bold;'>" +
        "Dor ao sair: " +
        json[$id].INT_SAIU_COM_DOR +
        "</span></h5>" +
        "</div>";
    rw += "</div>" + "</div>";

    $("#result").html(rw);
}

// --------------------------- Carrega Treinos -------------------------------
function preparaExclusaoTreino(id) {
    var rw = "";
    $("#result").html(rw);
    idSelecionadaParaExcluir = id;
    habilitaDesabilitaBotoesModalTreino(false);
    document.getElementById("result").textContent = "Deseja REALMENTE excluir?";
}

function excluirTreino() {
    habilitaDesabilitaBotoesModalTreino(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/deltreino/" + idSelecionadaParaExcluir + "/" + idUsuarioAtivo,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaRelatorio();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Excluir!!!";
            alert(request.responseText);
        },
    });
}

function cancelarExclusaoTreino() {
    idSelecionadaParaExcluir = 0;
}

// --------------------------- PREENCHE CAMPOS -------------------------------
function preencheCampos() {
    var rows = "";
    var pacientes;
    var colaboradores;

    $.ajax({
        type: "GET",
        url: "/preenchecamposrelatorio",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            pacientes = resultado.pacientes;
            colaboradores = resultado.Colab;

            rows = '<option value="0">Selecione um paciente</option>';
            pacientes.forEach((value) => {
                rows +=
                    '<option value="' +
                    value.INT_ID +
                    '">' +
                    value.TXT_NOME +
                    "</option>";
            });

            $("#pacienteselect").html(rows);

            rows = '<option value="0">Selecione um colaborador</option>';
            colaboradores.forEach((value) => {
                rows +=
                    '<option value="' +
                    value.INT_ID +
                    '">' +
                    value.TXT_NOME +
                    "</option>";
            });

            $("#colaborador").html(rows);
            //habilitaDesabilitaBotoes(true, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}


