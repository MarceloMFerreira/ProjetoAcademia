var json = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;
var idglobalPaciente;
var idUsuarioAtivo = 0;

window.onload = function () {
    carregaAgenda();
    habilitaDesabilitaBotoes(true, 0);
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("dtFiltro").value = today;
    montaTabela();
    //setMenuPilates();
};

// --------------------------- CONUFIGURA BOTÕES -------------------------------
function habilitaDesabilitaBotoesModal(apenasBotaoOk) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" onclick="excluir()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusao()">Não</button>';
    }
    $("#botoesModal").html(buton);
}

function habilitaDesabilitaBotoes(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton =
            '<a class=" btn btn-success  btn-lg btn-block" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\">Cadastrar</a>";
    } else {
        buton =
            '<a class=" btn btn-primary  btn-lg btn-block" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\">Alterar</a>";
        buton +=
            '  <a class=" btn btn-light btn-lg btn-block" onclick="cancelarEdicao()">Cancelar</a>';
    }
    $("#botoes").html(buton);
}

function atualizaHorario() {
    const inicioTreino = document.getElementById("inicioTreino");
    const tempoTreino = document.getElementById("tempoTreino");
    const finalTreino = document.getElementById("finalTreino");

    const inicio = new Date(inicioTreino.value).getTime(); // converte para milissegundos
    const tempo = tempoTreino.value * 60 * 1000; // converte para milissegundos
    const offset = new Date().getTimezoneOffset() * 60 * 1000; // converte para milissegundos
    const final = new Date(inicio + tempo - offset).toISOString().slice(0, -8); // converte para ISO e remove segundos e milissegundos
    finalTreino.value = final;
}

// --------------------------- CARREGA PACIENTES / AGENDA -------------------------------
function carregaAgenda() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getagenda",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            json = resultado.Agenda;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;
            pacientes = resultado.pacientes;
            idUsuarioAtivo = resultado.idUsuario;

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
            //habilitaDesabilitaBotoes(true, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });

    document
        .getElementById("pacienteselect")
        .addEventListener("change", function () {
            idglobalPaciente = this.value;

            var editarImg = "";
            pacientes.forEach((value1) => {
                if (
                    value1.INT_ID == idglobalPaciente &&
                    value1.TXT_FOTO != null
                ) {
                    editarImg =
                        "<img src='uploads/img/" +
                        value1.TXT_FOTO +
                        "' style='height: 122px;'></img>";
                }

                if (value1.INT_ID == idglobalPaciente)
                    document.getElementById("nomePaciente").value =
                        value1.TXT_NOME;
                else if (idglobalPaciente == 0) {
                    document.getElementById("nomePaciente").value = "";
                }
            });
            $("#editImagem").html(editarImg);
        });
}

function abrirNovaView() {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("pacienteselect").value == "0")
        document.getElementById("result").textContent =
            "Favor, selecione um paciente!!!";
    else
        window.location.href =
            "/iniciartreinosemagendamento/" + idglobalPaciente + "/0/0/0";
}

function abrirNovaViewSemPaciente() {
    habilitaDesabilitaBotoesModal(true);
    var jsonTreinosEmAberto = [];

    $.ajax({
        type: "GET",
        url: "/gettreinosanteriores/" + 0 + "/" + idEmpresa + "/" + 0,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            jsonTreinosEmAberto = resultado.treinosAnteriores;
        },
    });

    if (jsonTreinosEmAberto.length === 0)
        document.getElementById("result").textContent =
            "Não há treinos em andamento!!!";
    else window.location.href = "/iniciartreinosemagendamento/" + 0 + "/0/0/0";
}

function iniciaTreinoComAgendamento(idPaciente, idAgendamento, inicio, final) {
    window.location.href =
        "/iniciartreinosemagendamento/" +
        idPaciente +
        "/" +
        idAgendamento +
        "/" +
        inicio.slice(0, 10) +
        "/" +
        final.slice(0, 10);
}

