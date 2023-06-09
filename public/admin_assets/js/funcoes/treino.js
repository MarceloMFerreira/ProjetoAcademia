//ARRUMAR OS BOTÕES LA NO CARREGAR TREINOS ANTERIORES, SÓ O FRONT END MESMO
//TEM QUE ARRUMAR O VISUALIZAR TREINO ANTERIOR, E ARRUMAR ALGUMA COISA PRA FAZER COM AQUILO
//TEM QUE ARRUMAR AS FUNÇÕES DOS BOTÕES TAMBEM QUE EU ACHO QUE NÃO TA FUNCIONANDO O DE EDITAR
//AI ACHO QUE É SÓ TESTAR

//POR FIM TEM QUE VER O QUE FAZER COM A PÁGINA INICIAL










var json = [];
var idSelecionadaParaExcluir = 0;
var idSelecionadaParaExcluirTreinoAparelhoAcesorio = 0;
var idSelecionadaParaExcluirTreinoAparelho = 0;
var idEmpresa;
var pilates;
var pacienteJson = [];
var idPaciente;
var idUsuarioAtivo = 0;
var idTreino = 0;
var cadAlteraInicio = 1;
var idApararelho = 0;
var cadAlteraAparelho = 1;
var jsonTreinoEmAndamento = [];
var jsonTreinosAnteriores = [];
var jsonVisualizarTreinoAnterior = [];
var listIdTreinosAparelhos = [];
var listaAuxTipoTreino = [];

window.onload = function () {
    configInicial();
    carregaTreinos();
    montaTabelaTreinosAnteriores();
    preencheComboTreinoEmAberto();
};

// --------------------------- CONUFIGURA BOTÕES -------------------------------
function habilitaDesabilitaBotoesModal(apenasBotaoOk) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" onclick="excluirTreinoAparelhoAcessorio()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusaoTreinoAparelhoAcessorio()">Não</button>';
    }
    $("#botoesModal").html(buton);
}

function habilitaDesabilitaBotoesModalAparelho(apenasBotaoOk) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" onclick="excluirTreinoAparelho()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusaoTreinoAparelho()">Não</button>';
    }
    $("#botoesModal").html(buton);
}

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

function habilitaDesabilitaBotoesModalAparelhoFinal(apenasBotaoOk) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" data-dismiss="modal" onclick="configExpandeAcessorio()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="limpaCamposAparelho()">Não</button>';
    }
    $("#botoesModal").html(buton);
}
// --------------------------- CONUFIGURAÇÃO INICIAL -------------------------------
function configInicial() {
    idPaciente = document.getElementById("idPacienteSemAgenda").value;

    $.ajax({
        type: "GET",
        url: "/getpacientesemagendamento/" + idPaciente,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            pacienteJson = resultado.paciente;
            document.getElementById("nomePaciente").value =
                pacienteJson.TXT_NOME;
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });

    document.getElementById("fsAddAparelho").style.display = "none";
    document.getElementById("fsAddAcessorio").style.display = "none";
    document.getElementById("fsFinalTreino").style.display = "none";
    document.getElementById("treinoAnteriorMostrar").style.display = "none";
    document.getElementById("tabelaAparelhos").style.display = "none";
}

function configExpandeAparelho() {
    document.getElementById("fsAddAparelho").style.display = "block";
    document.getElementById("tabelaAparelhos").style.display = "block";

    var minhaDiv = document.getElementById("fsAddAparelho");
    minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("iniciartreino").textContent =
        "Alterar Inicio do Treino";
}

function configExpandeAcessorio() {
    document.getElementById("fsAddAcessorio").style.display = "block";

    var minhaDiv = document.getElementById("fsAddAcessorio");
    minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("addAparelho").textContent = "Alterar Aparelho";
}

function configExpandeFinalTreino() {
    const div = document.getElementById("dgvAparelhos");
    if (div.childElementCount == 0) {
        document.getElementById("result").textContent =
            "Adicione no mínimo 1 aparelho a este treino";
    } else {
        document.getElementById("fsFinalTreino").style.display = "block";

        var minhaDiv = document.getElementById("fsFinalTreino");
        minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });

        document.getElementById("result").textContent =
            "Aparelhos adicionados com sucesso!";
    }
}

