@extends('layouts.main')
@section('content')

    <head>
        <script src={{ asset('admin_assets/js/funcoes/treino.js') }}></script>
    </head>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Adiciona o Bootstrap -->
        <link rel="stylesheet" href={{ asset('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css') }}
            integrity={{ asset('sha384-OgVRvuATP1z7JjHLkuOU6Xw704+hkHcMOeclPZf3m6z1LqGKP5AZgJwVRMIj7xSf') }}
            crossorigin="anonymous">
        <title>Registrar Treinos</title>
    </head>

    <body>

        <div class="container-fluid">

            <div class="card shadow mb-2">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h6 class="m-0 font-weight-bold text-primary">Registrar Treinos</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        @csrf
                        <div class="row">
                            <div class="col">
                                <input type="hidden" class="form-control" id="idPacienteSemAgenda"
                                    name="idPacienteSemAgenda" value={{ $valor }}>
                            </div>
                            <div class="col">
                                <input type="hidden" class="form-control" id="idAgendamento" name="idAgendamento"
                                    value={{ $idAgendamento }}>
                            </div>
                        </div>
                        <div class="row" id="inicio01">
                            <div class="col invisible d-none">
                                <label for="pacientes">Pacientes:</label>
                                <select id="pacientes" name="pacientes" class="form-select form-select-lg pb-3">
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label>Paciente Selecionado:</label>
                                <input type="text" class="form-control" id="nomePaciente" name="nomePaciente"
                                    placeholder="SELECIONE UM PACIENTE!!!" disabled="true">
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <label>Observações sobre paciente:</label>
                                <textarea type="text" class="form-control" id="obsPaciente" name="obsPaciente"
                                    placeholder="Observações sobre paciente"></textarea>
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <label>Inicio:</label>
                                <input type="datetime-local" class="form-control" id="inicioTreino" name="inicioTreino"
                                    value={{ $inicio }}>
                            </div>
                            <div class="col">
                                <label>Final:</label>
                                <input type="datetime-local" class="form-control" id="finalTreino" name="finalTreino"
                                    value={{ $final }}>
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <label>Nível de dor ao chegar:</label>
                                <input type="number" class="form-control" id="dorAoChegar" name="dorAoChegar"
                                    placeholder="Nível de dor de 0 a 10" min="0" max="10">

                                <script>
                                    const input = document.getElementById("dorAoChegar");

                                    input.addEventListener("input", function() {
                                        const value = parseInt(this.value, 10);
                                        if (value < this.min) {
                                            this.value = this.min;
                                        } else if (value > this.max) {
                                            this.value = this.max;
                                        }
                                    });
                                </script>
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <label>Observações da dor ao chegar:</label>
                                <textarea type="text" class="form-control" id="obsDorAoChegar" name="obsDorAoChegar"
                                    placeholder="Observações da dor ao chegar"></textarea>
                            </div>
                        </div><br>
                        <div class="row">
                            <div class="col">
                                <a class=" btn btn-success  btn-lg btn-block" id="iniciartreino" data-toggle="modal"
                                    data-target="#exampleModal" onclick="cadastraInicio()">Iniciar treino</a><br>
                            </div>
                        </div>
                        <fieldset id="fsAddAparelho">{{-- ADICIONAR APARELHO --}}
                            <legend>Montar Treino</legend>
                            <div class="row">
                                <div class="col">
                                    <label for="aparelho">Aparelho:</label>
                                    <select id="aparelho" name="aparelho" class="form-control">
                                    </select>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col" class="text-center col-1">#</th>
                                                <th scope="col" class="text-center">Tipos de Treino</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tabelaTipoTreino">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label>Observações sobre o aparelho:</label>
                                    <textarea type="text" class="form-control" id="obsAparelho" name="obsAparelho"
                                        placeholder="Observações sobre o aparelho"></textarea>
                                    <input type="hidden" class="form-control" id="txtidsTipoTreino"
                                        name="txtidsTipoTreino"
                                        placeholder="Informe a descrição da forma de parcelamento">
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col">
                                    <a class=" btn btn-info  btn-lg btn-block" id="addAparelho" data-toggle="modal"
                                        data-target="#exampleModal" onclick="cadastraAparelho()">Adicionar
                                        Aparelho</a><br>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset id="fsAddAcessorio"> {{-- ADICIONAR ACESSÓRIO --}}

                            <div class="row">
                                <div class="col">
                                    <label for="acessorio">Acessório:</label>
                                    <select id="acessorio" name="acessorio" class="form-control">
                                    </select>
                                </div>
                                <div class="col">
                                    <label>Observações sobre o acessório:</label>
                                    <textarea type="text" class="form-control" id="obsCessorio" name="obsCessorio"
                                        placeholder="Observações sobre o Acessório"></textarea>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col">
                                    <a class=" btn btn-info  btn-lg btn-block" id="addAcessorio" data-toggle="modal"
                                        data-target="#exampleModal" onclick="cadastraAcessorio()">Adicionar
                                        Acessório</a><br>
                                </div>
                                <div class="col">
                                    <a class=" btn btn-primary  btn-lg btn-block" id="addAcessorio"
                                        onclick="limpaCamposAparelho()"> Novo Aparelho </a><br>
                                </div>
                            </div>
                            <legend>Acessórios Cadastrados</legend>
                            <div class="row">
                                <div class="col">
                                    <div id="dgvAcessorios">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div id="tabelaAparelhos">
                            <legend>Aparelhos Cadastrados</legend>
                            <div class="row">
                                <div class="col">
                                    <div id="dgvAparelhos">
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a class=" btn btn-success  btn-lg btn-block" id="finalizarAparelhoAcessorio"
                                        data-toggle="modal" data-target="#exampleModal"
                                        onclick="configExpandeFinalTreino()">Finalizar
                                        Treino</a><br>
                                </div>
                            </div>
                        </div>
                        <fieldset id="fsFinalTreino"> {{-- FINAL DO TREINO --}}
                            <legend>Finalizar Treino</legend>
                            <div class="row">
                                <div class="col">
                                    <label>Nível de dor ao sair:</label>
                                    <input type="number" class="form-control" id="dorAoSair" name="dorAoSair"
                                        placeholder="Nível de dor de 0 a 10" min="0" max="10">

                                    <script>
                                        const inputField = document.getElementById("dorAoSair");

                                        inputField.addEventListener("input", function() {
                                            const value = parseInt(this.value, 10);
                                            if (value < this.min) {
                                                this.value = this.min;
                                            } else if (value > this.max) {
                                                this.value = this.max;
                                            }
                                        });
                                    </script>

                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col">
                                    <label>Observações da dor ao sair:</label>
                                    <textarea type="text" class="form-control" id="obsDorAoSair" name="obsDorAoSair"
                                        placeholder="Observações da dor ao sair"></textarea>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col">
                                    <label>Observações gerais:</label>
                                    <textarea type="text" class="form-control" id="obsGerais" name="obsGerais" placeholder="Observações gerais"></textarea>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a class=" btn btn-success  btn-lg btn-block" id="finalizarTreino"
                                        data-toggle="modal" data-target="#exampleModal"
                                        onclick="cadastraFinal()">Confirmar Fim do
                                        Treino</a><br>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Consultar Treinos anteriores</h6>
                </div>
                <div class="card-body">
                    <fieldset id="treinoAnteriorMostrar">
                        <div class="row">
                            <div class="col">
                                <table class="table table-bordered">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col" class="text-center col-2">Aparelho</th>
                                            <th scope="col" class="text-center col-2">Observações</th>
                                            <th scope="col" class="text-center col-2">Tipo de Treino</th>
                                            <th scope="col" class="text-center">Acessórios</th>
                                        </tr>
                                    </thead>
                                    <tbody id="dgvExpandetreinoAnterior">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <a class="btn btn-light btn-lg btn-block" id="ocultarTreinoAnterior" onclick="configExpandeTreinoAnterior(1)">Ocultar</a><br>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row">
                            <div class="col-5">
                                <input type="date" class="form-control" id="dtFiltro" name="dtFiltro">
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-success" data-dismiss="modal" onclick="montaTabelaTreinosAnteriores()">Filtrar</button>
                            </div>
                        </div>
                        <br>
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead class="thead-light">
                                    <tr>
                                        <th style="display:none;">cod</th>
                                        <th class="text-center col-2">Data</th>
                                        <th class="text-center col-1">Dor ao Chegar</th>
                                        <th class="text-center col-1">Dor ao Sair</th>
                                        <th>Observações</th>
                                        <th class="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="dgvTreinosAnteriores">
                                </tbody>
                            </table>
                        </div>
                        <fieldset id="treinoAnteriorMostrar">
                            <legend>Visualização Treino Anterior</legend>
                            <div class="row">
                                <div class="col">
                                    <div id="dgvExpandetreinoAnterior">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a class="btn btn-light btn-lg btn-block" id="ocultarTreinoAnterior" onclick="configExpandeTreinoAnterior(1)">Ocultar</a><br>
                                </div>
                            </div>
                        </fieldset>
                    </fieldset>
                </div>
            </div>
            
        @endsection