// ---------------------------  EDIÇÃO -------------------------------
function montaTabela() {
    var tbrows = "";
    var index = 0;
    date = document.getElementById("dtFiltro").value;

    var radio1 = document.getElementById("emAberto");

    if (radio1.checked) {
        json.forEach((value) => {
            dateEdit = value.DATE_INICIO_AGENDOU.slice(0, 10);
            if (dateEdit == date && value.treino.length == 0) {
                tbrows +=
                    "<div class='col-lg-4' style='margin-bottom: 10px;' >" +
                    "<div class='card border-dark cardRelatorio'>" +
                    "<div class='card-header  text-center'>" +
                    "<h5 class='card-title'><span style='font-weight:bold;'>Horário:</span> " +
                    value.DATE_INICIO_AGENDOU.slice(10, 16) +
                    " - " +
                    value.DATE_FIM_AGENDOU.slice(10, 16) +
                    "</h5>" +
                    "</div>" +
                    "<div class='card-body text-center'>" +
                    "<p class='card-text' style='margin-bottom: 0;'><span style='font-weight:bold;'>Paciente:</span></p>" +
                    "<h5 class='card-title' style='margin-bottom: 10px;'>" +
                    value.paciente.TXT_NOME +
                    "</h5>" +
                    "<p class='card-text'></br>" +
                    '<button type="button" class="btn btn-secondary" onclick="iniciaTreinoComAgendamento(\'' +
                    value.paciente.INT_ID +
                    "','" +
                    value.INT_ID +
                    "','" +
                    value.DATE_INICIO_AGENDOU.slice(0, 10) +
                    "T" +
                    value.DATE_INICIO_AGENDOU.slice(11, 16) +
                    "','" +
                    value.DATE_FIM_AGENDOU.slice(0, 10) +
                    "T" +
                    value.DATE_FIM_AGENDOU.slice(11, 16) +
                    "')\"> Iniciar Treino</button>" +
                    "</p>" +
                    "</div>" +
                    "<div class='card-footer text-center'>" +
                    "<button class='btn btn-primary espaco-direita'" +
                    "onclick=\"preencheCampos('" +
                    value.DATE_INICIO_AGENDOU +
                    "','" +
                    value.DATE_FIM_AGENDOU +
                    "','" +
                    value.INT_ID_PACIENTE +
                    "','" +
                    value.paciente.TXT_NOME +
                    "','" +
                    value.paciente.TXT_FOTO +
                    "','" +
                    value.INT_ID +
                    "')\"> Editar</button>" +
                    '<button class="btn btn-danger" data-toggle="modal"' +
                    'data-target="#exampleModal"  onclick="preparaExclusao(\'' +
                    value.INT_ID +
                    "')\"> Excluir</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            index++;
        });
    }

    var radio2 = document.getElementById("iniciados");

    if (radio2.checked) {
        json.forEach((value) => {
            dateEdit = value.DATE_INICIO_AGENDOU.slice(0, 10);
            if (dateEdit == date && value.treino.length > 0) {
                tbrows +=
                    "<div class='col-lg-4' style='margin-bottom: 10px;' >" +
                    "<div class='card border-dark cardRelatorio'>" +
                    "<div class='card-header  text-center'>" +
                    "<h5 class='card-title'><span style='font-weight:bold;'>Horário:</span> " +
                    value.DATE_INICIO_AGENDOU.slice(10, 16) +
                    " - " +
                    value.DATE_FIM_AGENDOU.slice(10, 16) +
                    "</h5>" +
                    "</div>" +
                    "<div class='card-body text-center'>" +
                    "<p class='card-text' style='margin-bottom: 0;'><span style='font-weight:bold;'>Paciente:</span></p>" +
                    "<h5 class='card-title' style='margin-bottom: 10px;'>" +
                    value.paciente.TXT_NOME +
                    "</h5>" +
                    "<p class='card-text'></br>" +
                    '<button type="button" class="btn btn-secondary" onclick="iniciaTreinoComAgendamento(\'' +
                    value.paciente.INT_ID +
                    "','" +
                    value.INT_ID +
                    "','" +
                    value.DATE_INICIO_AGENDOU.slice(0, 10) +
                    "T" +
                    value.DATE_INICIO_AGENDOU.slice(11, 16) +
                    "','" +
                    value.DATE_FIM_AGENDOU.slice(0, 10) +
                    "T" +
                    value.DATE_FIM_AGENDOU.slice(11, 16) +
                    "')\" disabled> Treino Iniciado</button>" +
                    "</p>" +
                    "</div>" +
                    "<div class='card-footer text-center'>" +
                    "<button class='btn btn-primary espaco-direita'" +
                    "onclick=\"preencheCampos('" +
                    value.DATE_INICIO_AGENDOU +
                    "','" +
                    value.DATE_FIM_AGENDOU +
                    "','" +
                    value.INT_ID_PACIENTE +
                    "','" +
                    value.paciente.TXT_NOME +
                    "','" +
                    value.paciente.TXT_FOTO +
                    "','" +
                    value.INT_ID +
                    "')\" disabled> Editar</button>" +
                    '<button class="btn btn-danger" data-toggle="modal"' +
                    'data-target="#exampleModal"  onclick="preparaExclusao(\'' +
                    value.INT_ID +
                    "')\" disabled> Excluir</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            index++;
        });
    }

    var radio3 = document.getElementById("todos");

    if (radio3.checked) {
        json.forEach((value) => {
            dateEdit = value.DATE_INICIO_AGENDOU.slice(0, 10);
            if (dateEdit == date) {
                tbrows +=
                    "<div class='col-lg-4' style='margin-bottom: 10px;' >" +
                    "<div class='card border-dark cardRelatorio'>" +
                    "<div class='card-header  text-center'>" +
                    "<h5 class='card-title'><span style='font-weight:bold;'>Horário:</span> " +
                    value.DATE_INICIO_AGENDOU.slice(10, 16) +
                    " - " +
                    value.DATE_FIM_AGENDOU.slice(10, 16) +
                    "</h5>" +
                    "</div>" +
                    "<div class='card-body text-center'>" +
                    "<p class='card-text' style='margin-bottom: 0;'><span style='font-weight:bold;'>Paciente:</span></p>" +
                    "<h5 class='card-title' style='margin-bottom: 10px;'>" +
                    value.paciente.TXT_NOME +
                    "</h5>" +
                    "<p class='card-text'></br>";

                if (value.treino.length == 0) {
                    tbrows +=
                        '<button type="button" class="btn btn-secondary" onclick="iniciaTreinoComAgendamento(\'' +
                        value.paciente.INT_ID +
                        "','" +
                        value.INT_ID +
                        "','" +
                        value.DATE_INICIO_AGENDOU.slice(0, 10) +
                        "T" +
                        value.DATE_INICIO_AGENDOU.slice(11, 16) +
                        "','" +
                        value.DATE_FIM_AGENDOU.slice(0, 10) +
                        "T" +
                        value.DATE_FIM_AGENDOU.slice(11, 16) +
                        "')\"> Iniciar Treino</button>";

                    tbrows +=
                        "</p>" +
                        "</div>" +
                        "<div class='card-footer text-center'>" +
                        "<button class='btn btn-primary espaco-direita'" +
                        "onclick=\"preencheCampos('" +
                        value.DATE_INICIO_AGENDOU +
                        "','" +
                        value.DATE_FIM_AGENDOU +
                        "','" +
                        value.INT_ID_PACIENTE +
                        "','" +
                        value.paciente.TXT_NOME +
                        "','" +
                        value.paciente.TXT_FOTO +
                        "','" +
                        value.INT_ID +
                        "')\"> Editar</button>" +
                        '<button class="btn btn-danger" data-toggle="modal"' +
                        'data-target="#exampleModal"  onclick="preparaExclusao(\'' +
                        value.INT_ID +
                        "')\"> Excluir</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                } else {
                    tbrows +=
                        '<button type="button" class="btn btn-secondary" onclick="iniciaTreinoComAgendamento(\'' +
                        value.paciente.INT_ID +
                        "','" +
                        value.INT_ID +
                        "','" +
                        value.DATE_INICIO_AGENDOU.slice(0, 10) +
                        "T" +
                        value.DATE_INICIO_AGENDOU.slice(11, 16) +
                        "','" +
                        value.DATE_FIM_AGENDOU.slice(0, 10) +
                        "T" +
                        value.DATE_FIM_AGENDOU.slice(11, 16) +
                        "')\" disabled> Treino Iniciado</button>";

                    tbrows +=
                        "</p>" +
                        "</div>" +
                        "<div class='card-footer text-center'>" +
                        "<button class='btn btn-primary espaco-direita'" +
                        "onclick=\"preencheCampos('" +
                        value.DATE_INICIO_AGENDOU +
                        "','" +
                        value.DATE_FIM_AGENDOU +
                        "','" +
                        value.INT_ID_PACIENTE +
                        "','" +
                        value.paciente.TXT_NOME +
                        "','" +
                        value.paciente.TXT_FOTO +
                        "','" +
                        value.INT_ID +
                        "')\" disabled> Editar</button>" +
                        '<button class="btn btn-danger" data-toggle="modal"' +
                        'data-target="#exampleModal"  onclick="preparaExclusao(\'' +
                        value.INT_ID +
                        "')\" disabled> Excluir</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                }
            }
            index++;
        });
    }

    $("#datagrid1").html(tbrows);
}

function preencheCampos(
    DATE_INICIO_AGENDOU,
    DATE_FIM_AGENDOU,
    INT_ID_PACIENTE,
    TXT_NOME,
    TXT_FOTO,
    id
) {
    document.getElementById("pacienteselect").value = INT_ID_PACIENTE;
    idglobalPaciente = INT_ID_PACIENTE;
    document.getElementById("inicioTreino").value = DATE_INICIO_AGENDOU;
    document.getElementById("finalTreino").value = DATE_FIM_AGENDOU;
    document.getElementById("nomePaciente").value = TXT_NOME;
    if (TXT_FOTO != "null") {
        editarImg =
            "<img src='uploads/img/" +
            TXT_FOTO +
            "' style='height: 122px;'></img>";
        $("#editImagem").html(editarImg);
    } else {
        editarImg = "";
        $("#editImagem").html(editarImg);
    }
    habilitaDesabilitaBotoes(false, id);
}

function cancelarEdicao() {
    document.getElementById("pacienteselect").value = "0";
    document.getElementById("inicioTreino").value = "";
    document.getElementById("finalTreino").value = "";
    document.getElementById("nomePaciente").value = "";
    document.getElementById("tempoTreino").value = "";

    var editarImg = "";
    $("#editImagem").html(editarImg);
    habilitaDesabilitaBotoes(true, 0);
}
// --------------------------- CADASTRA ALTERA -------------------------------
function cadAltera(id, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    const inicioTreino = new Date(
        document.getElementById("inicioTreino").value
    );
    const finalTreino = new Date(document.getElementById("finalTreino").value);

    if (document.getElementById("pacienteselect").value == "0")
        document.getElementById("result").textContent =
            "Favor, selecione um paciente!!!";
    else if (document.getElementById("inicioTreino").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a data/hora de inicio!!!";
    else if (document.getElementById("finalTreino").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a data/hora final!!!";
    else if (inicioTreino >= finalTreino) {
        document.getElementById("result").textContent =
            "Horário final inválido!!!";
    } else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/setagenda/" +
                id +
                "/" +
                cadAltera +
                "/" +
                idEmpresa +
                "/" +
                idglobalPaciente +
                "/" +
                idUsuarioAtivo,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                //console.log(data);
                document.getElementById("result").textContent = data.msg;
                cancelarEdicao();
                carregaAgenda();
                montaTabela();
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
function preparaExclusao(id) {
    idSelecionadaParaExcluir = id;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent = "Deseja REALMENTE excluir?";
}

function cancelarExclusao() {
    idSelecionadaParaExcluir = 0;
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delagenda/" + idSelecionadaParaExcluir + "/" + idUsuarioAtivo,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaAgenda();
            cancelarEdicao();
            montaTabela();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}
// --------------------------- VERIFICA MENU PILATES -------------------------------
function setMenuPilates() {
    if (pilates) {
        x = document.getElementsByName("pacienteMenu");
        x.forEach((element) => {
            element.style.display = "block";
        });
    } else {
        x = document.getElementsByName("pacienteMenu");
        x.forEach((element) => {
            element.style.display = "none";
        });
    }
}
