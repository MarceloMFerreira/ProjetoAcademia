@extends('layouts.main')
@section('content')

    <head>
        <script src={{ asset('admin_assets/js/funcoes/relatorioTreinos.js') }}></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href={{ asset('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css') }}
            integrity={{ asset('sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf') }}
            crossorigin="anonymous">
        <title>Relatório de Treinos</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Relatório de Treinos</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
    
                        <div class="row">
                            <div class="col-md-6">
                                <label for="pacienteselect">Paciente:</label>
                                <select class="form-control selectpicker" id="pacienteselect" data-live-search="true"></select>
                            </div>
                            <div class="col-md-6">
                                <label for="colaborador">Colaborador:</label>
                                <select class="form-control selectpicker" id="colaborador" data-live-search="true"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <br>
                                <label for="dtIncio">Inicio:</label>
                                <input type="date" class="form-control" id="dtIncio" name="dtIncio">
                            </div>
                            <div class="col">
                                <br>
                                <label for="dtFinal">Final:</label>
                                <input type="date" class="form-control" id="dtFinal" name="dtFinal">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <br>
                                <a class=" btn btn-success btn-block" id="btnAdicionarContato"
                                    onclick="montaTabela()">Filtrar</a> <br>
                            </div>
                        </div>
                    </form>
    
                    <div>
                        <div class="row" id="datagrid"> </div>
                    </div>
    
                  
                </div>
            </div>
            
        @endsection
