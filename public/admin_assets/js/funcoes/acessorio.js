var aJson = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaAcessorios();
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
};

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("inputFilter")
        .addEventListener("keyup", function () {
            filterTable();
        });
});

function filterTable() {
    // Obtenha o valor do input de pesquisa
    var input = document.getElementById("inputFilter");
    var filter = input.value.toUpperCase();

    // Obtenha as linhas da tabela
    var table = document.getElementById("dataTable");
    var rows = table.getElementsByTagName("tr");

    // Itere sobre as linhas e oculte aquelas que não correspondem ao filtro de pesquisa
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].getElementsByTagName("td")[1];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}


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
            '<a title="Atualizar"><button type="submit" data-toggle="modal" data-target="#exampleModal" name="updatebtn" class="btn btn-success uptadebtn mr-2"  onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\"><i class='fas fa-plus-circle'></i> Cadastrar</button> </a>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a title="Atualizar"><button type="submit" data-toggle="modal" data-target="#exampleModal" name="updatebtn" class="btn btn-primary uptadebtn mr-2" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\"><i class='fas fa-fw fa-pencil-alt'>&nbsp;</i>Atualizar</button> </a>";
        buton +=
            '<a title="Cancelar"><button type="submit" class="btn btn-secondary" onclick="cancelarEdicao()"><i class="fas fa-ban"></i> Cancelar</button> </a>';
    }
    $("#botoes").html(buton);
}

// --------------------------- CARREGA ACESSÓRIOS -------------------------------
function carregaAcessorios() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getacessorio",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            idEmpresa = resultado.idEmpresa;
            aJson = resultado.Acessorio;
            pilates = resultado.boolPilates;

            aJson.forEach((value) => {
                rows +=
                    "<tr>" +
                    "<td style='display:none;'>" +
                    value.INT_ID +
                    "</td>" +
                    "<td>" +
                    value.TXT_DESCRICAO +
                    "</td>" +
                    "<td class='text-center d-flex align-items-end'>" +
                    "<a title='Atualizar' class='btn btn-sm btn-success mr-2'" +
                    "onclick=\"preencheCampos('" +
                    value.TXT_DESCRICAO +
                    "','" +
                    value.INT_ID +
                    "')\">" +
                    "<i class='fas fa-edit'>&nbsp;</i>Atualizar</a>" +
                    "<a title='Excluir' onclick=\"preparaExclusao(" +
                    value.INT_ID +
                    ')"' +
                    "data-toggle='modal' data-target='#exampleModal'" +
                    "class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'>&nbsp;</i>Excluir</a>" +
                    "</td>" +
                    "</tr>";
            });

            $("#datagrid").html(rows);
            habilitaDesabilitaBotoes(true, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}

// ---------------------------  EDIÇÃO -------------------------------
function preencheCampos(TXT_DESCRICAO, id) {
    document.getElementById("txtDescricao").value = TXT_DESCRICAO;

    habilitaDesabilitaBotoes(false, id);
}

function cancelarEdicao() {
    document.getElementById("txtDescricao").value = "";
    habilitaDesabilitaBotoes(true, 0);
}

// --------------------------- CADASTRA ALTERA -------------------------------
function cadAltera(id, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricao").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a descrição do acessório!!!";
    else if (document.getElementById("txtDescricao").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo descrição do acessório máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "/setacessorio/" + id + "/" + cadAltera + "/" + idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                //console.log(data);
                document.getElementById("result").textContent = data.msg;
                carregaAcessorios();
                cancelarEdicao();
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
        "Deseja REALMENTE excluir este acessório?";
}

function cancelarExclusao() {
    idSelecionadaParaExcluir = 0;
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delacessorio/" + idSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaAcessorios();
            cancelarEdicao();
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
