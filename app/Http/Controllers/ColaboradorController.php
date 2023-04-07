<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colaborador;
use App\Models\Empresa;

class ColaboradorController extends Controller
{
    static public function getTodosColaboradores($id)
    {
        $colaborador = Colaborador::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_NOME')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['Colaborador' => $colaborador, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function cadastraAltera($id, Request $request, $cadAltera, $idEmpresa)
    {

        $aux = Colaborador::where([['TXT_EMAIL', '=', $request->input('txtEmail')],['TXT_NOME', '=', $request->input('txtNome')],['BOOL_ATIVO', '=', 1]])->first();

        if ($aux === null || $cadAltera == false) {
            if (strlen($request->txtNome) > 100)
                return  ["msg" => "Favor, para o campo Nome do Colaborador máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtNome) == 0)
                return  ["msg" => "Favor, informe o nome do colaborador!!!"];
            else if (strlen($request->txtEmail) > 100)
                return  ["msg" => "Favor, para o campo E-mail do Colaborador máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtEmail) == 0)
                return  ["msg" => "Favor, informe o e-mail do colaborador!!!"];
            else if (strlen($request->txtSenha) == 0)
                return  ["msg" => "Favor, informe uma senha!!!"];
            else if (strlen($request->txtConfirmaSenha) == 0)
                return  ["msg" => "Favor, confirme a senha!!!"];

            if ($cadAltera == true)
                $col = new Colaborador();
            else
                $col = Colaborador::findOrFail($id);

            $col->TXT_NOME = $request->txtNome;
            $col->TXT_EMAIL = $request->txtEmail;
            $col->TXT_SENHA = md5($request->txtConfirmaSenha);
            $col->INT_ID_EMPRESA = $idEmpresa;
            $col->BOOL_ATIVO = true;

            if ($cadAltera == true) {
                $col->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $col->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "E-mail ja cadastrado no sistema!!!"];
        }
    }

    public function excluir($id)
    {
        $col = Colaborador::findOrFail($id);
        $col->BOOL_ATIVO = false;
        $col->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
