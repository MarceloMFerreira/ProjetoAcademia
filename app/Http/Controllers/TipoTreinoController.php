<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoTreino;
use App\Models\Empresa;

class TipoTreinoController extends Controller
{
    static public function getTodosTipoTreino($id)
    {
        $tipoTreino = TipoTreino::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['TipoTreino' => $tipoTreino, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $aux = TipoTreino::where([['TXT_DESCRICAO', '=', $request->input('txtDescricao')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($aux === null) {
            if (strlen($request->txtDescricao) > 100)
                return  ["msg" => "Favor, para o campo descrição máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricao) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição!!!"];

            if ($cadAltera == true)
                $tipoTreino = new TipoTreino;
            else
                $tipoTreino = TipoTreino::findOrFail($id);

            $tipoTreino->TXT_DESCRICAO = $request->txtDescricao;
            $tipoTreino->INT_ID_EMPRESA = $idEmpresa;
            $tipoTreino->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $tipoTreino->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $tipoTreino->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Tipo de treino ja cadastrado!!!"];
        }
    }

    public function excluir($id)
    {
        $tipoTreino = TipoTreino::findOrFail($id);
        $tipoTreino->BOOL_ATIVO = false;
        $tipoTreino->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
