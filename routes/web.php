<?php

use App\Http\Controllers\AcessorioController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\AparelhoController;
use App\Http\Controllers\AvaliacaoController;
use App\Http\Controllers\CentroCustoController;
use App\Http\Controllers\ClienteFornecedorController;
use App\Http\Controllers\FormaPagamentoController;
use App\Http\Controllers\FormaParcelamentoController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ProdCategoriaController;
use App\Http\Controllers\ColaboradorController;
use App\Http\Controllers\TipoTreinoController;
use App\Http\Controllers\TreinoController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//--------------- ROTAS DO LOGIN ------------------------------
Route::get('/', function () {
    if (Auth::user())
        return view('welcome');
    else
        return view('login');
})->name('login');

Route::post('/getlogin', [loginController::class, 'validaLogin']);

Route::get('/login', function () {
    return view('loginerro');
});

//--------------- PROTEÇÃO DAS ROTAS ------------------------------
Route::group(['middleware' => ['auth']], function () {

    //--------------- ROTAS VIEWS ------------------------------

    Route::get('/home', function () {
        return view('welcome');
    });

    Route::get('/colaborador', function () {
        return view('cadastroColaborador');
    });

    Route::get('/clientefornecedor', function () {
        return view('cadastroClienteFornecedor');
    });

    Route::get('/aparelhos', function () {
        return view('cadastroAparelhos');
    });

    Route::get('/acessorios', function () {
        return view('cadastroAcessorio');
    });

    Route::get('/tipotreino', function () {
        return view('cadastroTipoTreino');
    });

    Route::get('/avaliacao', function () {
        return view('cadastroAvaliacao');
    });

    Route::get('/agendacadastro', function () {
        return view('cadastroAgenda');
    });

    Route::get('/treino', function () {
        return view('cadastroTreino');
    });

    Route::get('/relatoriotreinos', function () {
        return view('relatorioTreinos');
    });

    Route::get('/registrartreinos', function () {
        return view('iniciaTreino');
    });



    //--------------- ROTAS LOGOUT ------------------------------
    Route::get('/logout', function () {
        Auth::logout();
        return redirect()->to('/');
    });

    // ---------------- ROTAS COLABORADOR --------------------
    Route::get('/getcolaboradores', function () {
        return (ColaboradorController::getTodosColaboradores(Auth::user()->INT_ID_EMPRESA));
    });
    Route::post('/setcolaborador/{id}/{cadAltera}/{idEMpresa}', [ColaboradorController::class, 'cadastraAltera']);
    Route::get('/delcolaborador/{id}', [ColaboradorController::class, 'excluir']);

    // ---------------- ROTAS CLIENTE/FORNECEDOR/CONTATO --------------------
    Route::get('/getclientes', function () {
        return (ClienteFornecedorController::getTodosClientes(Auth::user()->INT_ID_EMPRESA));
    });
    Route::get('/getcontatos/{id}', [ClienteFornecedorController::class, 'getTodosContatos']);
    Route::post('/setclientefornecedor/{id}/{cadAltera}/{idEMpresa}', [ClienteFornecedorController::class, 'cadastraAlteraClienteFornecedor']);
    Route::get('/delclientefornecedor/{id}', [ClienteFornecedorController::class, 'excluirCliente']);
    Route::post('/setcontato/{id}/{cadAltera}/{idCliente}', [ClienteFornecedorController::class, 'cadastraAlteraContato']);
    Route::get('/delcontato/{id}', [ClienteFornecedorController::class, 'excluirContato']);

    // ---------------- ROTAS APARELHO  --------------------
    Route::get('/getaparelho', function () {
        return (AparelhoController::getTodosAparelhos(Auth::user()->INT_ID_EMPRESA));
    });
    Route::post('/setaparelho/{id}/{cadAltera}/{idEMpresa}', [AparelhoController::class, 'cadastraAltera']);
    Route::get('/delaparelho/{id}', [AparelhoController::class, 'excluir']);

    // ---------------- ROTAS ACESSORIO  --------------------
    Route::get('/getacessorio', function () {
        return (AcessorioController::getTodosAcessorios(Auth::user()->INT_ID_EMPRESA));
    });
    Route::post('/setacessorio/{id}/{cadAltera}/{idEMpresa}', [AcessorioController::class, 'cadastraAltera']);
    Route::get('/delacessorio/{id}', [AcessorioController::class, 'excluir']);

    // ---------------- ROTAS TIPO DE TREINO  --------------------
    Route::get('/gettipotreino', function () {
        return (TipoTreinoController::getTodosTipoTreino(Auth::user()->INT_ID_EMPRESA));
    });
    Route::post('/settipotreino/{id}/{cadAltera}/{idEMpresa}', [TipoTreinoController::class, 'cadastraAltera']);
    Route::get('/deltipotreino/{id}', [TipoTreinoController::class, 'excluir']);

    // ---------------- ROTAS AVALIAÇÃO  --------------------
    Route::get('/getavaliacoes', function () {
        return (AvaliacaoController::getTodasAvaliacoes(Auth::user()->INT_ID_EMPRESA, Auth::user()->INT_ID));
    });
    Route::post('/setavaliacao/{id}/{cadAltera}/{idEMpresa}/{idPaciente}/{idUsuario}', [AvaliacaoController::class, 'cadastraAltera']);
    Route::get('/delavaliacao/{id}/{idUsuario}', [AvaliacaoController::class, 'excluir']);

    // ---------------- ROTAS AGENDA  --------------------
    Route::get('/getagenda', function () {
        return (AgendaController::getAgenda(Auth::user()->INT_ID_EMPRESA, Auth::user()->INT_ID));
    });
    Route::post('/setagenda/{id}/{cadAltera}/{idEMpresa}/{idPaciente}/{idUsuario}', [AgendaController::class, 'cadastraAltera']);
    Route::get('/delagenda/{id}/{idUsuario}', [AgendaController::class, 'excluir']);

    // ---------------- ROTAS TREINO  --------------------
    Route::get('/getreino', function () {
        return (TreinoController::preencheCampos(Auth::user()->INT_ID_EMPRESA, Auth::user()->INT_ID));
    });
    Route::get('/iniciartreinosemagendamento/{valor}/{idAgendamento}/{idInicio}/{idFinal}', [TreinoController::class, 'novaView']);
    Route::get('/getpacientesemagendamento/{id}', [TreinoController::class, 'configInicialSemAgendamento']);
    Route::post('/settreinoinicio/{id}/{cadAltera}/{idEMpresa}/{idUsuario}/{idPaciente}', [TreinoController::class, 'cadastraInicio']);
    Route::get('/gettreinoemandamento/{id}', [TreinoController::class, 'getTreinoEmAndamento']);
    Route::post('/settreinoaparelho/{id}/{cadAltera}/{idUsuario}/{idTreino}', [TreinoController::class, 'cadastraAparelho']);
    Route::post('/settreinoacessorio/{id}/{cadAltera}/{idTreinoAparelho}/{idUsuario}', [TreinoController::class, 'cadastraAcessorio']);
    Route::get('/deltreinoaparelhoacessorio/{id}/{idUsuario}/{boolMsg}', [TreinoController::class, 'excluirTreinoAparelhoAcessorio']);
    Route::get('/deltreinoaparelho/{id}/{idUsuario}/{boolMsg}', [TreinoController::class, 'excluirTreinoAparelho']);
    Route::post('/settreinofinal/{id}', [TreinoController::class, 'cadastraFinal']);
    Route::get('/gettreinosanteriores/{id}/{idEmpresa}/{pacienteTodos}', [TreinoController::class, 'getTreinosAnteriores']);
    Route::get('/deltreino/{id}/{idUsuario}', [TreinoController::class, 'excluirTreino']);

    Route::get('/gettreinorelatorio', function () {
        return (TreinoController::getTreinosRelatorio(Auth::user()->INT_ID_EMPRESA, Auth::user()->INT_ID));
    });

    Route::get('/preenchecamposrelatorio', function () {
        return (TreinoController::preencheCamposRelatorio(Auth::user()->INT_ID_EMPRESA, Auth::user()->INT_ID));
    });
    
});
