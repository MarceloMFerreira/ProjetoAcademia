<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CentroCusto;
use App\Models\Empresa;

class CentroCustoController extends Controller
{
    static public function getTodosCC($id)
    {
        $CentroCusto = CentroCusto::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESC')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['CentroCusto' => $CentroCusto, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }
    

    public function excluir($id)
    {
        $cc = CentroCusto::findOrFail($id);
        $cc->BOOL_ATIVO = false;
        $cc->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $auxcc = CentroCusto::where([['TXT_DESC', '=', $request->input('txtDescricaoCC')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($auxcc === null) {
            if (strlen($request->txtDescricaoCC) > 100)
                return  ["msg" => "Favor, para o campo descrição do Centro de Custos máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoCC) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição do Centro de Custos!!!"];

            if ($cadAltera == true)
                $cc = new CentroCusto;
            else
                $cc = CentroCusto::findOrFail($id);

            $cc->TXT_DESC = $request->txtDescricaoCC;
            $cc->INT_ID_EMPRESA = $idEmpresa;
            $cc->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $cc->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $cc->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
                
            }

        } else {
            return  ["msg" => "Centro de Custo ja cadastrado!!!"];
        }
    }
}
