var prodCategoriaJson = [];
var idprodCategoriaSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaprodCategoria();
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
};

function carregaprodCategoria() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getprodcategoria",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            idEmpresa = resultado.idEmpresa;
            prodCategoriaJson = resultado.CategoriaProduto;
            pilates = resultado.boolPilates;
           

                prodCategoriaJson.forEach((value) => {
                rows +=
                    '<a class="dropdown-item" onclick="preencheCampos(\'' +
                    value.TXT_DESCRICAO +
                    "','" +
                    value.INT_ID +
                    "')\">" +
                    value.TXT_DESCRICAO +
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
            '<button type="button" class=" btn btn-success" onclick="excluirProdCategoria()">Sim</a>';
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cancelarExclusao()">Não</button>';
    }
    $("#botoesModal").html(buton);
}

function habilitaDesabilitaBotoes(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton =
            '<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' + idAlterar + "','" + 1 +"')\">Cadastrar</button>";
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
    idprodCategoriaSelecionadaParaExcluir = 0;
}

function preparaExclusao(idProdCategoria) {
    idprodCategoriaSelecionadaParaExcluir = idProdCategoria;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir esta categoria?";
}

function cancelarEdicao() {
    document.getElementById("txtDescricaoProdCategoria").value = "";
    habilitaDesabilitaBotoes(true, 0);
}

function excluirProdCategoria() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delprodcategoria/" + idprodCategoriaSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaprodCategoria();
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

function preencheCampos(TXT_DESCRICAO, idProdCategoria) {
    document.getElementById("txtDescricaoProdCategoria").value = TXT_DESCRICAO;
    habilitaDesabilitaBotoes(false, idProdCategoria);
}

function cadAltera(idProdCategoria, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricaoProdCategoria").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a descrição da categoria!!!";
    else if (document.getElementById("txtDescricaoProdCategoria").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo descrição da categoria máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            //url: "http://127.0.0.1:8000/api/setrepertorio/?TXT_NOME_DA_MUSICA="+document.getElementById('TXT_NOME_DA_MUSICA').value,
            url: "/setprodcategoria/" + idProdCategoria + "/" + cadAltera + "/" + idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                //console.log(data);
                document.getElementById("result").textContent = data.msg;
                carregaprodCategoria();
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
