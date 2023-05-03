@extends('layouts.main')
@section('content')

    <head>
        <script src="admin_assets/js/funcoes/colaborador.js"></script>
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
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <label for="txtNome">Nome:</label>
                                <input type="text" class="form-control" id="txtNome" name="txtNome"
                                    placeholder="Informe o nome completo do colaborador">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <label for="txtEmail">E-mail:</label>
                                <input type="text" class="form-control" id="txtEmail" name="txtEmail"
                                    placeholder="Informe o e-mail (será usado para login no sistema)"
                                    oninput="verificaEmail()">
                                <div id="msgemail" style="color: red;"></div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <label for="txtSenha">Nova Senha:</label>
                                <input type="password" class="form-control" id="txtSenha" name="txtSenha"
                                    placeholder="Informe a senha para cadastro">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <label for="txtConfirmaSenha">Confirmar Senha:</label>
                                <input type="password" class="form-control" id="txtConfirmaSenha" name="txtConfirmaSenha"
                                    placeholder="Digite a senha novamente" oninput="verificaSenha()">
                                    <div id="msgsenha" style="color: red;"></div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <div id="botoes">

                                </div>
                            </div>
                        </div>
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
                                    <th>E-mail</th>
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
