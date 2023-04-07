<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acessorio;
use App\Models\Empresa;

class AcessorioController extends Controller
{
    static public function getTodosAcessorios($id)
    {
        $Acessorio = Acessorio::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if ($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Acessorio' => $Acessorio, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $aux = Acessorio::where([['TXT_DESCRICAO', '=', $request->input('txtDescricao')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($aux === null) {
            if (strlen($request->txtDescricao) > 100)
                return  ["msg" => "Favor, para o campo descrição máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricao) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição!!!"];

            if ($cadAltera == true)
                $acessorio = new Acessorio;
            else
                $acessorio = Acessorio::findOrFail($id);

            $acessorio->TXT_DESCRICAO = $request->txtDescricao;
            $acessorio->INT_ID_EMPRESA = $idEmpresa;
            $acessorio->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $acessorio->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $acessorio->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Acessorio ja cadastrado!!!"];
        }
    }

    public function excluir($id)
    {
        $acessorio = Acessorio::findOrFail($id);
        $acessorio->BOOL_ATIVO = false;
        $acessorio->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