function configExpandeTreinoAnterior(ocultar) {
    if (ocultar == 0) {
        document.getElementById("treinoAnteriorMostrar").style.display =
            "block";

        var minhaDiv = document.getElementById("treinoAnteriorMostrar");
        minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        document.getElementById("treinoAnteriorMostrar").style.display = "none";

        var minhaDiv = document.getElementById("dgvTreinosAnteriores");
        minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
// ---------------------------  LIMPA CAMPOS -------------------------------
function limpaCamposAcessorio() {
    document.getElementById("acessorio").value = 0;
    document.getElementById("obsCessorio").value = "";
}

function limpaCamposAparelho() {
    document.getElementById("aparelho").value = 0;
    listIdTreinosAparelhos.splice(0, listIdTreinosAparelhos.length);

    var checkboxes = document.getElementsByName("myCheckbox");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    document.getElementById("obsAparelho").value = "";
    document.getElementById("fsAddAcessorio").style.display = "none";

    var rows = "";
    $("#dgvAcessorios").html(rows);

    var minhaDiv = document.getElementById("fsAddAparelho");
    minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("addAparelho").textContent = "Adicionar Aparelho";

    idApararelho = 0;
    cadAlteraAparelho = 1;
}

function limpaCamposGeral() {
    limpaCamposAcessorio();
    limpaCamposAparelho();

    document.getElementById("obsPaciente").value = "";
    document.getElementById("inicioTreino").value = "";
    document.getElementById("dorAoChegar").value = "";
    document.getElementById("obsDorAoChegar").value = "";
    document.getElementById("dorAoSair").value = "";
    document.getElementById("obsDorAoSair").value = "";
    document.getElementById("obsGerais").value = "";
    document.getElementById("idAgendamento").value = "";

    idSelecionadaParaExcluir = 0;
    idSelecionadaParaExcluirTreinoAparelhoAcesorio = 0;
    idSelecionadaParaExcluirTreinoAparelho = 0;
    idTreino = 0;
    cadAlteraInicio = 1;
    idApararelho = 0;
    cadAlteraAparelho = 1;

    document.getElementById("iniciartreino").textContent = "Iniciar Treino";
    document.getElementById("finalizarTreino").textContent =
        "Confirmar Fim do Treino";

    configInicial();
}
// --------------------------- CARREGA TREINOS -------------------------------
function /*PREENCHE COMBOS*/ carregaTreinos() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getreino",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            idEmpresa = resultado.idEmpresa;
            json = resultado.Aparelho;
            pilates = resultado.boolPilates;
            idUsuarioAtivo = resultado.idUsuario;
            var aparelhos = resultado.aparelhos;
            var stringAparelhos = "";
            var tiposTreino = resultado.tiposTreino;
            var stringTipostreino = "";
            var acessorios = resultado.acessorios;
            var stringAcessorios = "";

            stringAparelhos += "<option value=0>SELECIONE UM APARELHO</option>";
            aparelhos.forEach((value) => {
                stringAparelhos +=
                    "<option value=" +
                    value.INT_ID +
                    ">" +
                    value.TXT_DESCRICAO +
                    "</option>";
            });
            $("#aparelho").html(stringAparelhos);

            tiposTreino.forEach((value) => {
                stringTipostreino +=
                    "<tr>" +
                    "<td class = 'text-center'>" +
                    "<input type='checkbox' name='myCheckbox' value='" +
                    value.INT_ID +
                    "'>" +
                    "</td>" +
                    "<td class = 'text-center'>" +
                    value.TXT_DESCRICAO +
                    "</td>";
            });
            $("#tabelaTipoTreino").html(stringTipostreino);

            // Adiciona um evento de mudança (change) nos checkboxes criados
            $('input[name="myCheckbox"]').change(function () {
                // Verifica se o checkbox atual está marcado
                var id = $(this).val();
                if ($(this).is(":checked")) {
                    listIdTreinosAparelhos.push(id);
                } else {
                    let index = listIdTreinosAparelhos.findIndex(
                        (x) => x == id
                    ); // Obtem o índice do valor a ser removido
                    if (index > -1) {
                        listIdTreinosAparelhos.splice(index, 1); // Remove o valor a partir do índice e remove um elemento
                    }
                }
            });

            stringAcessorios +=
                "<option value=0>SELECIONE UM ACESSÓRIO</option>";
            acessorios.forEach((value) => {
                stringAcessorios +=
                    "<option value=" +
                    value.INT_ID +
                    ">" +
                    value.TXT_DESCRICAO +
                    "</option>";
            });
            $("#acessorio").html(stringAcessorios);

            //PREENCHE CAMPOS PRA CARREGAR A TABELA E O COMBO DOS TREINOS EM ANDAMENTO
            // aJson.forEach((value) => {
            //     rows +=
            //         '<a class="dropdown-item" onclick="preencheCampos(\'' +
            //         value.TXT_DESCRICAO +
            //         "','" +
            //         value.INT_ID +
            //         "')\">" +
            //         value.TXT_DESCRICAO +
            //         "</a>";
            // });

            // $("#datagrid").html(rows);
            //habilitaDesabilitaBotoes(true, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}

function montaTabelaTreinoAtual() {
    var rows = "<div class='row'>";

    var index = 0;
    listaAuxTipoTreino.splice(0, listaAuxTipoTreino.length);
    $.ajax({
        type: "GET",
        url: "/gettreinoemandamento/" + idTreino,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            jsonTreinoEmAndamento = resultado.treinoEmAndamento;

            var indexAux = 0;
            jsonTreinoEmAndamento[0].treino_aparelho.forEach((value) => {
                rows +=
                    "<div class='col-lg-4' style='margin-bottom: 10px;'>" +
                    "<div class='card border-dark cardRelatorio'>" +
                    "<div class='card-header text-center'>" +
                    "<h5 class='card-title'>" +
                    value.aparelho.TXT_DESCRICAO +
                    "</h5>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<p class='card-text'>";
                if (value.TXT_OBS != null) {
                    rows +=
                        "<span style='font-weight:bold;'>Observações:</span> " +
                        value.TXT_OBS;
                } else {
                    rows +=
                        "<span style='font-weight:bold;'>Observações:</span> Nenhuma observação registrada!";
                }
                rows +=
                    "</p>" +
                    "<p class='card-text'>" +
                    "<span style='font-weight:bold;'>Tipo de Treino:</span> ";
                var sep = "";
                value.treino_aparelho_tipo_treino.forEach((x) => {
                    rows += sep + x.tipo_treino.TXT_DESCRICAO;
                    sep = "// ";
                });
                rows +=
                    "</p>" +
                    "<p class='card-text'>" +
                    "<span style='font-weight:bold;'>Acessórios:</span> ";
                var acessorios = "";
                var aux = "";
                if (value.treino_aparelho_acessorio.length > 0) {
                    value.treino_aparelho_acessorio.forEach((item) => {
                        acessorios += aux + item.acessorio.TXT_DESCRICAO;
                        if (item.TXT_OBS != null && item.TXT_OBS != "")
                            acessorios += " (" + item.TXT_OBS + ") ";
                        aux = " - ";
                    });
                }
                if (acessorios == "") {
                    rows += "Nenhum acessório registrado!";
                } else {
                    rows += acessorios;
                }
                rows +=
                    "</p>" +
                    "</div>" +
                    "<div class='card-footer text-center'>" +
                    "<div class='btn-group' role='group'>" +
                    "<button type='button' class='btn btn-success' onclick='preparaEdicaoAparelho(\"" +
                    value.INT_ID +
                    '","' +
                    value.INT_ID_APARELHO +
                    '","' +
                    indexAux +
                    '","' +
                    value.TXT_OBS +
                    "\")'>Editar</button>" +
                    "<button data-toggle='modal' data-target='#exampleModal' type='button' class='btn btn-danger' onclick='preparaExclusaoTreinoAparelho(\"" +
                    value.INT_ID +
                    "\")'>Excluir</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                listaAuxTipoTreino.push(value.treino_aparelho_tipo_treino);
                indexAux++;
            });

            if (rows == undefined) rows = "";
            $("#dgvAparelhos").html(rows + "</div>");
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}
function montaTabelaAcessorio() {
    var rows = "<div class='row'>"; // Adiciona a classe 'row' para envolver todos os itens

    jsonTreinoEmAndamento[0].treino_aparelho.forEach((value) => {
        if (
            value.INT_ID == idApararelho &&
            value.treino_aparelho_acessorio.length > 0
        ) {
            value.treino_aparelho_acessorio.forEach((item) => {
                rows +=
                    "<div class='col-lg-4' style='margin-bottom: 10px;'>" +
                    "<div class='card border-dark cardRelatorio'>" +
                    "<div class='card-header text-center'>" +
                    "<h5 class='card-title'>" +
                    item.acessorio.TXT_DESCRICAO +
                    "</h5>" +
                    "</div>" +
                    "<div class='card-body'>" +
                    "<p class='card-text'>";
                if (item.TXT_OBS != null) {
                    rows +=
                        "<span style='font-weight:bold;'>Observações:</span> " +
                        item.TXT_OBS;
                } else {
                    rows +=
                        "<span style='font-weight:bold;'>Observações:</span> Nenhuma observação registrada!";
                }
                rows +=
                    "</p>" +
                    "</div>" +
                    "<div class='card-footer text-center'>" +
                    "<div class='btn-group' role='group'>" +
                    "<button data-toggle='modal' data-target='#exampleModal' type='button' class='btn btn-danger' onclick='preparaExclusaoTreinoAparelhoAcessorio(\"" +
                    item.INT_ID +
                    "\")'>Excluir</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            });
        }
    });

    rows += "</div>"; // Fecha a div com a classe 'row'

    if (rows == undefined) rows = "";
    $("#dgvAcessorios").html(rows);
}


function montaTabelaTreinosAnteriores() {
    var tbrows = "";
    var index = 0;
    jsonVisualizarTreinoAnterior = [];
    date = document.getElementById("dtFiltro").value;

    $.ajax({
        type: "GET",
        url: "/gettreinosanteriores/" + idPaciente + "/" + idEmpresa + "/" + 1,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            jsonTreinosAnteriores = resultado.treinosAnteriores;

            jsonTreinosAnteriores.forEach((value) => {
                dateEdit = value.DATE_INICIO.slice(0, 10);
                if ((date != "" && dateEdit == date) || date == "") {
                    tbrows +=
                        "<tr>" +
                        "<td style='display:none;'>" + value.INT_ID + "</td>" +
                        "<td class='text-center col-2'>" +
                        new Date(value.DATE_INICIO).toLocaleDateString("pt-BR") +
                        "</td>" +
                        "<td class='text-center col-1'>" + value.INT_CHEGOU_COM_DOR + "</td>" +
                        "<td class='text-center col-1'>" + value.INT_SAIU_COM_DOR + "</td>" +
                        "<td>";

                    if (value.TXT_OBS != null) {
                        tbrows += value.TXT_OBS;
                    } else {
                        tbrows += "Nenhuma observação registrada!";
                    }

                    tbrows +=
                        "</td>" +
                        "<td class='text-center'>" +
                        "<div class='btn-group' role='group'>" +
                        "<button class='btn btn-primary espaco-direita' onclick='montaTabelaVisualizarTreinoAnterior(\"" +
                        index +
                        "\")'>Visualizar</button>" +
                        "<button type='button' class='btn btn-success espaco-direita' onclick='preparaEdicaoTreino(\"" +
                        index +
                        "\")'>Editar</button>" +
                        "<button data-toggle='modal' data-target='#exampleModal' type='button' class='btn btn-danger' onclick='preparaExclusaoTreino(\"" +
                        value.INT_ID +
                        "\")'>Excluir</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";

                    jsonVisualizarTreinoAnterior.push(value);

                    index++;
                }
            });

            if (tbrows == undefined) tbrows = "";
            $("#dgvTreinosAnteriores").html(tbrows);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}



function montaTabelaVisualizarTreinoAnterior(index) {
    configExpandeTreinoAnterior(0);

    var cards = "";
    jsonVisualizarTreinoAnterior[index].treino_aparelho.forEach((value) => {
        var aparelhoDescricao = value.aparelho.TXT_DESCRICAO;
        var obs = value.TXT_OBS != null ? value.TXT_OBS : "";
        var tiposTreino = "";
        var acessorios = "";
        var acessoriosObs = "";
        var sep = "";

        value.treino_aparelho_tipo_treino.forEach((x) => {
            tiposTreino += sep + x.tipo_treino.TXT_DESCRICAO;
            sep = "// ";
        });

        sep = "";
        value.treino_aparelho_acessorio.forEach((item) => {
            acessorios += sep + item.acessorio.TXT_DESCRICAO;
            if (item.TXT_OBS != null && item.TXT_OBS != "") {
                acessoriosObs += sep + "(" + item.TXT_OBS + ")";
            }
            sep = " - ";
        });

        cards +=
            "<div class='col-lg-4' style='margin-bottom: 10px;'>" +
            "<div class='card border-dark'>" +
            "<div class='card-header text-center'>" +
            "<h5 class='card-title'>" +
            aparelhoDescricao +
            "</h5>" +
            "</div>" +
            "<div class='card-body'>" +
            "<p class='card-text text-center'>" +
            "<strong>Observações: </strong>" +
            obs +
            "<br>" +
            "<strong>Tipo de Treino: </strong>" +
            tiposTreino +
            "<br>" +
            "<strong>Acessórios: </strong>" +
            acessorios +
            " " +
            acessoriosObs +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>";
    });

    if (cards == undefined) {
        cards = "";
    }

    $("#dgvExpandetreinoAnterior").html(cards);
}

function preencheComboTreinoEmAberto() {
    var tbrows = "";
    var index = 0;
    var jsonTreinosEmAberto = [];
    date = document.getElementById("dtFiltro").value;

    $.ajax({
        type: "GET",
        url: "/gettreinosanteriores/" + idPaciente + "/" + idEmpresa + "/" + 0,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            jsonTreinosEmAberto = resultado.treinosAnteriores;

            tbrows += "<option value=0>TREINOS EM ANDAMENTO</option>";
            jsonTreinosEmAberto.forEach((value) => {
                tbrows +=
                    "<option value=" +
                    value.INT_ID +
                    ">" +
                    value.paciente.TXT_NOME +
                    " (" +
                    formataData(value.DATE_INICIO.slice(0, 10)) +
                    ")" +
                    "</option>";
            });
            $("#pacientes").html(tbrows);
        },
    });

    document
        .getElementById("pacientes")
        .addEventListener("change", function () {
            limpaCamposAparelho();
            idTreino = this.value;
            if (idTreino > 0) {
                montaTabelaTreinoAtual();
                document.getElementById("idPacienteSemAgenda").value =
                    jsonTreinoEmAndamento[0].INT_ID_PACIENTE;
                idPaciente = jsonTreinoEmAndamento[0].INT_ID_PACIENTE;
                document.getElementById("nomePaciente").value =
                    jsonTreinoEmAndamento[0].paciente.TXT_NOME;
                document.getElementById("obsPaciente").value =
                    jsonTreinoEmAndamento[0].TXT_OBS_PACIENTE;
                document.getElementById("inicioTreino").value =
                    jsonTreinoEmAndamento[0].DATE_INICIO.slice(0, 10);
                document.getElementById("dorAoChegar").value =
                    jsonTreinoEmAndamento[0].INT_CHEGOU_COM_DOR;
                document.getElementById("obsDorAoChegar").value =
                    jsonTreinoEmAndamento[0].TXT_OBS_CHEGOU_COM_DOR;
                document.getElementById("idAgendamento").value =
                    jsonTreinoEmAndamento[0].INT_ID_AGENDA;

                configExpandeAparelho();
                montaTabelaTreinosAnteriores();
                cadAlteraInicio = 0;
            }
        });
}

function formataData(dateBD) {
    const data = new Date(dateBD);
    data.setDate(data.getDate() + 1);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
}

// --------------------------- CADASTRA ALTERA -------------------------------
function cadastraInicio() {
    document.getElementById("result").textContent = "";
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("idPacienteSemAgenda").value.length == 0)
        document.getElementById("result").textContent =
            "Favor, Selecione um paciente!!!";
    else if (document.getElementById("inicioTreino").value.length == 0)
        document.getElementById("result").textContent =
            "Favor, selecione o inicio do treino!!!";
    else if (document.getElementById("dorAoChegar").value.length == 0)
        document.getElementById("result").textContent =
            "Favor, informe o nível de dor!!!";
    else if (document.getElementById("obsPaciente").value.length == 500)
        document.getElementById("result").textContent =
            "Máximo de 500 caracteres para o campo observação!!!";
    else if (document.getElementById("obsDorAoChegar").value.length == 500)
        document.getElementById("result").textContent =
            "Máximo de 500 caracteres para o campo observação!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/settreinoinicio/" +
                idTreino +
                "/" +
                cadAlteraInicio +
                "/" +
                idEmpresa +
                "/" +
                idUsuarioAtivo +
                "/" +
                idPaciente,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                if (
                    data.msg == "Cadastrado com SUCESSO!!!" ||
                    data.msg == "Alterado com SUCESSO!!!"
                )
                    configExpandeAparelho();
                if (idTreino == 0 || idTreino == undefined) {
                    idTreino = data.idCadastrado;
                }
                if (data.msg != "Treino ja cadastrado!!!") cadAlteraInicio = 0;
                montaTabelaTreinoAtual();
                preencheComboTreinoEmAberto();
            },
            error: function (request, status, error) {
                document.getElementById("result").textContent =
                    "Erro ao Cadastrar!!!";
                alert(request.responseText);
            },
        });
    }
}

function cadastraAparelho() {
    if (
        document.getElementById("addAparelho").textContent == "Alterar Aparelho"
    )
        cadAlteraAparelho = 0;
    else cadAlteraAparelho = 1;

    document.getElementById("result").textContent = "";
    habilitaDesabilitaBotoesModalAparelhoFinal(true);

    if (document.getElementById("aparelho").value == 0)
        document.getElementById("result").textContent =
            "Favor, Selecione um aparelho!!!";
    else if (listIdTreinosAparelhos.length == 0)
        document.getElementById("result").textContent =
            "Favor, selecione pelo menos um tipo de treino!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var sep = "";
        var aux = "";
        listIdTreinosAparelhos.forEach((value) => {
            aux += sep + value;
            sep = ",";
        });

        document.getElementById("txtidsTipoTreino").value = aux;

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/settreinoaparelho/" +
                idApararelho +
                "/" +
                cadAlteraAparelho +
                "/" +
                idUsuarioAtivo +
                "/" +
                idTreino,

            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                if (data.msg == "Alterado com SUCESSO!!!") {
                    configExpandeAcessorio();
                } else if (data.msg == "Cadastrado com SUCESSO!!!") {
                    document.getElementById("result").textContent =
                        "Deseja adicionar acessórios a este aparelho?";
                    habilitaDesabilitaBotoesModalAparelhoFinal(false);
                }
                if (idApararelho == 0) {
                    idApararelho = data.idCadastrado;
                }
                cadAlteraAparelho = 0;
                montaTabelaTreinoAtual();
            },
            error: function (request, status, error) {
                document.getElementById("result").textContent =
                    "Erro ao Cadastrar!!!";
                alert(request.responseText);
            },
        });
    }
}

