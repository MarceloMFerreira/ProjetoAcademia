<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClienteFornecedor;
use App\Models\Contato;
use App\Models\Empresa;

class ClienteFornecedorController extends Controller
{
    // --------------------------------------------- Cliente Fornecedor ------------------------------------------
    static public function getTodosClientes($id)
    {
        $cliente = ClienteFornecedor::where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_NOME')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();

        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;


        return (['Cliente' => $cliente, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function cadastraAlteraClienteFornecedor($id, Request $request, $cadAltera, $idEmpresa)
    {
        if ($request->radio == 1)
            $aux = ClienteFornecedor::where([['TXT_CPF_CNPJ', '=', $request->input('txtCPF')], ['TXT_CPF_CNPJ', '!=', '00000000000'], ['BOOL_ATIVO', '=', 1]])->first();
        else
            $aux = ClienteFornecedor::where([['TXT_CPF_CNPJ', '=', $request->input('txtCNPJ')], ['BOOL_ATIVO', '=', 1]])->first();

        if ($aux === null || $cadAltera == false) {
            if (strlen($request->txtNome) > 100)
                return  ["msg" => "Para o campo Nome máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtNome) == 0)
                return  ["msg" => "Favor, informe o Nome do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtNomeFantasia) > 100)
                return  ["msg" => "Para o campo Nome Fantasia máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtNomeFantasia) == 0 && $request->radio != 1)
                return  ["msg" => "Favor, informe o Nome Fantasia do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtCPF) == 0 && $request->radio == 1)
                return  ["msg" => "Favor, informe o CPF!!!"];
            else if (strlen($request->txtCNPJ) == 0 && $request->radio != 1)
                return  ["msg" => "Favor, informe o CNPJ!!!"];
            else if (strlen($request->txtRua) > 100)
                return  ["msg" => "Para o campo Rua máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtRua) == 0)
                return  ["msg" => "Favor, informe a Rua do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtBairro) > 100)
                return  ["msg" => "Para o campo Bairro máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtBairro) == 0)
                return  ["msg" => "Favor, informe o Bairro do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtNumero) > 10)
                return  ["msg" => "Para o campo Número máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtNumero) == 0)
                return  ["msg" => "Favor, informe o Número do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtCidade) > 100)
                return  ["msg" => "Para o campo Cidade máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtCidade) == 0)
                return  ["msg" => "Favor, informe o Cidade do Cliente/Fornecedor!!!"];
            else if (strlen($request->txtCEP) > 100)
                return  ["msg" => "Para o campo CEP máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtCEP) == 0)
                return  ["msg" => "Favor, informe o CEP do Cliente/Fornecedor!!!"];
            else if($request->chcPaciente == true){
                if(strlen($request->txtQueixaPrincipal) > 1000)
                    return ["msg" => "Para o campo Quexia Principal máximo de 1000 caracteres permitidos!!!"];
                else if(strlen($request->txtQueixaPrincipal) == 0)
                    return ["msg" => "Favor, informe a Queixa Principal do paciente!!!"];
                else if(strlen($request->txtProfissao) > 200)
                    return ["msg" => "Para o campo Profissão máximo de 200 caracteres permitidos!!!"];
                else if(strlen($request->txtProfissao) == 0)
                    return ["msg" => "Favor, informe a Profissão do paciente!!!"];
                else if(strlen($request->dtNasc) == 0)
                    return ["msg" => "Favor, informe a data de nascimento do paciente!!!"];
            }

            if ($cadAltera == true)
                $cliente = new ClienteFornecedor();
            else
                $cliente = ClienteFornecedor::findOrFail($id);

            $cliente->INT_ID_EMPRESA = $idEmpresa;
            $cliente->TXT_NOME = $request->txtNome;

            if ($request->radio == 1) {
                $cliente->TXT_NOME_FANTASIA = "";
                $cliente->TXT_CPF_CNPJ = $request->txtCPF;
            } else {
                $cliente->TXT_CPF_CNPJ = $request->txtCNPJ;
                $cliente->TXT_NOME_FANTASIA = $request->txtNomeFantasia;
            }

            $cliente->BOOL_PF_PJ = $request->radio;
            $cliente->BOOL_PF_PJ = $request->radio;
            $cliente->BOOL_ATIVO = true;
            $cliente->TXT_RUA = $request->txtRua;
            $cliente->TXT_BAIRRO = $request->txtBairro;
            $cliente->TXT_CIDADE = $request->txtCidade;
            $cliente->TXT_NUMERO = $request->txtNumero;
            $cliente->TXT_UF = $request->estado;
            $cliente->TXT_CEP = $request->txtCEP;

            if($request->chcPaciente == true){
                $cliente->BOOL_PACIENTE = true;
                $cliente->TXT_QUEIXA = $request->txtQueixaPrincipal;
                $cliente->DATE_NASCIMENTO = $request->dtNasc;
                $cliente->TXT_PROFISSAO = $request->txtProfissao;
                $cliente->CHAR_SEXO = $request->sexo;
                $cliente->CHAR_DESTRO_CANHOTO = $request->destroCanhoto;
            }else{
                $cliente->BOOL_PACIENTE = false;
                $cliente->TXT_QUEIXA = null;
                $cliente->DATE_NASCIMENTO = null;
                $cliente->TXT_PROFISSAO = null;
                $cliente->CHAR_SEXO = null;
                $cliente->CHAR_DESTRO_CANHOTO = null;
            }

            if ($cadAltera == true) {
                $aux = ClienteFornecedor::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
                if (!$aux) {
                $aux->INT_ID=$aux->INT_ID+1;
                }else{
                    $aux->INT_ID=$aux->INT_ID+1;
                }
            
                if($request->hasFile('image') && $request->file('image')->isValid())
                {
                    $arrayNome=explode(".",$_FILES['image']['name']);
                    $qtdArray=count($arrayNome);
                    move_uploaded_file($_FILES['image']['tmp_name'],'uploads/img/'.$aux->INT_ID.'.'.$arrayNome[$qtdArray-1] );
                    $cliente->TXT_FOTO=$aux->INT_ID.'.'.$arrayNome[$qtdArray-1];
                }
                $cliente->save();
                $aux = ClienteFornecedor::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
                return  ["msg" => "Cadastrado com SUCESSO!!!", "idSalvo" => $aux->INT_ID];
            } else if ($cadAltera == false) {
                if($request->hasFile('image') && $request->file('image')->isValid())
                {
                    $arrayNome=explode(".",$_FILES['image']['name']);
                    $qtdArray=count($arrayNome);
                    move_uploaded_file($_FILES['image']['tmp_name'],'uploads/img/'.$cliente->INT_ID.'.'.$arrayNome[$qtdArray-1] );
                    $cliente->TXT_FOTO=$cliente->INT_ID.'.'.$arrayNome[$qtdArray-1];
                }
                $cliente->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "CPF ou CNPJ ja cadastrado no sistema!!!"];
        }
    }

    public function excluirCliente($id)
    {
        $col = ClienteFornecedor::findOrFail($id);
        $col->BOOL_ATIVO = false;
        $col->update();

        $con =  Contato::where([['BOOL_ATIVO', '=', true], ['INT_ID_CLIENTE_FORNECEDOR', '=', $id]])->orderBy('TXT_CONTATO')->get();
        foreach ($con as $x) {
            $x->BOOL_ATIVO = false;
            $x->update();
        }

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    // --------------------------------------------- Contato ------------------------------------------
    function getTodosContatos($id)
    {
        $contato = Contato::where([['BOOL_ATIVO', '=', true], ['INT_ID_CLIENTE_FORNECEDOR', '=', $id]])->orderBy('TXT_CONTATO')->get();
        return (['Contato' => $contato]);
    }

    public function cadastraAlteraContato($id, Request $request, $cadAltera, $idCliente)
    {
        $aux = Contato::where([['TXT_CONTATO', '=', $request->input('txtEmailTel')], ['INT_ID_CLIENTE_FORNECEDOR', '=', $idCliente], ['BOOL_ATIVO', '=', 1]])->first();

        if ($aux === null || $cadAltera == false) {
            if (strlen($request->txtEmailTel) > 100)
                return  ["msg" => "Para o campo EMAIL/TELEFONE máximo de 100 caracteres permitidos!!!"];
            else if (strlen($request->txtEmailTel) == 0)
                return  ["msg" => "Favor, informe a informação de contato!!!"];

            if ($cadAltera == true)
                $contato = new Contato();
            else
                $contato = Contato::findOrFail($id);

            $contato->TXT_CONTATO =  $request->txtEmailTel;
            $contato->BOOL_EMAIL_TELEFONE = $request->radioEmail;
            $contato->INT_ID_CLIENTE_FORNECEDOR = $idCliente;
            $contato->BOOL_ATIVO = true;

                if ($request->chcWPP == null)
                    $contato->BOOL_WPP = false;
                else
                    $contato->BOOL_WPP = true;

            if ($cadAltera == true) {
                $contato->save();
                return  ["msg" => "Cadastrado com SUCESSO!!!"];
            } else if ($cadAltera == false) {
                $contato->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Contato ja cadastrado no sistema!!!"];
        }
    }

    
    public function excluirContato($id)
    {
        $repert = Contato::findOrFail($id);
        $repert->BOOL_ATIVO = false;
        $repert->update();

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }
}
