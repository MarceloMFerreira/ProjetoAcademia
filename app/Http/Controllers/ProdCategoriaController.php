<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoriaProduto;
use App\Models\Empresa;

class ProdCategoriaController extends Controller
{
    static public function getTodosprodcategoria($id)
    {
        $CategoriaProduto = CategoriaProduto::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['CategoriaProduto' => $CategoriaProduto, 'idEmpresa' => $id,'boolPilates' => $pilates]);
    }
    

    public function excluirProdCategoria($id)
    {
        $repert = CategoriaProduto::findOrFail($id);
        $repert->BOOL_ATIVO = false;
        $repert->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $auxcat = CategoriaProduto::where([['TXT_DESCRICAO', '=', $request->input('txtDescricaoProdCategoria')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($auxcat === null) {
            if (strlen($request->txtDescricaoProdCategoria) > 100)
                return  ["msg" => "Favor, para o campo descrição da categoria máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoProdCategoria) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição da categoria!!!"];

            if ($cadAltera == true)
                $cat = new CategoriaProduto;
            else
                $cat = CategoriaProduto::findOrFail($id);

            $cat->TXT_DESCRICAO = $request->txtDescricaoProdCategoria;
            $cat->INT_ID_EMPRESA = $idEmpresa;
            $cat->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $cat->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $cat->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
                
            }

        } else {
            return  ["msg" => "Categoria ja cadastrada!!!"];
        }
    }

    // public function cadastrarProdCategoria(Request $request)
    // {
    //     $auxcat = CategoriaProduto::where([['TXT_DESCRICAO', '=', $request->input('txtDescricaoProdCategoria')], ['BOOL_ATIVO', '=', 1]])->first();
    //     if ($auxcat === null) {

    //         if (strlen($request->txtDescricaoProdCategoria) > 100)
    //             return  ["msg" => "Favor, para o campo descrição da Categoria máximo de 100 caracteres permitidos!!!"];
    //         else if (strlen($request->txtDescricaoProdCategoria) == 0)
    //             return  ["msg" => "Campo Descrição vazio, por favor insira a descrição da Categoria!!!"];
    //         else {

    //             $cat = new CategoriaProduto;

    //             $cat->TXT_DESCRICAO = $request->txtDescricaoProdCategoria;
    //             $cat->INT_ID_EMPRESA = 1;
    //             $cat->BOOL_ATIVO = true;

    //             $cat->save();
    //             return  ["msg" => "Cadastrado com SUCESSO!!!"];
    //         }
    //     } else {

    //         return  ["msg" => "Categoria ja cadastrada!!!"];
    //     }
    // }
}
