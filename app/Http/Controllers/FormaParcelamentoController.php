<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Models\FormaParcelamento;
use App\Models\Parcelas;

class FormaParcelamentoController extends Controller
{

    static public function getTodasFormasParcelamento($id)
    {
        // $FormaParcelamento = FormaParcelamento::whereHas('parcelas', function ($query) {
        //     return $query->where('BOOL_ATIVO', '=', true)->orderBy('TXT_DESCRICAO');
        // })->get();
        //$FormaParcelamento = FormaParcelamento::where('BOOL_ATIVO', '=', true)->orderBy('TXT_DESCRICAO')->get();
        $FormaParcelamento = FormaParcelamento::with('parcelas')->where([['BOOL_ATIVO', '=', true], ['INT_ID_EMPRESA', '=', $id]])->orderBy('TXT_DESCRICAO')->get();

        $aux = Empresa::where([['INT_ID', '=', $id]])->first();
        if($aux->BOOL_PILATES == true)
            $pilates = 1;
        else
            $pilates = 0;

        return (['FormaParcelamento' => $FormaParcelamento, 'idEmpresa' => $id, 'boolPilates' => $pilates]);
    }

    public function excluirFP($id, Request $request)
    {
        $cc = FormaParcelamento::findOrFail($id);
        $array = Parcelas::where('INT_ID_FORMA_PARC', '=', $id)->get();
        $cc->BOOL_ATIVO = false;
        //PAREI AQUI TENTANDO EXLUIR ESSE NEGOCIO
        $cc->update();

        $this->salvaParcelas($array, true);

        return  ["msg" => "Excluído com SUCESSO!!!"];
    }

    public function cadastraAlteraFP($id, Request $request, $cadAltera, $qtdParcelas, $idEmpresa)
    {
        $auxcc = FormaParcelamento::where([['TXT_DESCRICAO', '=', $request->input('txtDescricaoFormaParcelamento')], ['BOOL_ATIVO', '=', 1], ['INT_ID_EMPRESA', '=', $idEmpresa]])->first();
        // $aux=FormaParcelamento::where('INT_ID','>',0)->orderBy('INT_ID', 'desc')->first();
        // $aux->INT_ID=$aux->INT_ID+1;
        //$data = json_decode($jsonString);
        // $test = utf8_encode($_POST['test']); // Don't forget the encoding
        // $data = json_decode($test);

        $parcelasArray = explode(",", $request->txtSalvaLista);

        if ($auxcc === null) {
            if (strlen($request->txtDescricaoFormaParcelamento) > 100)
                return  ["msg" => "Favor, para o campo descrição da Forma de Parcelamento máximo de 100 caracteres permitidos!!!"];

            else if (strlen($request->txtDescricaoFormaParcelamento) == 0)
                return  ["msg" => "Campo Descrição vazio, por favor insira a descrição da Forma de Parcelamento!!!"];

            else if (strlen($request->txtNumParcelas) == 0 && $cadAltera == true)
                return  ["msg" => "Por Favor, Informe o número de parcelas!!!"];

            if ($cadAltera == true)
                $fp = new FormaParcelamento;
            else
                $fp = FormaParcelamento::findOrFail($id);

            $fp->TXT_DESCRICAO = $request->txtDescricaoFormaParcelamento;
            $fp->INT_NUM_PARCELA = $qtdParcelas;
            $fp->INT_ID_EMPRESA = $idEmpresa;
            $fp->BOOL_ATIVO = true;


            if ($cadAltera == true) {
                $fp->save();
                $this->salvaParcelas($parcelasArray, false);
                $aux = FormaParcelamento::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
                return  ["msg" => "Cadastrado com SUCESSO!!!", "idFP" => $aux->INT_ID];
            } else if ($cadAltera == false) {
                $fp->update();
                return  ["msg" => "Alterado com SUCESSO!!!"];
            }
        } else {
            return  ["msg" => "Forma de pagamento ja cadastrada!!!"];
        }
    }

    function alteraParcelas($id, Request $request, $cadAltera)
    {
        $aux2 = FormaParcelamento::where([['INT_ID', '=', $id], ['BOOL_ATIVO', '=', 1]])->first();
        $parcelasArray = explode(",", $request->txtSalvaLista);
        $idsArray = explode(",", $request->txtSalvaListaIds);


        for ($i = 0; $i < $aux2->INT_NUM_PARCELA; $i++) {

            $aux = Parcelas::where([['INT_ID_FORMA_PARC', '=', $id], ['BOOL_ATIVO', '=', 1], ['INT_DIAS', '=', 0]])->first();


            if ($cadAltera == "true") {
                $parcelas = Parcelas::FindOrFail($aux->INT_ID);
            } else {
                $parcelas = Parcelas::FindOrFail($idsArray[$i]);
            }

            $parcelas->BOOL_ATIVO = true;
            //$parcelas->INT_ID_FORMA_PARC = $aux->INT_ID+1;
            $parcelas->INT_ID_FORMA_PARC = $parcelas->INT_ID_FORMA_PARC;
            $parcelas->INT_DIAS = $parcelasArray[$i];
            $parcelas->update();

            $aux = 0;
        }

        return  ["msg" => "Confirmado com sucesso!"];
    }


    function salvaParcelas($array = array(), $excluir)
    {
        if ($excluir == false) {
            $aux = FormaParcelamento::where('INT_ID', '>', 0)->orderBy('INT_ID', 'desc')->first();
            for ($i = 0; $i < $aux->INT_NUM_PARCELA; $i++) {
                $parcelas = new Parcelas;
                $parcelas->BOOL_ATIVO = true;
                //$parcelas->INT_ID_FORMA_PARC = $aux->INT_ID+1;
                $parcelas->INT_ID_FORMA_PARC = $aux->INT_ID;
                $parcelas->INT_DIAS = $array[$i];
                $parcelas->save();
            }
        } else {
            for ($i = 0; $i < count($array); $i++) {
                $parcelas = Parcelas::FindOrFail($array[$i]->INT_ID);
                $parcelas->BOOL_ATIVO = false;
                $parcelas->update();
            }
        }
    }
}
