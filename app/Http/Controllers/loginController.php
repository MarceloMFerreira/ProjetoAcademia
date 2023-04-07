<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;




class loginController extends Controller
{
    public function form()
    {
        if (Auth::user())
            return redirect()->to('/home');
        else
            return redirect()->to('/login');
    }


    public function validaLogin(Request $request)
    {
        // $request->validate([
        //     'TXT_EMAIL' => 'required',
        //     'TXT_SENHA' => 'required',
        // ]);

        
        $usuario = User::where('TXT_EMAIL', $request->TXT_EMAIL)->where('TXT_SENHA', md5($request->TXT_SENHA))->where('BOOL_ATIVO', 1)->first();

        // dd($usuario);  
         $agora = date('Y-d-m H:i:s');
        // if($agora < $usuario->empresa->DATE_FIM_TESTE)
        //  dd($agora);

        if ($usuario != null and $usuario->empresa->BOOL_ATIVO == 1 and ($usuario->empresa->BOOL_TESTE == 0 or ($usuario->empresa->BOOL_TESTE == 1 and $agora < $usuario->empresa->DATE_FIM_TESTE)))
            Auth::loginUsingId($usuario->INT_ID);

        return $this->form();
    }
}
