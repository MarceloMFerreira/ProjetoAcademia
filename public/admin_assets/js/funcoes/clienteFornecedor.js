var json = [];
var jsonContato = [];
var idSelecionadaParaExcluir = 0;
var idEmpresa;
var idSalvo;
var idContato = 0;
var pilates;

window.onload = function () {
    document.getElementById("estado").value = "MG";
    carregaClientes();
    pessoaFisica();
    mostra_oculta_contato();
    mostra_oculta_paciente(false);
    habilitaDesabilitaBotoes(true, 0);
    if (pilates) {
        x = document.getElementById("isPaciente");
        x.style.display = "block";
    } else {
        x = document.getElementById("isPaciente");
        x.style.display = "none";
    }
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

function habilitaDesabilitaBotoesModalContato(apenasBotaoOk, index) {
    if (apenasBotaoOk == true) {
        buton =
            '<button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>';
    } else {
        buton =
            '<button type="button" class=" btn btn-success" onclick="excluirContato(\'' +
            index +
            "')\">Confirmar</a>";
        buton +=
            '  <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="">Cancelar</button>';
    }
    $("#botoesModal").html(buton);
}

function habilitaDesabilitaBotoes(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton =
            '<a class="btn btn-success uptadebtn mr-2" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAlteraClienteFornecedor(\'' +
            idAlterar +
            "','" +
            1 +
            "')\"><i class='fas fa-plus-circle'></i> Cadastrar</a>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a class="btn btn-primary uptadebtn mr-2" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAlteraClienteFornecedor(\'' +
            idAlterar +
            "','" +
            0 +
            "')\"><i class='fas fa-fw fa-pencil-alt'>&nbsp;</i> Alterar</a>";
        buton +=
            '  <a class="btn btn-secondary" onclick="cancelarEdicao()"><i class="fas fa-plus-circle"></i> Novo Cadastro</a>';
    }
    $("#botoes").html(buton);
}

