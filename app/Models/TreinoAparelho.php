<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreinoAparelho extends Model
{
    use HasFactory;

    protected $table = 'treino_aparelho';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID',
        'INT_ID_APARELHO',
        'INT_ID_TREINO',
        'INT_ID_TIPO_TREINO',
        'BOOL_ATIVO',
        'DATE_CADASTRO',
        'INT_ID_CADASTRO',
        'DATE_ALTERACAO',
        'INT_ID_ALTERACAO',
        'DATE_EXCLUSAO',
        'INT_ID_EXCLUSAO',
        'TXT_OBS',
    ];

    //Relacionamento
    public function aparelho()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Aparelho', 'INT_ID_APARELHO', 'INT_ID');
    }

    //Relacionamento
    public function treino()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Treino', 'INT_ID_TREINO', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function treinoAparelhoAcessorio()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\TreinoAparelhoAcessorio', 'INT_ID_TREINO_APARELHO', 'INT_ID');
    }

     //Relacionamento 1 para muitos
     public function treinoAparelhoTipoTreino()
     {
         //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
         return $this->hasMany('App\Models\TreinoAparelhoTipoTreino', 'INT_ID_TREINO_APARELHO', 'INT_ID');
     }

     public function tipoTreino()
     {
         return $this->belongsTo(TipoTreino::class, 'INT_ID_TIPO_TREINO');
     }
}