function cadastraAcessorio() {
    document.getElementById("result").textContent = "";
    habilitaDesabilitaBotoesModal(true);

    if (document.getElementById("acessorio").value == 0)
        document.getElementById("result").textContent =
            "Favor, Selecione um acessorio!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/settreinoacessorio/" +
                0 +
                "/" +
                1 +
                "/" +
                idApararelho +
                "/" +
                idUsuarioAtivo,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                limpaCamposAcessorio();
                montaTabelaTreinoAtual();
                montaTabelaAcessorio();
            },
            error: function (request, status, error) {
                document.getElementById("result").textContent =
                    "Erro ao Cadastrar!!!";
                alert(request.responseText);
            },
        });
    }
}

function cadastraFinal() {
    document.getElementById("result").textContent = "";
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("dorAoSair").value.length == 0)
        document.getElementById("result").textContent =
            "Favor, informe o nível de dor ao sair!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "/settreinofinal/" + idTreino,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                limpaCamposGeral();
                montaTabelaTreinosAnteriores();
                preencheComboTreinoEmAberto();
            },
            error: function (request, status, error) {
                document.getElementById("result").textContent =
                    "Erro ao Cadastrar!!!";
                alert(request.responseText);
            },
        });
    }
}

// --------------------------- EXCLUSÃO -------------------------------
function preparaExclusaoTreinoAparelhoAcessorio(id) {
    idSelecionadaParaExcluirTreinoAparelhoAcesorio = id;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent = "Deseja REALMENTE excluir?";
}