function habilitaDesabilitaBotoesContato(cadastrar, idAlterar) {
    if (cadastrar == true) {
        buton =
            '<a class="btn btn-success uptadebtn mr-2" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAlteraClienteFornecedor(\'' +
            idAlterar +
            "','" +
            1 +
            "')\">Cadastrar</a>";
        //buton='<button class=" btn btn-success  btn-lg btn-block" data-toggle="modal" data-target="#exampleModal" onclick="chamaFuncaoPhp()">Cadastrar</button>';
    } else {
        buton =
            '<a class="btn btn-primary uptadebtn mr-2" id="botao" data-toggle="modal" data-target="#exampleModal" onclick="cadAlteraClienteFornecedor(\'' +
            idAlterar +
            "','" +
            0 +
            "')\">Alterar</a>";
        buton +=
            '<a class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick="preparaExclusaoContato(' +
            idAlterar +
            ')">Excluir</a>';
        buton +=
            '  <a class="btn btn-secondary" onclick="cancelarEdicao()">Novo Cadastro</a>';
    }
    $("#botoes").html(buton);
}
// --------------------------- CARREGA CLIENTE-FORNECEDOR/CONTATO -------------------------------
function carregaClientes() {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getclientes",
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            json = resultado.Cliente;
            idEmpresa = resultado.idEmpresa;
            pilates = resultado.boolPilates;

            json.forEach((value) => {
                rows +=
                "<tr>" +
                "<td style='display:none;'>" +
                value.INT_ID +
                "</td>" +
                "<td>" +
                value.TXT_NOME +
                "</td>" +
                "<td>" +
                value.TXT_CPF_CNPJ +
                "</td>" +
                "<td class='text-center d-flex align-items-end'>" +
                "<a title='Atualizar' class='btn btn-sm btn-success mr-2'" +
                "onclick=\"preencheCampos('" +
                value.TXT_NOME +
                "','" +
                value.BOOL_PF_PJ +
                "','" +
                value.TXT_NOME_FANTASIA +
                "','" +
                value.TXT_CPF_CNPJ +
                "','" +
                value.TXT_RUA +
                "','" +
                value.TXT_BAIRRO +
                "','" +
                value.TXT_CIDADE +
                "','" +
                value.TXT_NUMERO +
                "','" +
                value.TXT_UF +
                "','" +
                value.TXT_CEP +
                "','" +
                value.BOOL_PACIENTE +
                "','" +
                value.TXT_QUEIXA +
                "','" +
                value.DATE_NASCIMENTO +
                "','" +
                value.TXT_PROFISSAO +
                "','" +
                value.CHAR_DESTRO_CANHOTO +
                "','" +
                value.TXT_FOTO +
                "','" +
                value.CHAR_SEXO +
                "','" +
                value.INT_ID +
                "')\">" +
                "<i class='fas fa-edit'>&nbsp;</i> Editar</a>" +
                "<a title='Excluir' onclick=\"preparaExclusao(" +
                value.INT_ID +
                ')"' +
                "data-toggle='modal' data-target='#exampleModal'" +
                "class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'>&nbsp;</i>Excluir</a>" +
                "</td>" +
                "</tr>";



                rows +=
                    '<a class="dropdown-item" onclick="preencheCampos(\'' +
                    value.TXT_NOME +
                    "','" +
                    value.BOOL_PF_PJ +
                    "','" +
                    value.TXT_NOME_FANTASIA +
                    "','" +
                    value.TXT_CPF_CNPJ +
                    "','" +
                    value.TXT_RUA +
                    "','" +
                    value.TXT_BAIRRO +
                    "','" +
                    value.TXT_CIDADE +
                    "','" +
                    value.TXT_NUMERO +
                    "','" +
                    value.TXT_UF +
                    "','" +
                    value.TXT_CEP +
                    "','" +
                    value.BOOL_PACIENTE +
                    "','" +
                    value.TXT_QUEIXA +
                    "','" +
                    value.DATE_NASCIMENTO +
                    "','" +
                    value.TXT_PROFISSAO +
                    "','" +
                    value.CHAR_DESTRO_CANHOTO +
                    "','" +
                    value.TXT_FOTO +
                    "','" +
                    value.CHAR_SEXO +
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
function carregaContatos($id) {
    var rows = "";

    $.ajax({
        type: "GET",
        url: "/getcontatos/" + $id,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (resultado) {
            jsonContato = resultado.Contato;

            montaTabela();
            desabilitarChcWPP();

            $("#datagrid").html(rows);
            //habilitaDesabilitaBotoes(true, 0);
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Consultar!!!";
            alert(request.responseText);
        },
    });
}
// --------------------------- PESSOA FISICA/JURIDICA -------------------------------

function verificaPessoaFisJur() {
    var radio = document.getElementsByName("radio");

    var checkedButton = getCheckedRadio(radio);
    if (checkedButton.value == 1) {
        pessoaFisica();
        document.getElementById("botao").disabled = false;
    } else {
        pessoaJuridica();
        document.getElementById("botao").disabled = false;
    }
}

function pessoaFisica() {
    var txtNomeFantasia = document.querySelector("#txtNomeFantasia");
    var txtCNPJ = document.querySelector("#txtCNPJ");
    var txtCPF = document.querySelector("#txtCPF");
    var div = document.getElementById("msgCNPJ");
    var checkbox = document.getElementById("chcPaciente");

    txtNomeFantasia.disabled = true;
    txtCNPJ.disabled = true;
    txtCPF.disabled = false;
    checkbox.disabled = false;

    document.getElementById("txtNomeFantasia").value = "";
    document.getElementById("txtCNPJ").value = "";
    div.innerText = "";
}

function pessoaJuridica() {
    var txtCPF = document.querySelector("#txtCPF");
    var txtNomeFantasia = document.querySelector("#txtNomeFantasia");
    var txtCPF = document.querySelector("#txtCPF");
    var div = document.getElementById("msgCPF");
    var checkbox = document.getElementById("chcPaciente");

    txtCPF.disabled = true;
    txtNomeFantasia.disabled = false;
    txtCNPJ.disabled = false;
    checkbox.disabled = true;

    mostra_oculta_paciente(false);
    checkbox.checked = false;
    document.getElementById("txtCPF").value = "";
    div.innerText = "";

    document.getElementById("txtQueixaPrincipal").value = "";
    document.getElementById("txtProfissao").value = "";
    document.getElementById("dtNasc").value = "";
    document.getElementById("destroCanhoto").value = "D";
    document.getElementById("sexo").value = "M";
    checkbox.checked = false;
}

function getCheckedRadio(radio_group) {
    for (var i = 0; i < radio_group.length; i++) {
        var button = radio_group[i];
        if (button.checked) {
            return button;
        }
    }
    return undefined;
}

// --------------------------- VERIFICA CPF/CNPJ -------------------------------

function TestaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
        cpf.length != 11 ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    )
        return false;
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
}

function confereCPF() {
    var div = document.getElementById("msgCPF");
    if (TestaCPF(document.getElementById("txtCPF").value) == false) {
        document.getElementById("botao").disabled = true;
        div.innerText = "CPF inválido!";
    } else {
        document.getElementById("botao").disabled = false;
        div.innerText = "";
    }
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
    )
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
}

