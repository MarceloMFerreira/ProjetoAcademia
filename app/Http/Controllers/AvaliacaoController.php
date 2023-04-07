<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Avaliacao;
use App\Models\ClienteFornecedor;
use App\Models\Empresa;

class AvaliacaoController extends Controller
{
    static public function getTodasAvaliacoes($id, $idUsuario)
    {
        $avaliacoes = Avaliacao::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('DATE_AVALIACAO', 'desc')->get();

        $todosPacientes = ClienteFornecedor::where([['BOOL_ATIVO', '=', true], ['BOOL_PACIENTE', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_NOME')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Avaliacoes' => $avaliacoes, 'idEmpresa' => $id, 'boolPilates' => $pilates, 'pacientes' => $todosPacientes, 'idUsuario' => $idUsuario]);
    }


    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa, $idPaciente, $idUsuario)
    {
        if (strlen($request->txtPeso) == 0)
            return  ["msg" => "Campo Peso vazio, por favor insira o peso!!!"];
        else if (strlen($request->txtAltura) == 0)
            return  ["msg" => "Campo Altura vazio, por favor insira a altura!!!"];
        else if (strlen($request->dtNasc) == 0)
            return ["msg" => "Favor, informe a data da avaliação!!!"];
        else if (strlen($request->txtQueixa) > 2000)
            return  ["msg" => "Para o campo de queixas máximo de 2000 caracteres permitidos!!!"];

        if ($cadAltera == true)
            $av = new Avaliacao();
        else
            $av = Avaliacao::findOrFail($id);

        $av->DECIMAL_ALTURA = $request->txtAltura;
        $av->DECIMAL_PESO = $request->txtPeso;
        $av->DATE_AVALIACAO = $request->dtNasc;
        $av->TXT_OUTRAS_QUEIXAS = $request->txtQueixa;
        $av->INT_ID_PACIENTE = $idPaciente;
        $av->INT_ID_EMPRESA = $idEmpresa;
        $av->BOOL_ATIVO = true;

        if ($cadAltera == true) {
            $av->INT_ID_CADASTRO = $idUsuario;
            $agora = date('Y-m-d H:i:s');
            $av->DATE_CADASTRO = $agora;
            $av->save();
            return  ["msg" => "Cadastrado com SUCESSO!!!"];
        } else if ($cadAltera == false) {
            $av->INT_ID_ALTERCAO = $idUsuario;
            $agora = date('Y-m-d H:i:s');
            $av->DATE_ALTERCAO = $agora;
            $av->update();
            return  ["msg" => "Alterado com SUCESSO!!!"];
        }
    }

    public function excluir($id, $idUsuario)
    {
        $av = Avaliacao::findOrFail($id);
        $av->BOOL_ATIVO = false;
        $av->INT_ID_EXCLUSAO = $idUsuario;
        $av->DATE_EXCLUSAO = date('Y-m-d H:i:s');

        $av->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
