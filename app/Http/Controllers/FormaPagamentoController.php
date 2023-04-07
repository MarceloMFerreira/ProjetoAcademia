<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Models\FormaPagamento;

class FormaPagamentoController extends Controller
{
    static public function getTodasFormaPagamento($id)
    {
        $FormaPagamento = FormaPagamento::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESC')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['FormaPagamento' => $FormaPagamento, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }
    

    public function excluir($id)
    {
        $cc = FormaPagamento::findOrFail($id);
        $cc->BOOL_ATIVO = false;
        $cc->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {
        $auxcc = FormaPagamento::where([['TXT_DESC', '=', $request->input('txtDescricaoFormaPagamento')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa], ['INT_ID', '!=', $id]])->first();

        if ($auxcc === null) {
            if (strlen($request->txtDescricaoFormaPagamento) > 100)
                return  ["msg" => "Favor, para o campo descrição da Forma de Pagamento máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoFormaPagamento) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição da Forma de Pagamento!!!"];

            if ($cadAltera == true)
                $fp = new FormaPagamento;
            else
                $fp = FormaPagamento::findOrFail($id);


            $fp->TXT_DESC = $request->txtDescricaoFormaPagamento;
            $fp->INT_ID_EMPRESA = $idEmpresa;
            $fp->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $fp->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $fp->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
                
            }

        } else {
            return  ["msg" => "Forma de pagamento ja cadastrada!!!"];
        }
    }
}
