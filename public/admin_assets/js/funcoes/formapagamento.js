var fpJson = [];
var idFPSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;
window.onload = function () {
    carregaFormaPagamento();
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
};

function carregaFormaPagamento() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getformapagamento",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            fpJson = resultado.FormaPagamento;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;

            fpJson.forEach((value) => {
                rows +=
                    '<a class="dropdown-item" onclick="preencheCampos(\'' +
                    value.TXT_DESC +
                    "','" +
                    value.INT_ID +
                    "')\">" +
                    value.TXT_DESC +
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
            '<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\">Cadastrar</button>";
    } else {
        buton =
            '<a class=" btn btn-primary  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
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

function cancelarExclusao() {
    idFPSelecionadaParaExcluir = 0;
}

function preparaExclusao(idFP) {
    idFPSelecionadaParaExcluir = idFP;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir esta forma de pagamento?";
}

function cancelarEdicao() {
    document.getElementById("txtDescricaoFormaPagamento").value = "";
    habilitaDesabilitaBotoes(true, 0);
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delformapagamento/" + idFPSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaFormaPagamento();
            cancelarEdicao();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}

function preencheCampos(TXT_DESC, idFP) {
    document.getElementById("txtDescricaoFormaPagamento").value = TXT_DESC;
    habilitaDesabilitaBotoes(false, idFP);
}

function cadAltera(idFP, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricaoFormaPagamento").value == "")
        document.getElementById("result").textContent = "Favor, informe a descrição da forma de pagamento!!!";
    else if (
        document.getElementById("txtDescricaoFormaPagamento").value.length > 100
    )
        document.getElementById("result").textContent =
            "Favor, para o campo descrição da forma de pagamento máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "/setformapagamento/" + idFP + "/" + cadAltera + "/" + idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                carregaFormaPagamento();
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


function fechamodal() {
    $("#exampleModal-backdrop").css("display", "none");
}
