@extends('layouts.main')
@section('content')

    <head>
        <script src="admin_assets/js/funcoes/agenda.js"></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf" crossorigin="anonymous">
        <title>Cadastrar Agendamento</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Agendar Treinos</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
                        <div class="row">
                            <div class="col">
                                <label>Buscar paciente:</label><br>
                                <select class="form-control" id="pacienteselect">
                                </select>
                                {{-- <div id="editImagem"></div> --}}
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <input type="hidden" class="form-control" id="nomePaciente" name="nomePaciente"
                                    placeholder="SELECIONE UM PACIENTE!!!" disabled="true">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label>Inicio:</label>
                                <input type="time" class="form-control" id="inicioTreino" name="inicioTreino">
                            </div>
                            <div class="col">
                                <label>Final:</label>
                                <input type="time" class="form-control" id="finalTreino" name="finalTreino">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col">
                                <label>Dias da semana:</label><br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="segunda" name="diasSemana[]" value="segunda">
                                    <label class="form-check-label" for="segunda">Segunda-feira</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="terca" name="diasSemana[]" value="terca">
                                    <label class="form-check-label" for="terca">Terça-feira</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="quarta" name="diasSemana[]" value="quarta">
                                    <label class="form-check-label" for="quarta">Quarta-feira</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="quinta" name="diasSemana[]" value="quinta">
                                    <label class="form-check-label" for="quinta">Quinta-feira</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="sexta" name="diasSemana[]" value="sexta">
                                    <label class="form-check-label" for="sexta">Sexta-feira</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="sabado" name="diasSemana[]" value="sabado">
                                    <label class="form-check-label" for="sabado">Sábado</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="domingo" name="diasSemana[]" value="domingo">
                                    <label class="form-check-label" for="domingo">Domingo</label>
                                </div>
                            </div>
                        </div>
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
                    <h6 class="m-0 font-weight-bold text-primary">Agendamento</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="row">
                            <div class="col-5">
                                <input type="date" class="form-control" id="dtFiltro" name="dtFiltro">
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-success" data-dismiss="modal"
                                    onclick="montaTabela()">Filtrar</button>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="filtroTreino" id="emAberto"
                                        value="emAberto" onclick="montaTabela()" checked>
                                    <label class="form-check-label" for="emAberto">
                                        Em Aberto
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="filtroTreino" id="iniciados"
                                        value="iniciados" onclick="montaTabela()">
                                    <label class="form-check-label" for="iniciados">
                                        Iniciados
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="filtroTreino" id="todos"
                                        value="todos" onclick="montaTabela()">
                                    <label class="form-check-label" for="todos">
                                        Todos
                                    </label>
                                </div>
                            </div>
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead class="thead-light">
                                    <tr>
                                        <th style="display:none;">cod</th>
                                        <th class="text-center col-2">Horário</th>
                                        <th>Paciente</th>
                                        <th class="text-center col-4" data-orderable="false">Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="datagrid1">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        @endsection