function cancelarExclusaoTreinoAparelhoAcessorio() {
    idSelecionadaParaExcluirTreinoAparelhoAcesorio = 0;
}

function excluirTreinoAparelhoAcessorio() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url:
            "/deltreinoaparelhoacessorio/" +
            idSelecionadaParaExcluirTreinoAparelhoAcesorio +
            "/" +
            idUsuarioAtivo +
            "/" +
            1,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            montaTabelaTreinoAtual();
            montaTabelaAcessorio();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Excluir!!!";
            alert(request.responseText);
        },
    });
}

function preparaExclusaoTreinoAparelho(id) {
    idSelecionadaParaExcluirTreinoAparelho = id;
    habilitaDesabilitaBotoesModalAparelho(false);
    document.getElementById("result").textContent = "Deseja REALMENTE excluir?";
}

function cancelarExclusaoTreinoAparelho() {
    idSelecionadaParaExcluirTreinoAparelho = 0;
}

function excluirTreinoAparelho() {
    habilitaDesabilitaBotoesModalAparelho(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url:
            "/deltreinoaparelho/" +
            idSelecionadaParaExcluirTreinoAparelho +
            "/" +
            idUsuarioAtivo +
            "/" +
            1,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            limpaCamposAcessorio();
            limpaCamposAparelho();
            montaTabelaTreinoAtual();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Excluir!!!";
            alert(request.responseText);
        },
    });
}

