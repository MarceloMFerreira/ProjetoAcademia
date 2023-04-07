var ccJson = [];
var idCCSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaCC();
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
};

function carregaCC() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getcentrocusto",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            ccJson = resultado.CentroCusto;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;
            

            ccJson.forEach((value) => {
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
            '<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' + idAlterar + "','" + 1 +"')\">Cadastrar</button>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a class=" btn btn-primary  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' + idAlterar + "','" + 0 +"')\">Alterar</a>";
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
    idCCSelecionadaParaExcluir = 0;
}

function preparaExclusao(idCC) {
    idCCSelecionadaParaExcluir = idCC;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir este centro de custo?";
}

function cancelarEdicao() {
    document.getElementById("txtDescricaoCC").value = "";
    habilitaDesabilitaBotoes(true, 0);
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delcentrocusto/" + idCCSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaCC();
            cancelarEdicao();

            //chama para preencher as musicas
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}

function preencheCampos(TXT_DESC, idCC) {
    document.getElementById("txtDescricaoCC").value = TXT_DESC;
    habilitaDesabilitaBotoes(false, idCC);
}

function cadAltera(idCC, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricaoCC").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a descrição do Centro de Custos!!!";
    else if (document.getElementById("txtDescricaoCC").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo descrição do centro de custos máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            //url: "http://127.0.0.1:8000/api/setrepertorio/?TXT_NOME_DA_MUSICA="+document.getElementById('TXT_NOME_DA_MUSICA').value,
            url: "/setcentrocusto/" + idCC + "/" + cadAltera + "/" + idEmpresa  ,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                //console.log(data);
                document.getElementById("result").textContent = data.msg;
                carregaCC();
                //if(data==1)
                {
                    cancelarEdicao();

                    //escreveProdutos();
                }
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
