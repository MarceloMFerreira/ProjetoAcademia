var marcaJson = [];
var idMarcaSelecionadaParaExcluir = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaMarcas();
    habilitaDesabilitaBotoes(true, 0);
    setMenuPilates();
};

function carregaMarcas() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getmarca",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            idEmpresa = resultado.idEmpresa;
            marcaJson = resultado.Marca;
            pilates = resultado.boolPilates;

            marcaJson.forEach((value) => {
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
            '<button type="button" class=" btn btn-success" onclick="excluirMarca()">Sim</a>';
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
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
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
    idMarcaSelecionadaParaExcluir = 0;
}

function preparaExclusao(idMarca) {
    idMarcaSelecionadaParaExcluir = idMarca;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir esta marca?";
}

function cancelarEdicao() {
    document.getElementById("txtDescricaoMarca").value = "";
    habilitaDesabilitaBotoes(true, 0);
}

function excluirMarca() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/excluirmarca/" + idMarcaSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaMarcas();
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

function preencheCampos(TXT_DESCRICAO, idMarca) {
    document.getElementById("txtDescricaoMarca").value = TXT_DESCRICAO;
    habilitaDesabilitaBotoes(false, idMarca);
}

function cadAltera(idMarca, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricaoMarca").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a descrição da marca!!!";
    else if (document.getElementById("txtDescricaoMarca").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo descrição da marca máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            //url: "http://127.0.0.1:8000/api/setrepertorio/?TXT_NOME_DA_MUSICA="+document.getElementById('TXT_NOME_DA_MUSICA').value,
            url: "/setmarca/" + idMarca + "/" + cadAltera + "/" + idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                //console.log(data);
                document.getElementById("result").textContent = data.msg;
                carregaMarcas();
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

function fechamodal() {
    $("#exampleModal-backdrop").css("display", "none");
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
