var json = [];
var pacientes = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;
var idglobalPaciente;
var idUsuarioAtivo = 0;

window.onload = function () {
    carregaAvaliacoes();
    habilitaDesabilitaBotoes(true, 0);
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
            "')\"><i class='fas fa-fw fa-pencil-alt'>&nbsp;</i>Alterar</a>";
        buton +=
            '  <a class=" btn btn-light" onclick="cancelarEdicao()"><i class="fas fa-ban"></i>Cancelar</a>';
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
                "<td class='text-center'>" +
                "<input type='date' class='form-control' disabled='true' value='" +
                value.DATE_AVALIACAO +
                "'></input>" +
                "</td>" +
                "<td class='text-center'>" +
                value.DECIMAL_PESO +
                "</td>" +
                "<td class='text-center'>" +
                value.DECIMAL_ALTURA +
                "</td>" +
                "<td class='text-center'>" +
                value.TXT_OUTRAS_QUEIXAS +
                "</td>" +
                "<td class='text-center'>" +
                "<div class='btn-group'>" +
                "<button type='button' class='btn btn-sm btn-success mr-2' onclick=\"preencheCampos('" +
                value.INT_ID +
                "')\">" +
                "<i class='fas fa-edit'>&nbsp;</i>Editar" +
                "</button>" +
                "<button data-toggle='modal' data-target='#exampleModal' type='button' class='btn btn-sm btn-danger' onclick=\"preparaExclusao('" +
                value.INT_ID +
                "')\">" +
                "<i class='fas fa-trash-alt'>&nbsp;</i>Excluir" +
                "</button>" +
                "</div>" +
                "</td>" +
                "</tr>";
        }
        index++;
    });
    
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
