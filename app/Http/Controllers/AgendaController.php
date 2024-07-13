<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use App\Models\ClienteFornecedor;
use App\Models\Empresa;
use DateTime;

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

        $diasSemana = $request->input('diasSemana');

        $horaInicio = DateTime::createFromFormat('H:i', $request->inicioTreino);
        $horaFim = DateTime::createFromFormat('H:i', $request->finalTreino);
        

        foreach ($diasSemana as $dia) {
            for ($i = 0; $i < 1; $i++) {
                $agenda = new Agenda();
                $agenda->DATE_INICIO_AGENDOU = $this->getNextWeekdayDateTime($dia, $i, $horaInicio);
                $agenda->DATE_FIM_AGENDOU = $this->getNextWeekdayDateTime($dia, $i, $horaFim);
                $agenda->INT_ID_PACIENTE = $idPaciente;
                $agenda->INT_ID_EMPRESA = $idEmpresa;
                $agenda->BOOL_ATIVO = true;
                $agenda->INT_ID_CADASTRO = $idUsuario;
                $agora = date('Y-m-d H:i:s');
                $agenda->DATE_CADASTRO = $agora;
                $agenda->save();
            }
        }

        return ["msg" => "Agenda cadastrada para 30 semanas com sucesso!"];
    }

    private function getNextWeekdayDateTime($weekday, $weeksToAdd, $time)
    {
        $currentDate = new DateTime();
        $currentDate->setTime(0, 0, 0);
    
        $weekdayMap = [
            'domingo' => 0,
            'segunda' => 1,
            'terca' => 2,
            'quarta' => 3,
            'quinta' => 4,
            'sexta' => 5,
            'sabado' => 6
        ];
    
        $currentWeekday = $currentDate->format('w');
        $daysToAdd = $weekdayMap[$weekday] - $currentWeekday;
        if ($daysToAdd < 0) {
            $daysToAdd += 7;
        }
        $daysToAdd += $weeksToAdd * 7;
    
        $currentDate->modify("+" . $daysToAdd . " days");
        $currentDate->setTime(
            $time->format('H'),
            $time->format('i'),
            $time->format('s')
        );
    
        return $currentDate->format('Y-m-d H:i:s');
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
