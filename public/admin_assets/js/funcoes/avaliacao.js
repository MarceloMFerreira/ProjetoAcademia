var json = [];
var pacientes = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;
var idglobalPaciente;
var idUsuarioAtivo = 0;

window.onload = function () {
    carregaAvaliacoes();
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
    document.getElementById("dtNasc").value = today;
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
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

// --------------------------- CARREGA PACIENTES / AVALIAÇÕES -------------------------------
function carregaAvaliacoes() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getavaliacoes",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            json = resultado.Avaliacoes;
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
            //console.log('You selected: ', this.value);
            idglobalPaciente = this.value;
            montaTabela(idglobalPaciente);
        });

    //Pro select funcionar
    // $(document).ready(function () {
    //     $(".selectpicker").selectpicker();
    // });
}

// ---------------------------  EDIÇÃO -------------------------------
function montaTabela(idPaciente) {
    var tbrows = "";
    var index = 0;

    json.forEach((value) => {
        if (value.INT_ID_PACIENTE == idPaciente) {
            tbrows +=
                "<tr>" +
                "<td class = 'text-center'>" +
                "<input type='date' class='form-control' disabled='true' value='" +
                value.DATE_AVALIACAO +
                "'></input>" +
                "</td>" +
                "<td class = 'text-center'>" +
                value.DECIMAL_PESO +
                "</td>" +
                "<td class = 'text-center'>" +
                value.DECIMAL_ALTURA +
                "</td>" +
                "<td class = 'text-center'>" +
                value.TXT_OUTRAS_QUEIXAS +
                "</td>" +
                "<td class = 'text-center'>" +
                '<button type="button" class="btn btn-success" onclick="preencheCampos(\'' +
                value.INT_ID;

            tbrows +=
                "')\"> Editar</button>" +
                "</td>" +
                "<td class = 'text-center'>" +
                '<button data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-danger" onclick="preparaExclusao(\'' +
                value.INT_ID +
                "')\"> Excluir</button>" +
                "</td>" +
                "</tr>";
        }
        index++;
    });
    var editarImg = "";
    pacientes.forEach((value1) => {
        if (value1.INT_ID == idPaciente && value1.TXT_FOTO != null) {
            editarImg =
                "<img src='uploads/img/" +
                value1.TXT_FOTO +
                "' style='height: 122px;'></img>";
        }
    });
    $("#editImagem").html(editarImg);
    $("#datagrid1").html(tbrows);
}

function preencheCampos(id) {
    const objFiltrados = json.filter(obj => obj.INT_ID == id);

    document.getElementById("txtPeso").value = objFiltrados[0].DECIMAL_PESO;
    document.getElementById("txtAltura").value = objFiltrados[0].DECIMAL_ALTURA;
    document.getElementById("dtNasc").value = objFiltrados[0].DATE_AVALIACAO;
    document.getElementById("txtQueixa").value = objFiltrados[0].TXT_OUTRAS_QUEIXAS;
    habilitaDesabilitaBotoes(false, id);
}

function cancelarEdicao() {
    document.getElementById("txtPeso").value = "";
    document.getElementById("txtAltura").value = "";
    document.getElementById("dtNasc").value = "";
    document.getElementById("txtQueixa").value = "";
    document.getElementById("pacienteselect").value = idglobalPaciente;
    habilitaDesabilitaBotoes(true, 0);
}

// --------------------------- CADASTRA ALTERA -------------------------------
function cadAltera(id, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("pacienteselect").value == "0")
        document.getElementById("result").textContent =
            "Favor, selecione um paciente!!!";
    else if (document.getElementById("txtPeso").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o peso!!!";
    else if (document.getElementById("txtAltura").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a altura!!!";
    else if (document.getElementById("dtNasc").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a data da avaliação!!!";
    else if (document.getElementById("txtQueixa").value == "")
        document.getElementById("result").textContent =
            "Favor, informe se houve alguma queixa!!!";
    else if (document.getElementById("txtQueixa").value.length > 2000)
        document.getElementById("result").textContent =
            "Favor, para o campo queixa do paciente máximo de 2000 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/setavaliacao/" +
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
                carregaAvaliacoes();
                cancelarEdicao();
                montaTabela(idglobalPaciente);
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
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir esta avaliação?";
}

function cancelarExclusao() {
    idSelecionadaParaExcluir = 0;
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delavaliacao/" + idSelecionadaParaExcluir + "/" + idUsuarioAtivo,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaAvaliacoes();
            cancelarEdicao();
            montaTabela(idglobalPaciente);
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
