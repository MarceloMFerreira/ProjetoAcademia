@extends('layouts.main')
@section('content')

    <head>
        <script src="admin_assets/js/funcoes/clientefornecedor.js"></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf" crossorigin="anonymous">
        <title>Cadastrar Colaborador</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Cadastrar Colaborador</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
                        <br>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radio" id="pessoafis" value=1
                                        onclick="verificaPessoaFisJur()" checked>
                                    <label class="form-check-label" for="pessoafis">
                                        Pessoa Fisíca
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="radio" id="pessoajur" value=0
                                        onclick="verificaPessoaFisJur()">
                                    <label class="form-check-label" for="pessoajur">
                                        Pessoa Jurídica
                                    </label>
                                </div>

                                <div class="form-check form-check-inline" id="isPaciente">
                                    <input class="form-check-input" type="checkbox" id="chcPaciente" name="chcPaciente"
                                        onclick="verificaPaciente()">
                                    <label class="form-check-label" for="chcPaciente"> Paciente </label>
                                </div>
                            </div>
                        </div>
                        <fieldset>
                            <legend></legend>
                            <div class="row" style="display: none;">
                                <div class="col">
                                    <label for="image"> Imagem do Paciente/Cliente</label>
                                    <div id="editImagem"></div>
                                    <input type="file" id="image" name="image" accept=".jpeg,.jpg"
                                        class="form-control-file" onchange="mostrarImagem()">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col">
                                    <label for="txtNome">Nome:</label>
                                    <input type="text" class="form-control" id="txtNome" name="txtNome"
                                        placeholder="Informe o nome do cliente/Fornecedor">
                                </div>
                                <div class="col">
                                    <label for="txtNomeFantasia">Nome Fantasia:</label>
                                    <input type="text" class="form-control" id="txtNomeFantasia" name="txtNomeFantasia"
                                        placeholder="Informe o nome fantasia">
                                </div>
                            </div>
                            <br>

                            <div class="row">
                                <div class="col">
                                    <label for="txtCPF">CPF:</label>
                                    <input type="number" class="form-control" id="txtCPF" name="txtCPF"
                                        placeholder="Informe o CPF  (Apenas números)" oninput="confereCPF()">
                                    <div id="msgCPF" style="color: red;"></div>
                                </div>
                                <div class="col">
                                    <label for="txtCNPJ">CNPJ:</label>
                                    <input type="number" class="form-control" id="txtCNPJ" name="txtCNPJ"
                                        placeholder="Informe o CNPJ (Apenas números)" oninput="confereCNPJ()">
                                    <div id="msgCNPJ" style="color: red;"></div>
                                </div>
                            </div>
                            <fieldset id="fsDadosPaciente">
                                <div class="form-group">
                                    <br>
                                    <div class="row">
                                        <div class="col">
                                            <label>Queixa Principal:</label>
                                            <textarea type="text" class="form-control txtCadUmSo" id="txtQueixaPrincipal" name="txtQueixaPrincipal"
                                                placeholder="Informe a queixa do paciente"></textarea>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <br>
                                            <label for="txtCNPJ">Profissão:</label>
                                            <input type="text" class="form-control" id="txtProfissao"
                                                name="txtProfissao" placeholder="Informe a profissão do paciente">
                                        </div>
                                        <div class="col">
                                            <br>
                                            <label>Nascimento:</label>
                                            <input type="date" class="form-control" id="dtNasc" name="dtNasc">
                                        </div>
                                        <div class="col">
                                            <br>
                                            <label for="destroCanhoto">Lado Dominante:</label>
                                            <select id="destroCanhoto" name="destroCanhoto"
                                                class="form-select form-select-lg form-control">
                                                <option value="D">Destro</option>
                                                <option value="C">Canhoto</option>
                                                <option value="DC">Ambidestro</option>
                                            </select>
                                        </div>

                                        <div class="col">
                                            <br>
                                            <label for="sexo">Sexo:</label>
                                            <select id="sexo" name="sexo"
                                                class="form-select form-select-lg form-control">
                                                <option value="M">Masculino</option>
                                                <option value="F">Feminino</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                        </fieldset>

                        <fieldset>
                            <br>
                            <legend>Endereço</legend>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col">
                                        <label for="txtRua">Rua:</label>
                                        <input type="text" class="form-control" id="txtRua" name="txtRua"
                                            placeholder="Informe a rua">
                                    </div>
                                    <div class="col-4">
                                        <label for="txtBairro">Bairro:</label>
                                        <input type="text" class="form-control" id="txtBairro" name="txtBairro"
                                            placeholder="Informe o bairro">
                                    </div>

                                    <div class="col-2">
                                        <label for="txtNumero">Número:</label>
                                        <input type="text" class="form-control" id="txtNumero" name="txtNumero"
                                            placeholder="Informe o número">
                                    </div>
                                </div>
                                <br>

                                <div class="row">
                                    <div class="col-6">
                                        <label for="txtCidade">Cidade:</label>
                                        <input type="text" class="form-control" id="txtCidade" name="txtCidade"
                                            placeholder="Informe a cidade">
                                    </div>



                                    <div class="col-4">
                                        <label for="txtCEP">CEP:</label>
                                        <input type="text" class="form-control" id="txtCEP" name="txtCEP"
                                            placeholder="Informe o CEP">
                                    </div>

                                    <div class="col-2">
                                        <label for="estado">Estado:</label>
                                        <select id="estado" name="estado"
                                            class="form-select form-select-lg form-control">
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                            <option value="EX">Estrangeiro</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </fieldset>
                        <div id="botoes"></div>

                        <hr>
                        <fieldset id="fsContato">
                            <div class="container">
                                <form>
                                    <legend>Contato</legend>
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <label for="txtEmailTel">Email/Telefone:</label>
                                            <input type="number" class="form-control" id="txtEmailTel"
                                                name="txtEmailTel"
                                                placeholder="Informe o telefone (DDD + número)"
                                                oninput="desabilitarChcWPP()">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="chcWPP"
                                                    name="chcWPP">
                                                <label class="form-check-label" for="chcWPP"> Possui whatsapp </label>
                                                <div id="msgemail"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" value=1 name="radioEmail"
                                                    id="email" onclick="desabilitarChcWPP()">
                                                <label class="form-check-label" for="flexRadioDefault1"> E-mail </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" value=0 name="radioEmail"
                                                    id="tel" onclick="desabilitarChcWPP()" checked>
                                                <label class="form-check-label" for="flexRadioDefault2"> Telefone </label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <br>
                                            <a class="btn btn-success btn-lg btn-block" id="btnAdicionarContato"
                                                onclick="cadAlteraContato(0,1)" data-toggle="modal"
                                                data-target="#exampleModal">Adicionar </a>
                                        </div>
                                    </div>
                                </form>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col" class="text-center">#</th>
                                                <th scope="col" class="text-center">Contato</th>
                                                <th scope="col" class="text-center col-1">Conectar</th>
                                                <th scope="col" class="text-center col-1">Editar</th>
                                                <th scope="col" class="text-center col-1">Excluir</th>
                                            </tr>
                                        </thead>
                                        <tbody id="datagrid1">
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br>
                            <br>







                        </fieldset>
                    </form>
                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Lista de Colaboradores
                    </h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="inputFilter">Pesquisar:</label>
                                <input type="text" class="form-control" id="inputFilter"
                                    placeholder="Digite aqui para pesquisar...">
                            </div>
                        </div>

                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead class="thead-light">
                                <tr>
                                    <th style="display:none;">cod</th>
                                    <th>Nome</th>
                                    <th>CPF/CNPJ</th>
                                    <th class="text-center col-2" data-orderable="false">Ações</th>
                                </tr>
                            </thead>
                            <tbody id="datagrid">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    @endsection