function preparaExclusaoTreino(id) {
    idSelecionadaParaExcluir = id;
    habilitaDesabilitaBotoesModalTreino(false);
    document.getElementById("result").textContent = "Deseja REALMENTE excluir?";
}

function cancelarExclusaoTreinoAparelho() {
    idSelecionadaParaExcluir = 0;
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
            montaTabelaTreinosAnteriores();
            configExpandeTreinoAnterior(1);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Excluir!!!";
            alert(request.responseText);
        },
    });
}

// --------------------------- EDIÇÃO -------------------------------
function preparaEdicaoAparelho(idAp, idAparelhoSelecionado, index, txtObs) {
    listIdTreinosAparelhos.splice(0, listIdTreinosAparelhos.length);
    var checkboxes = document.getElementsByName("myCheckbox");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

    idApararelho = idAp;
    cadAlteraAparelho = 0;
    var rows = "";
    $("#dgvAcessorios").html(rows);
    document.getElementById("fsAddAcessorio").style.display = "block";
    montaTabelaAcessorio();
    document.getElementById("addAparelho").textContent = "Alterar Aparelho";
    configExpandeAparelho();
    document.getElementById("aparelho").value = idAparelhoSelecionado;

    listaAuxTipoTreino[index].forEach((value) => {
        var checkbox = document.querySelector(
            "input[name='myCheckbox'][value='" + value.tipo_treino.INT_ID + "']"
        );
        if (checkbox) {
            checkbox.checked = true;
            listIdTreinosAparelhos.push(value.tipo_treino.INT_ID);
        }
    });

    if (txtObs != "null") document.getElementById("obsAparelho").value = txtObs;
    else document.getElementById("obsAparelho").value = "";
}

