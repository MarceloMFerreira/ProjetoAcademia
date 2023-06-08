@extends('layouts.main')
@section('content')

    <head>
        <script src="admin_assets/js/funcoes/avaliacao.js"></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf" crossorigin="anonymous">
        <title>Avaliação Física</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Avaliação Física</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
                        <br>
                        <div class="row">
                            <div class="col">
                                <label>Selecione o paciente:</label><br>
                                <select class="form-control" id="pacienteselect">
                                </select>
                                <div id="editImagem"></div>
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <label for="txtAltura">Peso:</label>
                                <input type="number" class="form-control" id="txtPeso" name="txtPeso"
                                    placeholder="Informe o peso do paciente">
                            </div>
                            <div class="col">
                                <label for="txtAltura">Altura:</label>
                                <input type="number" class="form-control" id="txtAltura" name="txtAltura"
                                    placeholder="Informe a altura do paciente">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label>Data:</label>
                                <input type="date" class="form-control" id="dtNasc" name="dtNasc">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <label>Queixas:</label>
                                <textarea type="text" class="form-control" id="txtQueixa" name="txtQueixa"
                                    placeholder="Informe a queixa do paciente"></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <div id="botoes"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Avaliações Anteriores
                    </h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">

                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead class="thead-light">
                                <tr>
                                    <th style="display:none;">cod</th>
                                    <th class="text-center col-1">Data</th>
                                    <th class="text-center col-1">Peso</th>
                                    <th class="text-center col-1">Altura</th>
                                    <th>Queixas</th>
                                    <th class="text-center col-2" data-orderable="false">Ações</th>
                                </tr>
                            </thead>
                            <tbody id="datagrid1">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        @endsection
