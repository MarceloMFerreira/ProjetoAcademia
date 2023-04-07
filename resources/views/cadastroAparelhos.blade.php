@extends('layouts.main')
@section('content')

    <head>
        <script src="admin_assets/js/funcoes/aparelho.js"></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf" crossorigin="anonymous">
        <title>Cadastrar Aparelho</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Cadastrar Aparelho</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <label for="txtDescricao">Descrição:</label>
                                <input type="text" class="form-control" id="txtDescricaoAparelho" name="txtDescricaoAparelho"
                                    placeholder="Informe a descrição do aparelho">
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
                    <h6 class="m-0 font-weight-bold text-primary">Lista de Aparelhos</h6>
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
                                    <th>Descrição</th>
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
