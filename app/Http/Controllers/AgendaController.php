<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use App\Models\ClienteFornecedor;
use App\Models\Empresa;

class AgendaController extends Controller
{
    static public function getAgenda($idEmpresa, $idUsuario)
    {
        $agenda = Agenda::with(['paciente' => function ($query) {
            $query->where('BOOL_ATIVO', true);
        }, 'treino' => function ($query) {
            $query->where('BOOL_ATIVO', true);
        }])->where([
            ['BOOL_ATIVO', '=', true],
            ['INT_ID_EMPRESA', '=', $idEmpresa]
        ])->orderBy('DATE_INICIO_AGENDOU')->get();


        $todosPacientes = ClienteFornecedor::where([['BOOL_ATIVO', '=', true], ['BOOL_PACIENTE', '=', true], ['INT_ID_EMPRESA', '=', $idEmpresa]])->orderBy('TXT_NOME')->get();

        $aux = Empresa::where([['INT_ID', '=', $idEmpresa]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Agenda' => $agenda, 'idEmpresa' => $idEmpresa, 'boolPilates' => $pilates, 'pacientes' => $todosPacientes, 'idUsuario' => $idUsuario]);
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa, $idPaciente, $idUsuario)
    {
        if (strlen($request->inicioTreino) == 0)
            return ["msg" => "Favor, informe a data de inicio!!!"];
        else if (strlen($request->finalTreino) == 0)
            return ["msg" => "Favor, informe a data final!!!"];

        if ($cadAltera == true)
            $agenda = new Agenda();
        else
            $agenda = Agenda::findOrFail($id);

        $agenda->DATE_INICIO_AGENDOU = $request->inicioTreino;
        $agenda->DATE_FIM_AGENDOU = $request->finalTreino;
        $agenda->INT_ID_PACIENTE = $idPaciente;
        $agenda->INT_ID_EMPRESA = $idEmpresa;
        $agenda->BOOL_ATIVO = true;

        if ($cadAltera == true) {
            $agenda->INT_ID_CADASTRO = $idUsuario;
            $agora = date('Y-m-d H:i:s');
            $agenda->DATE_CADASTRO = $agora;
            $agenda->save();
            return  ["msg" => "Cadastrado com SUCESSO!!!"];
        } else if ($cadAltera == false) {
            $agenda->INT_ID_ALTERACAO = $idUsuario;
            $agora = date('Y-m-d H:i:s');
            $agenda->DATE_ALTERACAO = $agora;
            $agenda->update();
            return  ["msg" => "Alterado com SUCESSO!!!"];
        }
    }

    public function excluir($id, $idUsuario)
    {
        $av = Agenda::findOrFail($id);
        $av->BOOL_ATIVO = false;
        $av->INT_ID_EXCLUSAO = $idUsuario;
        $av->DATE_EXCLUSAO = date('Y-m-d H:i:s');

        $av->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
