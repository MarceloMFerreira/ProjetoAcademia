var fpJson = [];
var idFPSelecionadaParaExcluir = 0;
var qtdParcelas = 0;
var lsitaParcelas = [];
var jsonString;
var listaParcelasIds = [];
var idFPSalvo = 0;
var idEmpresa;
var pilates;

window.onload = function () {
    carregaFormaParcelamento();
    habilitaDesabilitaBotoes(true);
    habilitaDesabilitaBotoesADD(true, 0);
    mostra_oculta();
    parcelasIguaisChecked();
    setMenuPilates();
};

function carregaFormaParcelamento() {
    var rows = "";
    listaParcelasIds = [];

    $.ajax({
        type: "GET",
        url: "/getformaparcelamento",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (resultado) {
            //console.log(resultado);
            fpJson = resultado.FormaParcelamento;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;

            fpJson.forEach((value) => {
                listaParcelasIds.push(value.parcelas);
                rows +=
                    '<a class="dropdown-item" onclick="preencheCampos(\'' +
                    value.TXT_DESCRICAO +
                    "','" +
                    value.INT_NUM_PARCELA +
                    "','" +
                    value.INT_ID +
                    "')\">" +
                    value.TXT_DESCRICAO +
                    "</a>";
            });

            $("#datagrid").html(rows);
            habilitaDesabilitaBotoesADD(false, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}

function criaTabela(INT_NUM_PARCELAS) {
    var tbrows = "";

    if (INT_NUM_PARCELAS > 0) {
        for (let index = 1; index <= INT_NUM_PARCELAS; index++) {
            tbrows +=
                "<tr>" +
                "<th scope='row'>" +
                index +
                "</th>" +
                "<td>" +
                "<input type='number' class='form-control' id='txtParcela" +
                index +
                "'" +
                "name='txtParcela' placeholder='Informe o número de dias'> </input>" +
                "</td>" +
                "</tr>";
        }
    }

    $("#datagrid1").html(tbrows);

    qtdParcelas = INT_NUM_PARCELAS;
}

function preencheTabela(INT_NUM_PARCELAS) {
    for (let index = 1; index <= INT_NUM_PARCELAS; index++) {
        document.getElementById("txtParcela" + index).value = 0;
    }
}

function preencheCampos(TXT_DESCRICAO, INT_NUM_PARCELAS, idFP) {
    var indice;
    document.getElementById("txtDescricaoFormaParcelamento").value =
        TXT_DESCRICAO;
    document.getElementById("txtNumParcelas").value = INT_NUM_PARCELAS;
    habilitaDesabilitaBotoes(false);
    habilitaDesabilitaBotoesADD(false, idFP);
    x = document.getElementById("cadParcelas");
    x.style.display = "block";
    criaTabela(INT_NUM_PARCELAS);
    idFPSalvo = idFP;

    //montaTabela(repertorioJson.repertorio.filter(x=> x.TXT_NOME_MUSICA.toLowerCase().indexOf(document.getElementById('txtConsulta').value.toLowerCase())>-1));
    //console.log(listaParcelasIds.filter(x=> x.INT_ID_FORMA_PARC == idFP));

    for (let index = 0; index < listaParcelasIds.length; index++) {
        if (listaParcelasIds[index][0].INT_ID_FORMA_PARC == idFP) {
            indice = index;
            break;
        }
    }

    for (let index = 0; index < INT_NUM_PARCELAS; index++) {
        document.getElementById("txtParcela" + (index + 1)).value =
            listaParcelasIds[indice][index].INT_DIAS;

        document.getElementById("txtSalvaListaIds").value +=
            listaParcelasIds[indice][index].INT_ID;
        if (index != INT_NUM_PARCELAS - 1)
            document.getElementById("txtSalvaListaIds").value += ",";
    }

    desabilitaQtdParcelas(true);
}

function mostra_oculta() {
    x = document.getElementById("cadParcelas");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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

function habilitaDesabilitaBotoes(cadAltera) {
    buton =
        '<button class=" btn btn-success  btn-lg  col-2 btn-block" data-toggle="modal" data-target="#exampleModal" onclick="cadAlteraParcela(\'' +
        cadAltera +
        "')\">Confirmar</button>";
    $("#botoes").html(buton);
}

function habilitaDesabilitaBotoesADD(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton2 =
            '<button class=" btn btn-success  btn-lg col-2" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            1 +
            "')\">Cadastrar</button>";
    } else {
        buton2 =
            '<a class=" btn btn-primary  btn-lg col-2" data-toggle="modal" data-target="#exampleModal" onclick="cadAltera(\'' +
            idAlterar +
            "','" +
            0 +
            "')\">Alterar</a>";
        buton2 +=
            '<a class=" btn  btn-lg btn-danger col-2" data-toggle="modal" data-target="#exampleModal" onclick="preparaExclusao(' +
            idAlterar +
            ')">Excluir</a>';
        buton2 +=
            '  <a class=" btn btn-light btn-lg col-2" onclick="cancelarEdicao()">Cancelar</a>';
    }
    $("#botaoADD").html(buton2);
}

function cancelarExclusao() {
    idFPSelecionadaParaExcluir = 0;
}

function preparaExclusao(idFP) {
    idFPSelecionadaParaExcluir = idFP;
    habilitaDesabilitaBotoesADD(false);
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir esta forma de parcelamento?";
}

function cancelarEdicao() {
    x = document.getElementById("cadParcelas");
    habilitaDesabilitaBotoesADD(true, 0);
    x.style.display = "none";
    document.getElementById("txtDescricaoFormaParcelamento").value = "";
    document.getElementById("txtNumParcelas").value = "";
    //document.getElementById("txtIntervaloTempo").value = "";
    criaTabela(0);
    habilitaDesabilitaBotoes(true);
    document.getElementById("txtSalvaLista").value = "";
    document.getElementById("txtSalvaListaIds").value = "";
    desabilitaQtdParcelas(false);
    //carregaFormaParcelamento();
    idFPSalvo = 0;

    document.getElementById("chcParcelasIguais").checked = false;
}

function excluir() {
    document.getElementById("result").textContent = "Conectando ao servidor...";

    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";

    // var formulario = $("form")[0];
    // var image = new FormData(formulario);

    $.ajax({
        type: "GET",
        url: "/delformaparcelamento/" + idFPSalvo,
        // data: image,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaFormaParcelamento();
            mostra_oculta();
            cancelarEdicao();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}

function salvarParcelas(qtdParcela) {
    for (let index = 0; index < qtdParcela; index++) {
        var parcela = "txtParcela" + (index + 1);
        // lsitaParcelas.push(parseInt(document.getElementById(parcela).value));
        document.getElementById("txtSalvaLista").value +=
            document.getElementById(parcela).value;
        if (index != qtdParcela - 1)
            document.getElementById("txtSalvaLista").value += ",";
    }
    // jsonString = JSON.stringify(lsitaParcelas);
}

function cadAltera(idFP, cadAltera) {
    document.getElementById("result").textContent = "Conectando ao servidor...";

    var numTabela = document.getElementById("txtNumParcelas").value;
    qtdParcelas = numTabela;
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtDescricaoFormaParcelamento").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a descrição da forma de parcelamento!!!";
    else if (
        document.getElementById("txtDescricaoFormaParcelamento").value.length >
        100
    )
        document.getElementById("result").textContent =
            "Favor, para o campo descrição da forma de pagamento máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtNumParcelas").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a quantidade de Parcelas!!!";
    else {
        // document.getElementById("result").textContent =
        // "Validacao concluida!!!";

        if (cadAltera == 1) {
            criaTabela(numTabela);
            preencheTabela(numTabela);
        }

        salvarParcelas(numTabela);

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/setformaparcelamento/" +
                idFP +
                "/" +
                cadAltera +
                "/" +
                numTabela +
                "/" +
                idEmpresa,
            data: image,
            dataType: "json",
            processData: false,
            contentType: false,
            // async: false,
            beforeSend: function () { },
            complete: function () { },
            success: function (data) {
                document.getElementById("result").textContent = data.msg;

                if (data.msg == "Cadastrado com SUCESSO!!!") {
                    carregaFormaParcelamento();
                    mostra_oculta();
                    document.getElementById("txtSalvaLista").value = "";
                    document.getElementById("txtSalvaListaIds").value = "";
                    idFPSalvo = data.idFP;
                    desabilitaQtdParcelas(true);
                } else if (data.msg == "Alterado com SUCESSO!!!") {
                    document.getElementById("txtSalvaLista").value = "";
                    //document.getElementById("txtSalvaListaIds").value = "";
                    //carregaFormaParcelamento();
                    //cancelarEdicao();
                } else {
                    cancelarEdicao();
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

function cadAlteraParcela(cadAltera) {
    document.getElementById("result").textContent = "Conectando ao servidor...";
    var numTabela = document.getElementById("txtNumParcelas").value;
    for (let index = 1; index <= qtdParcelas; index++) {
        if (document.getElementById("txtParcela" + index).value == "")
            document.getElementById("result").textContent =
                "Favor, informe corretamente os valores das parcelas!!!";
    }
    salvarParcelas(numTabela);
    var formulario = $("form")[0];
    var image = new FormData(formulario);

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data/",
        url: "/setparcelas/" + idFPSalvo + "/" + cadAltera,
        data: image,
        dataType: "json",
        processData: false,
        contentType: false,
        // async: false,
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaFormaParcelamento();
            mostra_oculta();
            cancelarEdicao();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}

function desabilitaQtdParcelas(desHab) {
    var input = document.querySelector("#txtNumParcelas");
    input.disabled = desHab;
}

function parcelasIguaisChecked() {
    const checkbox = document.getElementById("chcParcelasIguais");


    checkbox.addEventListener("change", (event) => {
        var numTabela = document.getElementById("txtNumParcelas").value;
        if (event.currentTarget.checked) {
            for (let index = 1; index <= numTabela; index++) {
                document.getElementById("txtParcela" + (index + 1)).value = document.getElementById("txtParcela" + 1).value * (index + 1);
            }
        }
    });

    checkbox.addEventListener("change", (event) => {
        var numTabela = document.getElementById("txtNumParcelas").value;
        if (event.currentTarget.checked) {
            txtParcela1.oninput = function () {
                for (let index = 1; index <= numTabela; index++) {
                    document.getElementById("txtParcela" + (index + 1)).value = document.getElementById("txtParcela" + 1).value * (index + 1);
                }
            };
        } else {
            txtParcela1.oninput = function () { };
        }
    });
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