function preparaEdicaoTreino(index) {
    idTreino = jsonVisualizarTreinoAnterior[index].INT_ID;
    cadAlteraInicio = 0;
    document.getElementById("obsPaciente").value =
        jsonVisualizarTreinoAnterior[index].TXT_OBS_PACIENTE;
    document.getElementById("inicioTreino").value =
        jsonVisualizarTreinoAnterior[index].DATE_INICIO;
    document.getElementById("dorAoChegar").value =
        jsonVisualizarTreinoAnterior[index].INT_CHEGOU_COM_DOR;
    document.getElementById("obsDorAoChegar").value =
        jsonVisualizarTreinoAnterior[index].TXT_OBS_CHEGOU_COM_DOR;
    document.getElementById("idAgendamento").value =
        jsonVisualizarTreinoAnterior[index].INT_ID_AGENDA;
    limpaCamposAparelho();
    limpaCamposAcessorio();
    configExpandeAparelho();
    montaTabelaTreinoAtual();
    configExpandeFinalTreino();
    document.getElementById("dorAoSair").value =
        jsonVisualizarTreinoAnterior[index].INT_SAIU_COM_DOR;
    document.getElementById("obsDorAoSair").value =
        jsonVisualizarTreinoAnterior[index].TXT_OBS_SAIU_COM_DOR;
    document.getElementById("obsGerais").value =
        jsonVisualizarTreinoAnterior[index].TXT_OBS;
    document.getElementById("finalizarTreino").textContent =
        "Confirmar Edição do Fim do Treino";

    var minhaDiv = document.getElementById("inicio01");
    minhaDiv.scrollIntoView({ behavior: "smooth", block: "center" });
}

