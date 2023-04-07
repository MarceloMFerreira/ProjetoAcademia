<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treino extends Model
{
    use HasFactory;

    protected $table = 'treino';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID',
        'INT_ID_EMPRESA',
        'DATE_INICIO',
        'DATE_FINAL',
        'INT_ID_PACIENTE',
        'INT_ID_AGENDA',
        'INT_CHEGOU_COM_DOR',
        'INT_SAIU_COM_DOR',
        'TXT_OBS_CHEGOU_COM_DOR',
        'TXT_OBS_SAIU_COM_DOR',
        'TXT_OBS',
        'TXT_OBS_PACIENTE',
        'INT_ID_CADASTRO',
        'DATE_CADASTRO',
        'INT_ID_ALTERACAO',
        'DATE_ALTERACAO',
        'INT_ID_EXCLUSAO',
        'DATE_EXCLUSAO',
        'BOOL_ATIVO',

    ];

    //Relacionamento
    public function paciente()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\ClienteFornecedor', 'INT_ID_PACIENTE', 'INT_ID');
    }

    
    //Relacionamento
    public function colaborador()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Colaborador', 'INT_ID_CADASTRO', 'INT_ID');
    }
    

    //Relacionamento
    public function agenda()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Agenda', 'INT_ID_AGENDA', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function treinoAparelho()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\TreinoAparelho', 'INT_ID_TREINO', 'INT_ID');
    }
}
