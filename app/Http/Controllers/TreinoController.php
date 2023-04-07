<?php

namespace App\Http\Controllers;

use App\Models\Acessorio;
use App\Models\Agenda;
use App\Models\Aparelho;
use App\Models\ClienteFornecedor;
use App\Models\Colaborador;
use Illuminate\Http\Request;
use App\Models\Treino;
use App\Models\Empresa;
use App\Models\TipoTreino;
use App\Models\TreinoAparelho;
use App\Models\TreinoAparelhoAcessorio;
use App\Models\TreinoAparelhoTipoTreino;
use Psy\CodeCleaner\AssignThisVariablePass;

class TreinoController extends Controller
{
    //-------------- Abre treino pela agenda//configura id inicial -------------------------
    public function novaView($valor, $idAgendamento, $inicio, $final)
    {
        return view('cadastroTreino', ['valor' =>  $valor, 'idAgendamento' => $idAgendamento, 'inicio' => $inicio, 'final' => $final]);
    }

    public function configInicialSemAgendamento($idPaciente)
    {
        $paciente = ClienteFornecedor::where([['INT_ID', '=', $idPaciente]])->first();
        return (['paciente' => $paciente]);
    }

    //-------------- Preenche campos -------------------------
    public static function preencheCampos($idEmpresa, $idUsuario)
    {
        //$treino = Treino::with('treino_aparelho')->with('treino_aparelho_acessorio')->where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID_PACIENTE', '=', $idPaciente], ['INT_SAIU_COM_DOR', '!=', null]])->orderBy('DATE_INICIO')->get();
        $aparelhos = Aparelho::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_DESCRICAO')->get();
        $tipoTreino = TipoTreino::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_DESCRICAO')->get();
        $acessorios = Acessorio::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $idEmpresa]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['idEmpresa' => $idEmpresa, 'boolPilates' => $pilates, 'idUsuario' => $idUsuario, 'aparelhos' => $aparelhos, 'tiposTreino' => $tipoTreino, 'acessorios' => $acessorios]);
    }

    //-------------- Carrega Treinos -------------------------
    public function getTreinoEmAndamento($idTreino)
    {
        //$treino = Treino::with('treinoAparelho', 'treinoAparelho.treinoAparelhoAcessorio', 'treinoAparelho.tipoTreino', 'treinoAparelho.aparelho', 'treinoAparelho.treinoAparelhoAcessorio.acessorio')->where([['BOOL_ATIVO', '=', true], ['INT_ID', '=', $idTreino]])->get();

        $treino = Treino::where('BOOL_ATIVO', '=', true)
            ->where('INT_ID', '=', $idTreino)
            ->with(['treinoAparelho' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoAcessorio' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.tipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoTipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoTipoTreino.tipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.aparelho' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoAcessorio.acessorio' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'paciente' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }])
            ->get();
        return (['treinoEmAndamento' => $treino]);
    }

    public function /*Treinos em Aberto*/  getTreinosAnteriores($idPaciente, $idEmpresa, $boolPacienteTodos)
    {
        if ($boolPacienteTodos == 1) {
            $treino = Treino::where('BOOL_ATIVO', '=', true)
                ->where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID_PACIENTE', '=', $idPaciente], ['INT_SAIU_COM_DOR', '!=', null]])->orderBy('DATE_INICIO', 'desc')
                ->with(['treinoAparelho' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoAcessorio' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.tipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoTipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoTipoTreino.tipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.aparelho' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoAcessorio.acessorio' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }])
                ->get();
        } else {
            $treino = Treino::where('BOOL_ATIVO', '=', true)
                ->where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_SAIU_COM_DOR', '=', null]])->orderBy('DATE_INICIO', 'desc')
                ->with(['treinoAparelho' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoAcessorio' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.tipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.aparelho' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoTipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoTipoTreino.tipoTreino' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'treinoAparelho.treinoAparelhoAcessorio.acessorio' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }, 'paciente' => function ($query) {
                    $query->where('BOOL_ATIVO', '=', true);
                }])
                ->get();
        }
        //return (['treinoEmAndamento' => $treino]);

        //$treino = Treino::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID_PACIENTE', '=', $idPaciente], ['INT_SAIU_COM_DOR', '!=', null]])->orderBy('DATE_INICIO')->get();

        return (['treinosAnteriores' => $treino]);
    }

    //-------------- Cadastra/Altera -------------------------
    public function cadastraInicio($id, Request $request, $cadAltera, $idEmpresa, $idUsuario, $idPaciente)
    {
        $aux = null;

        $aux = Treino::where([
            ['INT_ID_PACIENTE', '=', $idPaciente], ['DATE_INICIO', '=', $request->input('inicioTreino')],
            ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa]
        ])->first();

        if ($aux === null || $cadAltera == false) {
            if ($idPaciente == 0)
                return  ["msg" => "Favor, selecione um paciente!!!"];

            else if (strlen($request->inicioTreino) == 0)
                return  ["msg" => "Por favor informe a data inicial!!!"];
            else if (strlen($request->dorAoChegar) == 0)
                return  ["msg" => "Por favor informe o nível de dor ao chegar!!!"];
            else if (strlen($request->obsPaciente) > 500)
                return  ["msg" =>  "Máximo de 500 caracteres para o campo observação!!!"];
            else if (strlen($request->obsDorAoChegar) > 500)
                return  ["msg" =>  "Máximo de 500 caracteres para o campo observação!!!"];

            if ($cadAltera == true)
                $treino = new Treino;
            else
                $treino = Treino::findOrFail($id);

            $treino->INT_ID_PACIENTE = $idPaciente;
            $treino->INT_ID_EMPRESA = $idEmpresa;
            $treino->BOOL_ATIVO = true;
            $treino->TXT_OBS_PACIENTE = $request->obsPaciente;
            $treino->DATE_INICIO = $request->inicioTreino . ' 00:00:00';
            $treino->DATE_FINAL = $request->inicioTreino . ' 00:00:00';
            $treino->INT_CHEGOU_COM_DOR = $request->dorAoChegar;
            $treino->TXT_OBS_CHEGOU_COM_DOR = $request->obsDorAoChegar;
            if ($request->idAgendamento > 0)
                $treino->INT_ID_AGENDA = $request->idAgendamento;

            if ($cadAltera == true) {
                $treino->INT_ID_CADASTRO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $treino->DATE_CADASTRO = $agora;
                $treino->save();
                $auxid = Treino::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
                return (["msg" => "Cadastrado com SUCESSO!!!", "idCadastrado" => $auxid->INT_ID]);
            } else if ($cadAltera == false) {
                $treino->INT_ID_ALTERACAO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $treino->DATE_ALTERACAO = $agora;
                $treino->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Treino ja cadastrado!!!"];
        }
    }


    public function cadastraAparelho($id, Request $request, $cadAltera, $idUsuario, $idTreino)
    {
        $aux = TreinoAparelho::where([['INT_ID_APARELHO', '=', $request->aparelho], ['INT_ID_TREINO', '=', $idTreino], ['BOOL_ATIVO', '=', 1], ['INT_ID', '!=', $id]])->first();

        $arrayTT = explode(",", $request->txtidsTipoTreino);

        if ($aux  === null) {
            if ($request->aparelho == 0)
                return  ["msg" => "Por favor selecione o aparelho!!!"];
            else if (count($arrayTT) == 0)
                return  ["msg" => "Por favor selecione pelo menos um tipo de treino!!!"];

            if ($cadAltera == true)
                $aparelho = new TreinoAparelho();
            else
                $aparelho = TreinoAparelho::findOrFail($id);

            $aparelho->INT_ID_APARELHO = $request->aparelho;
            $aparelho->INT_ID_TREINO = $idTreino;
            $aparelho->BOOL_ATIVO = true;
            $aparelho->TXT_OBS = $request->obsAparelho;

            if ($cadAltera == true) {
                $aparelho->INT_ID_CADASTRO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $aparelho->DATE_CADASTRO = $agora;
                $aparelho->save();
                $auxid = TreinoAparelho::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
                $this->cadastraTreinoAparelhoTipoTreino($auxid->INT_ID, $arrayTT, true);
                return (["msg" => "Cadastrado com SUCESSO!!!", "idCadastrado" => $auxid->INT_ID]);
            } else if ($cadAltera == false) {
                $aparelho->INT_ID_ALTERACAO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $aparelho->DATE_ALTERACAO = $agora;
                $this->cadastraTreinoAparelhoTipoTreino($id, $arrayTT, false);
                $aparelho->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Aparelho ja cadastrado!!!"];
        }
    }
    function cadastraTreinoAparelhoTipoTreino($id, $listTipoTreino, $cadAltera)
    {
        if ($cadAltera) {
            foreach ($listTipoTreino as $tipoTreino) {
                $treino_aparelho_tipo_treino = new TreinoAparelhoTipoTreino();
                $treino_aparelho_tipo_treino->INT_ID_TREINO_APARELHO = $id;
                $treino_aparelho_tipo_treino->INT_ID_TIPO_TREINO = $tipoTreino;
                $treino_aparelho_tipo_treino->BOOL_ATIVO = true;
                $treino_aparelho_tipo_treino->save();
            }
        } else {
            $a = TreinoAparelhoTipoTreino::where('INT_ID_TREINO_APARELHO', $id)->get();

            foreach ($a as $registro) {
                $registro->BOOL_ATIVO = false;
                $registro->update();
            }

            foreach ($listTipoTreino as $tipoTreino) {
                $a = TreinoAparelhoTipoTreino::where([
                    ['INT_ID_TREINO_APARELHO', '=', $id],
                    ['INT_ID_TIPO_TREINO', '=', $tipoTreino]
                ])->get();

                if ($a->isEmpty()) {
                    $treino_aparelho_tipo_treino = new TreinoAparelhoTipoTreino();
                    $treino_aparelho_tipo_treino->INT_ID_TREINO_APARELHO = $id;
                    $treino_aparelho_tipo_treino->INT_ID_TIPO_TREINO = $tipoTreino;
                    $treino_aparelho_tipo_treino->BOOL_ATIVO = true;
                    $treino_aparelho_tipo_treino->save();
                } else {
                    $registro = $a->first();
                    $registro->BOOL_ATIVO = true;
                    $registro->update();
                }
            }
        }
    }


    public function cadastraAcessorio($id, Request $request, $cadAltera, $idTreinoAparelho, $idUsuario)
    {
        $aux = null;

        $aux = TreinoAparelhoAcessorio::where([
            ['INT_ID_TREINO_APARELHO', '=', $idTreinoAparelho], ['INT_ID_ACESSORIO', '=', $request->acessorio], ['BOOL_ATIVO', '=', 1]
        ])->first();

        if ($aux === null || $cadAltera == false) {
            if ($request->acessorio == 0)
                return  ["msg" => "Favor, selecione um paciente!!!"];

            if ($cadAltera == true)
                $acessorio = new TreinoAparelhoAcessorio;
            else
                $acessorio = TreinoAparelhoAcessorio::findOrFail($id);

            $acessorio->INT_ID_TREINO_APARELHO = $idTreinoAparelho;
            $acessorio->INT_ID_ACESSORIO = $request->acessorio;
            $acessorio->TXT_OBS = $request->obsCessorio;
            $acessorio->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $acessorio->INT_ID_CADASTRO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $acessorio->DATE_CADASTRO = $agora;
                $acessorio->save();
                return (["msg" => "Cadastrado com SUCESSO!!!"]);
            } else if ($cadAltera == false) {
                $acessorio->INT_ID_ALTERACAO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $acessorio->DATE_ALTERACAO = $agora;
                $acessorio->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Acessório ja adicionado!!!"];
        }
    }


    public function cadastraFinal($id, Request $request)
    {
        if (strlen($request->dorAoSair) == 0)
            return  ["msg" => "Por favor informe o nível de dor ao sair!!!"];

        $treino = Treino::findOrFail($id);
        $treino->INT_SAIU_COM_DOR = $request->dorAoSair;
        $treino->TXT_OBS_SAIU_COM_DOR = $request->obsDorAoSair;
        $treino->TXT_OBS = $request->obsGerais;

        $treino->update();
        return  ["msg" => "Finalizado com sucesso!!!"];
    }

    //-------------- Exclusão -------------------------
    public function excluirTreinoAparelhoAcessorio($id, $idUsuario, $boolMsg)
    {
        $av = TreinoAparelhoAcessorio::findOrFail($id);
        $av->BOOL_ATIVO = false;
        $av->INT_ID_EXCLUSAO = $idUsuario;
        $av->DATE_EXCLUSAO = date('Y-m-d H:i:s');

        $av->update();

        if ($boolMsg == true)
            return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function excluirTreinoAparelhoTipoTreino($id)
    {
        $av = TreinoAparelhoTipoTreino::findOrFail($id);
        $av->BOOL_ATIVO = false;

        $av->update();
    }

    public function excluirTreinoAparelho($id, $idUsuario, $boolMsg)
    {
        $av = TreinoAparelho::findOrFail($id);
        $av->BOOL_ATIVO = false;
        $av->INT_ID_EXCLUSAO = $idUsuario;
        $av->DATE_EXCLUSAO = date('Y-m-d H:i:s');

        $array = TreinoAparelhoAcessorio::where([['INT_ID_TREINO_APARELHO', '=', $id], ['BOOL_ATIVO', '=', 1]])->get();

        $array2 = TreinoAparelhoTipoTreino::where([['INT_ID_TREINO_APARELHO', '=', $id], ['BOOL_ATIVO', '=', 1]])->get();

        foreach ($array as &$valor) {
            $this->excluirTreinoAparelhoAcessorio($valor->INT_ID, $idUsuario, false);
        }

        foreach ($array2 as &$valor) {
            $this->excluirTreinoAparelhoTipoTreino($valor->INT_ID);
        }

        $av->update();

        if ($boolMsg == true)
            return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function excluirTreino($id, $idUsuario)
    {
        $av = Treino::findOrFail($id);
        $av->BOOL_ATIVO = false;
        $av->INT_ID_EXCLUSAO = $idUsuario;
        $av->DATE_EXCLUSAO = date('Y-m-d H:i:s');

        $array = TreinoAparelho::where([['INT_ID_TREINO', '=', $id], ['BOOL_ATIVO', '=', 1]])->get();

        foreach ($array as &$valor) {
            $this->excluirTreinoAparelho($valor->INT_ID, $idUsuario, false);
        }

        $av->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    /* ------------------------- CONSULTA RELATORIO DE TTREINOS -------------------------------------*/
    public static function getTreinosRelatorio($idEmpresa, $idUsuario)
    {
        //$treino = Treino::with('treinoAparelho', 'treinoAparelho.treinoAparelhoAcessorio', 'treinoAparelho.tipoTreino', 'treinoAparelho.aparelho', 'treinoAparelho.treinoAparelhoAcessorio.acessorio')->where([['BOOL_ATIVO', '=', true], ['INT_ID', '=', $idTreino]])->get();

        $treino = Treino::where('BOOL_ATIVO', '=', true)
            ->where('INT_ID_EMPRESA', '=', $idEmpresa)->orderBy('DATE_INICIO', 'desc')
            ->with(['treinoAparelho' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoAcessorio' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.tipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.aparelho' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoAcessorio.acessorio' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoTipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'treinoAparelho.treinoAparelhoTipoTreino.tipoTreino' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'paciente' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }, 'colaborador' => function ($query) {
                $query->where('BOOL_ATIVO', '=', true);
            }])
            ->get();

        $aux = Empresa::where([['INT_ID', '=', $idEmpresa]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['treino' => $treino, 'boolPilates' => $pilates, 'idUsuario' => $idUsuario]);
    }


    static public function preencheCamposRelatorio($idEmpresa, $idUsuario)
    {
        $colab = Colaborador::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_NOME')->get();

        $todosPacientes = ClienteFornecedor::where([['BOOL_ATIVO', '=', true], ['BOOL_PACIENTE', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_NOME')->get();

        return (['Colab' => $colab, 'pacientes' => $todosPacientes]);
    }
}
