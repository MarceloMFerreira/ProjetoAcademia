var cJson = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaColaboradores();
    habilitaDesabilitaBotoes(true, 0);
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
            '<a title="Atualizar"><button type="submit" data-toggle="modal" data-target="#exampleModal" name="updatebtn" id="btn" class="btn btn-success uptadebtn mr-2"  onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\"><i class='fas fa-plus-circle'></i> Cadastrar</button> </a>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a title="Atualizar"><button type="submit" data-toggle="modal" data-target="#exampleModal" name="updatebtn" id="btn" class="btn btn-primary uptadebtn mr-2" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\"><i class='fas fa-fw fa-pencil-alt'>&nbsp;</i> Editar</button> </a>";
        buton +=
            '<a title="Cancelar"><button type="submit" class="btn btn-secondary" onclick="cancelarEdicao()"><i class="fas fa-ban"></i> Cancelar</button> </a>';
    }
    $("#botoes").html(buton);
}


// --------------------------- CARREGA COLABORADORES -------------------------------
function carregaColaboradores() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getcolaboradores",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            cJson = resultado.Colaborador;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;

            cJson.forEach((value) => {
                rows +=
                "<tr>" +
                "<td style='display:none;'>" +
                value.INT_ID +
                "</td>" +
                "<td>" +
                value.TXT_NOME +
                "</td>" +
                "<td>" +
                value.TXT_EMAIL +
                "</td>" +
                "<td class='text-center d-flex align-items-end'>" +
                "<a title='Atualizar' class='btn btn-sm btn-success mr-2'" +
                "onclick=\"preencheCampos('" +
                value.TXT_NOME +
                "','" +
                value.TXT_EMAIL +
                "','" +
                value.INT_ID +
                "')\">" +
                "<i class='fas fa-edit'>&nbsp;</i>Editar</a>" +
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
// --------------------------- VERIFICA E-MAIL -------------------------------
function validacaoEmail(field) {
    var div = document.getElementById("msgemail");

    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(
        field.value.indexOf("@") + 1,
        field.value.length
    );

    if (
        usuario.length >= 1 &&
        dominio.length >= 3 &&
        usuario.search("@") == -1 &&
        dominio.search("@") == -1 &&
        usuario.search(" ") == -1 &&
        dominio.search(" ") == -1 &&
        dominio.search(".") != -1 &&
        dominio.indexOf(".") >= 1 &&
        dominio.lastIndexOf(".") < dominio.length - 1
    ) {
        div.innerText = "";
        document.getElementById("botao").disabled = false;
    } else {
        div.innerText = "E-mail inválido";
        document.getElementById("botao").disabled = true;
    }
}

function verificaEmail() {
    document.getElementById(validacaoEmail(txtEmail));
}

// --------------------------- VERIFICA SENHA -------------------------------
function verificaSenha() {
    var div = document.getElementById("msgsenha");

    if (
        document.getElementById("txtConfirmaSenha").value !=
        document.getElementById("txtSenha").value
    ) {
        document.getElementById("btn").disabled = true;
        div.innerText = "Senha inválida!";
    } else {
        document.getElementById("btn").disabled = false;
        div.innerText = "";
    }
}
// ---------------------------  EDIÇÃO -------------------------------
function cancelarEdicao() {
    var div = document.getElementById("msgsenha");
    var div2 = document.getElementById("msgemail");

    div2.innerText = "";
    div.innerText = "";

    document.getElementById("txtNome").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtSenha").value = "";
    document.getElementById("txtConfirmaSenha").value = "";

    habilitaDesabilitaBotoes(true, 0);
    document.getElementById("botao").disabled = false;
}

function preencheCampos(TXT_NOME, TXT_EMAIL, id) {
    document.getElementById("txtNome").value = TXT_NOME;
    document.getElementById("txtEmail").value = TXT_EMAIL;

    habilitaDesabilitaBotoes(false, id);
}
// --------------------------- CADASTRA ALTERA -------------------------------
function cadAltera(id, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtNome").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o nome do colaborador!!!";
    else if (document.getElementById("txtEmail").value == "")
        document.getElementById("result").textContent =
            "Favor, insira o Email!!!";
    else if (document.getElementById("txtSenha").value == "")
        document.getElementById("result").textContent =
            "Favor, insira a senha!!!";
    else if (document.getElementById("txtConfirmaSenha").value == "")
        document.getElementById("result").textContent =
            "Favor, confirme a senha!!!";
    else if (document.getElementById("txtNome").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Nome do Colaborador máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtEmail").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo E-mail do Colaborador máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "/setcolaborador/" + id + "/" + cadAltera + "/" + idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                carregaColaboradores();
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
        "Deseja REALMENTE excluir este colaborador?";
}

function cancelarExclusao() {
    idSelecionadaParaExcluir = 0;
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delcolaborador/" + idSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaColaboradores();
            cancelarEdicao();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}