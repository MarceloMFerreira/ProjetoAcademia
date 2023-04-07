<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Models\Marca;

class MarcaController extends Controller
{
    static public function getTodasMarcas($id)
    {
        $Marca = Marca::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Marca' => $Marca, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }
    //

    public function excluirMarca($id)
    {
        $repert = Marca::findOrFail($id);
        $repert->BOOL_ATIVO = false;
        $repert->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $auxMarca = Marca::where([['TXT_DESCRICAO', '=', $request->input('txtDescricaoMarca')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($auxMarca === null) {
            if (strlen($request->txtDescricaoMarca) > 100)
                return  ["msg" => "Favor, para o campo descrição da categoria máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoMarca) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição da categoria!!!"];

            if ($cadAltera == true)
                $marca = new Marca;
            else
                $marca = Marca::findOrFail($id);

            $marca->TXT_DESCRICAO = $request->txtDescricaoMarca;
            $marca->INT_ID_EMPRESA = $idEmpresa;
            $marca->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $marca->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $marca->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Categoria ja cadastrada!!!"];
        }
    }
}