function confereCNPJ() {
    var div = document.getElementById("msgCNPJ");
    if (validarCNPJ(document.getElementById("txtCNPJ").value) == false) {
        div.innerText = "CNPJ inválido!";
        document.getElementById("botao").disabled = true;
    } else {
        document.getElementById("botao").disabled = false;
        div.innerText = "";
    }
}

// --------------------------- VERIFICA CONTATO -------------------------------
function desabilitarChcWPP() {
    var radio = document.getElementsByName("radioEmail");
    var div = document.getElementById("msgemail");

    var checkedButton = getCheckedRadio(radio);
    if (checkedButton.value == 1) {
        document.getElementById("chcWPP").disabled = true;
        document.getElementById("chcWPP").checked = false;
        document.getElementById("txtEmailTel").placeholder = "Informe o E-mail";
        document.getElementById("txtEmailTel").type = "text";
        verificaEmail();
    } else {
        document.getElementById("chcWPP").disabled = false;
        document.getElementById("txtEmailTel").placeholder =
            "Informe o telefone (DDD + número)";
        document.getElementById("txtEmailTel").type = "number";
        document.getElementById("btnAdicionarContato").disabled = false;
        div.innerText = "";
    }
}

function mostra_oculta_contato() {
    x = document.getElementById("fsContato");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function validacaoEmail(field) {
    var div = document.getElementById("msgemail");

    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(
        field.value.indexOf("@") + 1,
        field.value.length
    );

    if (usuario.length == 0 && dominio.length == 0) {
        div.innerText = "";
        document.getElementById("btnAdicionarContato").disabled = false;
    } else if (
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
        document.getElementById("btnAdicionarContato").disabled = false;
    } else {
        div.innerText = "E-mail inválido";
        document.getElementById("btnAdicionarContato").disabled = true;
    }
}

function verificaEmail() {
    document.getElementById(validacaoEmail(txtEmailTel));
}

// --------------------------- VERIFICA PACIENTE -------------------------------
function mostra_oculta_paciente(paciente) {
    x = document.getElementById("fsDadosPaciente");
    if (paciente) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function verificaPaciente() {
    checkbox = document.getElementById("chcPaciente");
    if (checkbox.checked) {
        mostra_oculta_paciente(true);
    } else {
        mostra_oculta_paciente(false);
        document.getElementById("txtQueixaPrincipal").value = "";
        document.getElementById("txtProfissao").value = "";
        document.getElementById("dtNasc").value = "";
        document.getElementById("destroCanhoto").value = "D";
        document.getElementById("sexo").value = "M";
        checkbox.checked = false;
    }
}

// ---------------------------  EDIÇÃO -------------------------------
function preencheCampos(
    TXT_NOME,
    BOOL_PF_PJ,
    TXT_NOME_FANTASIA,
    TXT_CPF_CNPJ,
    TXT_RUA,
    TXT_BAIRRO,
    TXT_CIDADE,
    TXT_NUMERO,
    TXT_UF,
    TXT_CEP,
    BOOL_PACIENTE,
    TXT_QUEIXA,
    DATE_NASCIMENTO,
    TXT_PROFISSAO,
    CHAR_DESTRO_CANHOTO,
    TXT_FOTO,
    CHAR_SEXO,
    id
) {
    // x = document.getElementById("dropdownMenuLink");
    // x.style.display = "none";
    checkbox = document.getElementById("chcPaciente");

    if (BOOL_PF_PJ == 1) {
        document.getElementById("pessoafis").checked = true;
        document.getElementById("txtCPF").value = TXT_CPF_CNPJ;
    } else {
        document.getElementById("pessoajur").checked = true;
        document.getElementById("txtCNPJ").value = TXT_CPF_CNPJ;
    }

    verificaPessoaFisJur();

    document.getElementById("txtNome").value = TXT_NOME;
    document.getElementById("txtNomeFantasia").value = TXT_NOME_FANTASIA;
    document.getElementById("txtRua").value = TXT_RUA;
    document.getElementById("txtBairro").value = TXT_BAIRRO;
    document.getElementById("txtCidade").value = TXT_CIDADE;
    document.getElementById("txtNumero").value = TXT_NUMERO;
    document.getElementById("estado").value = TXT_UF;
    document.getElementById("txtCEP").value = TXT_CEP;

    if (BOOL_PACIENTE == 1) {
        mostra_oculta_paciente(true);
        document.getElementById("txtQueixaPrincipal").value = TXT_QUEIXA;
        document.getElementById("txtProfissao").value = TXT_PROFISSAO;
        document.getElementById("dtNasc").value = DATE_NASCIMENTO;
        document.getElementById("destroCanhoto").value = CHAR_DESTRO_CANHOTO;
        document.getElementById("sexo").value = CHAR_SEXO;
        checkbox.checked = true;
    } else {
        mostra_oculta_paciente(false);
    }

    mostra_oculta_contato();
    carregaContatos(id);

    idSalvo = id;

    if (TXT_FOTO != "null") {
        document.getElementsByName("image").value = "uploads/img/" + TXT_FOTO;

        editarImg =
            "<img src='uploads/img/" +
            TXT_FOTO +
            "' style='height: 122px;'></img>";
        $("#editImagem").html(editarImg);
    }

    habilitaDesabilitaBotoes(false, id);
}

function mostrarImagem() {
    var file = document.getElementById("image").files[0];
    if (file) {
        editarImg = "";
        $("#editImagem").html(editarImg);
    }
}

function montaTabela() {
    var tbrows = "";
    var wpp = "";

    if (jsonContato.length > 0) {
        for (let index = 0; index < jsonContato.length; index++) {
            wpp = "";
            if (jsonContato[index].BOOL_EMAIL_TELEFONE == 1) {
                wpp =
                    "<a target='_blank' rel='noopener noreferrer' href='mailto:" +
                    jsonContato[index].TXT_CONTATO +
                    "'>" +
                    "<img src='admin_assets/img/e-mail.png' width='20'>" +
                    "</a>";
            } else if (jsonContato[index].BOOL_WPP == 1) {
                wpp =
                    "<a target='_blank' rel='noopener noreferrer' href='tel:+55" +
                    jsonContato[index].TXT_CONTATO +
                    "'>" +
                    "<img src='admin_assets/img/telefone.png' width='20'>" +
                    "</a>" +
                    "<a class='ml-2' target='_blank' rel='noopener noreferrer' href='https://api.whatsapp.com/send?l=pt&phone=55" +
                    jsonContato[index].TXT_CONTATO +
                    "'>" +
                    "<img src='admin_assets/img/whatsapp.png' width='20'>" +
                    "</a>";
            } else {
                wpp =
                    "<a target='_blank' rel='noopener noreferrer' href='tel:+55" +
                    jsonContato[index].TXT_CONTATO +
                    "'>" +
                    "<img src='admin_assets/img/telefone.png' width='20'>" +
                    "</a>";
            }

            tbrows +=
                "<tr>" +
                "<th class = 'text-center' scope='row'>" +
                (index + 1) +
                "</th>" +
                "<td class = 'text-center'>" +
                jsonContato[index].TXT_CONTATO +
                "</td>" +
                "<td class = 'text-center'>" +
                wpp +
                "</td>" +
                "<td class = 'text-center'>" +
                '<button type="button" class="btn btn-success" onclick="editaContato(\'' +
                index +
                "')\"> Editar</button>" +
                "</td>" +
                "<td class = 'text-center'>" +
                '<button data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-danger" onclick="preparaExclusaoContato(\'' +
                index +
                "')\"> Excluir</button>" +
                "</td>" +
                "</tr>";
        }
    }

    $("#datagrid1").html(tbrows);
}

function cancelarEdicao() {
    var div = document.getElementById("msgemail");
    var tbrows = "";
    var div2 = document.getElementById("msgCNPJ");
    var div3 = document.getElementById("msgCPF");
    var checkbox = document.getElementById("chcPaciente");

    div.innerText = "";
    div2.innerText = "";
    div3.innerText = "";

    document.getElementById("txtEmailTel").value = "";
    document.getElementById("chcWPP").checked = false;
    $("#datagrid1").html(tbrows);
    mostra_oculta_contato();
    carregaClientes();

    document.getElementById("txtNome").value = "";
    document.getElementById("txtNomeFantasia").value = "";
    document.getElementById("txtCPF").value = "";
    document.getElementById("txtCNPJ").value = "";
    document.getElementById("txtRua").value = "";
    document.getElementById("txtBairro").value = "";
    document.getElementById("txtNumero").value = "";
    document.getElementById("txtCidade").value = "";
    document.getElementById("txtCEP").value = "";
    document.getElementById("estado").value = "MG";

    mostra_oculta_paciente(false);
    document.getElementById("txtQueixaPrincipal").value = "";
    document.getElementById("txtProfissao").value = "";
    document.getElementById("dtNasc").value = "";
    document.getElementById("destroCanhoto").value = "D";
    document.getElementById("sexo").value = "M";
    checkbox.checked = false;

    document.getElementById("pessoafis").checked = true;
    pessoaFisica();
    idSalvo = 0;

    habilitaDesabilitaBotoes(true, 0);
    document.getElementById("botao").disabled = false;

    x = document.getElementById("dropdownMenuLink");
    x.style.display = "block";

    document.getElementById("estado").value = "MG";

    document.getElementsByName("image").value = "";
    document.getElementById("image").value = "";
    editarImg = "";
    $("#editImagem").html(editarImg);

    idContato = 0;
}
// --------------------------- CADASTRA ALTERA CLIENTE/FORNECEDOR -------------------------------
function cadAlteraClienteFornecedor(id, cadAltera) {
    var radio = document.getElementsByName("radio");
    var checkedButton = getCheckedRadio(radio);
    var checkbox = document.getElementById("chcPaciente");
    habilitaDesabilitaBotoesModal(true);

    if (document.getElementById("txtNome").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o nome do cliente!!!";
    else if (document.getElementById("txtNome").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Nome do cliente máximo de 100 caracteres permitidos!!!";
    else if (
        checkedButton.value != 1 &&
        document.getElementById("txtNomeFantasia").value == ""
    )
        document.getElementById("result").textContent =
            "Favor, informe o nome fantasia do cliente!!!";
    else if (document.getElementById("txtNomeFantasia").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Nome Fantasia do cliente máximo de 100 caracteres permitidos!!!";
    else if (
        checkedButton.value == 1 &&
        document.getElementById("txtCPF").value == ""
    )
        document.getElementById("result").textContent =
            "Favor, informe o CPF do cliente!!!";
    else if (
        checkedButton.value != 1 &&
        document.getElementById("txtCNPJ").value == ""
    )
        document.getElementById("result").textContent =
            "Favor, informe o CNPJ do cliente!!!";
    else if (document.getElementById("txtRua").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a rua!!!";
    else if (document.getElementById("txtRua").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Rua máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtBairro").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o bairro!!!";
    else if (document.getElementById("txtBairro").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Bairro máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtNumero").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o numero em Endereço!!!";
    else if (document.getElementById("txtNumero").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo numero em Endereço máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtCidade").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a Cidade!!!";
    else if (document.getElementById("txtCidade").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo Ciade máximo de 100 caracteres permitidos!!!";
    else if (document.getElementById("txtCEP").value == "")
        document.getElementById("result").textContent =
            "Favor, informe o CEP!!!";
    else if (document.getElementById("txtCEP").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo CEP máximo de 45 caracteres permitidos!!!";
    else if (
        checkbox.checke &&
        document.getElementById("txtQueixaPrincipal").value == ""
    )
        document.getElementById("result").textContent =
            "Favor, informe a queixa principal do paciente!!!";
    else if (
        checkbox.checke &&
        document.getElementById("txtQueixaPrincipal").value.length > 1000
    )
        document.getElementById("result").textContent =
            "Favor, para o campo Queixa Principal máximo de 1000 caracteres permitidos!!!";
    else if (
        checkbox.checke &&
        document.getElementById("txtProfissao").value == ""
    )
        document.getElementById("result").textContent =
            "Favor, informe a profissão do paciente!!!";
    else if (
        checkbox.checke &&
        document.getElementById("txtProfissao").value.length > 200
    )
        document.getElementById("result").textContent =
            "Favor, para o campo profissão máximo de 200 caracteres permitidos!!!";
    else if (checkbox.checke && document.getElementById("dtNasc").value == "")
        document.getElementById("result").textContent =
            "Favor, informe a data de nacimento do paciente!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url:
                "/setclientefornecedor/" +
                id +
                "/" +
                cadAltera +
                "/" +
                idEmpresa,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                if (data.msg == "Cadastrado com SUCESSO!!!") {
                    carregaClientes();
                    mostra_oculta_contato();
                    habilitaDesabilitaBotoes(false, 0);
                    idSalvo = data.idSalvo;
                } else if (data.msg == "Alterado com SUCESSO!!!") {
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

// --------------------------- EXCLUSÃO  CLIENTE/FORNECEDOR -------------------------------
function preparaExclusao(id) {
    idSelecionadaParaExcluir = id;
    habilitaDesabilitaBotoesModal(false);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir este cliente?";
}

function cancelarExclusao() {
    idSelecionadaParaExcluir = 0;
    idContato = 0;
}

function excluir() {
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delclientefornecedor/" + idSelecionadaParaExcluir,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaClientes();
            cancelarEdicao();
        },
        error: function (request, status, error) {
            document.getElementById("result").textContent =
                "Erro ao Cadastrar!!!";
            alert(request.responseText);
        },
    });
}
// --------------------------- CADASTRA ALTERA CONTATO -------------------------------
function cadAlteraContato(_idContato, cadAltera) {
    habilitaDesabilitaBotoesModal(true);
    if (document.getElementById("txtEmailTel").value == "")
        document.getElementById("result").textContent =
            "Favor, informe uma informação de contato!!!";
    else if (document.getElementById("txtEmailTel").value.length > 100)
        document.getElementById("result").textContent =
            "Favor, para o campo de contato máximo de 100 caracteres permitidos!!!";
    else {
        document.getElementById("result").textContent =
            "Validacao concluida!!!";

        if (idContato > 0) {
            _idContato = idContato;
            cadAltera = 0;
        }

        var formulario = $("form")[0];
        var image = new FormData(formulario);

        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "/setcontato/" + _idContato + "/" + cadAltera + "/" + idSalvo,
            data: image,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {},
            complete: function () {},
            success: function (data) {
                document.getElementById("result").textContent = data.msg;
                carregaContatos(idSalvo);
                montaTabela();
                document.getElementById("txtEmailTel").value = "";
                document.getElementById("chcWPP").checked = false;
                idContato = 0;
                document.getElementById("btnAdicionarContato").textContent =
                    "Adicionar";
            },
            error: function (request, status, error) {
                document.getElementById("result").textContent =
                    "Erro ao Cadastrar!!!";
                alert(request.responseText);
            },
        });
    }
}

function editaContato(index) {
    idContato = jsonContato[index].INT_ID;

    document.getElementById("btnAdicionarContato").textContent = "Alterar";

    if (jsonContato[index].BOOL_EMAIL_TELEFONE == 1) {
        document.getElementById("email").checked = true;
        document.getElementById("tel").checked = false;
        desabilitarChcWPP();
    } else {
        document.getElementById("email").checked = false;
        document.getElementById("tel").checked = true;
        desabilitarChcWPP();
    }

    if (jsonContato[index].BOOL_WPP == 1)
        document.getElementById("chcWPP").checked = true;
    else document.getElementById("chcWPP").checked = false;

    document.getElementById("txtEmailTel").value =
        jsonContato[index].TXT_CONTATO;
}
// --------------------------- EXLCUI CONTATO -------------------------------
function preparaExclusaoContato(index) {
    idContato = jsonContato[index].INT_ID;
    habilitaDesabilitaBotoesModalContato(false, index);
    document.getElementById("result").textContent =
        "Deseja REALMENTE excluir este contato?";
}

function excluirContato(index) {
    idContato = jsonContato[index].INT_ID;
    habilitaDesabilitaBotoesModal(true);
    document.getElementById("result").textContent = "Preparando exclusão!!!";
    $.ajax({
        type: "GET",
        url: "/delcontato/" + idContato,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            document.getElementById("result").textContent = data.msg;
            carregaContatos(idSalvo);
            montaTabela();
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
// --------------------------- BUSCA DROPDOWN MENU -------------------------------
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("datagrid");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
