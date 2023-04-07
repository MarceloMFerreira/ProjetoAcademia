<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aparelho;
use App\Models\Empresa;

class AparelhoController extends Controller
{
    static public function getTodosAparelhos($id)
    {
        $Aparelho = Aparelho::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Aparelho' => $Aparelho, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $aux = Aparelho::where([['TXT_DESCRICAO', '=', $request->input('txtDescricaoAparelho')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($aux === null) {
            if (strlen($request->txtDescricaoAparelho) > 100)
                return  ["msg" => "Favor, para o campo descrição máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoAparelho) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição!!!"];

            if ($cadAltera == true)
                $aparelho = new Aparelho;
            else
                $aparelho = Aparelho::findOrFail($id);

            $aparelho->TXT_DESCRICAO = $request->txtDescricaoAparelho;
            $aparelho->INT_ID_EMPRESA = $idEmpresa;
            $aparelho->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $aparelho->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $aparelho->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Aparelho ja cadastrado!!!"];
        }
    }

    public function excluir($id)
    {
        $aparelho = Aparelho::findOrFail($id);
        $aparelho->BOOL_ATIVO = false;
        $aparelho->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
