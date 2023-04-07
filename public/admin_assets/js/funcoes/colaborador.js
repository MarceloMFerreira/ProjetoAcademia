var cJson = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaColaboradores();
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
            '<button class=" btn btn-success  btn-lg btn-block" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\">Cadastrar</button>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a class=" btn btn-primary  btn-lg btn-block" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\">Alterar</a>";
        buton +=
            '<a class=" btn  btn-lg btn-danger btn-block" data-toggle="modal" data-target="#exampleModal" onclick="preparaExclusao(' +
            idAlterar +
            ')">Excluir</a>';
        buton +=
            '  <a class=" btn btn-light btn-lg btn-block" onclick="cancelarEdicao()">Cancelar</a>';
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
                    '<a class="dropdown-item" onclick="preencheCampos(\'' +
                    value.TXT_NOME +
                    "','" +
                    value.TXT_EMAIL +
                    "','" +
                    value.INT_ID +
                    "')\">" +
                    value.TXT_NOME +
                    "</a>";
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
        document.getElementById("botao").disabled = true;
        div.innerText = "Senha inválida!";
    } else {
        document.getElementById("botao").disabled = false;
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
