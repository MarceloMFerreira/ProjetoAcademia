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
            '<button type="button" class=" btn btn-success" onclick="excluir()">Confirmar</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusao()">Cancelar</button>';
    }
    $("#botoesModal").html(buton);
}

function habilitaDesabilitaBotoes(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton =
            '<a class=" btn btn-success" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\"><i class='fas fa-plus-circle'> Cadastrar</a>";
    } else {
        buton =
            '<a class=" btn btn-primary" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\"><i class='fas fa-fw fa-pencil-alt'>&nbsp;</i> Alterar</a>";
        buton +=
            '  <a class=" btn btn-light" onclick="cancelarEdicao()"><i class="fas fa-ban"></i> Cancelar</a>';
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
        inicio +
        "/" +
        final;
}

// ---------------------------  EDIÇÃO -------------------------------
function montaTabela() {
    var tbody = document.getElementById("datagrid1");
    tbody.innerHTML = ""; // Limpa o conteúdo atual da tabela

    var index = 0;
    date = document.getElementById("dtFiltro").value;

    var radio1 = document.getElementById("emAberto");
    var radio2 = document.getElementById("iniciados");
    var radio3 = document.getElementById("todos");

    json.forEach((value) => {
        dateEdit = value.DATE_INICIO_AGENDOU.slice(0, 10);
        if (
            (radio1.checked && dateEdit == date && value.treino.length == 0) ||
            (radio2.checked && dateEdit == date && value.treino.length > 0) ||
            (radio3.checked && dateEdit == date)
        ) {
            var row = tbody.insertRow();

            // Coluna do Horário
            var cellHorario = row.insertCell();
            cellHorario.textContent =
                value.DATE_INICIO_AGENDOU.slice(10, 16) +
                " - " +
                value.DATE_FIM_AGENDOU.slice(10, 16);

            // Coluna do Paciente
            var cellPaciente = row.insertCell();
            cellPaciente.textContent = value.paciente.TXT_NOME;

            // Coluna das Ações
            var cellAcoes = row.insertCell();
            cellAcoes.className = "text-center col-2";
            // Botão Iniciar Treino
            if (value.treino.length == 0) {
                var iniciarTreinoButton = document.createElement("button");
                iniciarTreinoButton.type = "button";
                iniciarTreinoButton.className = "btn btn-sm btn-info mr-2";
                iniciarTreinoButton.innerHTML =
                    "<i class='fas fa-wrench'></i> Iniciar Treino";
                iniciarTreinoButton.addEventListener("click", function () {
                    iniciaTreinoComAgendamento(
                        value.paciente.INT_ID,
                        value.INT_ID,
                        value.DATE_INICIO_AGENDOU.slice(0, 10) +
                            "T" +
                            value.DATE_INICIO_AGENDOU.slice(11, 16),
                        value.DATE_FIM_AGENDOU.slice(0, 10) +
                            "T" +
                            value.DATE_FIM_AGENDOU.slice(11, 16)
                    );
                });
                cellAcoes.appendChild(iniciarTreinoButton);
            } else {
                var iniciarTreinoButton = document.createElement("button");
                iniciarTreinoButton.type = "button";
                iniciarTreinoButton.className = "btn btn-sm btn-info mr-2";
                iniciarTreinoButton.innerHTML =
                    "<i class='fas fa-wrench'></i> Iniciar Treino";
                cellAcoes.appendChild(iniciarTreinoButton);
                iniciarTreinoButton.disabled = true;
            }

            var editarButton = document.createElement("button");
            editarButton.className = "btn btn-sm btn-success mr-2";
            editarButton.innerHTML = "<i class='fas fa-edit'></i> Editar";
            editarButton.addEventListener("click", function () {
                preencheCampos(
                    value.DATE_INICIO_AGENDOU,
                    value.DATE_FIM_AGENDOU,
                    value.INT_ID_PACIENTE,
                    value.paciente.TXT_NOME,
                    value.paciente.TXT_FOTO,
                    value.INT_ID
                );
            });
            cellAcoes.appendChild(editarButton);

            var excluirButton = document.createElement("button");
            excluirButton.className = "btn btn-sm btn-danger mr-2";
            excluirButton.innerHTML =
                "<i class='fas fa-trash-alt'></i> Excluir";
            excluirButton.setAttribute("data-toggle", "modal");
            excluirButton.setAttribute("data-target", "#exampleModal");
            excluirButton.addEventListener("click", function () {
                preparaExclusao(value.INT_ID);
            });
            cellAcoes.appendChild(excluirButton);

            index++;
        }
    });
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

    var diasSemana = document.getElementsByName("diasSemana[]");
    for (var i = 0; i < diasSemana.length; i++) {
        diasSemana[i].checked = false;
    }

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
