<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreinoAparelhoTipoTreino extends Model
{
    use HasFactory;

    protected $table = 'treino_aparelho_tipo_treino';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID_TIPO_TREINO',
        'INT_ID_TREINO_APARELHO',
        'BOOL_ATIVO',
    ];

     //Relacionamento
     public function tipoTreino()
     {
         //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
         return $this->belongsTo('App\Models\TipoTreino', 'INT_ID_TIPO_TREINO', 'INT_ID');
     }

     //Relacionamento
    public function treinoAparelho()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\TreinoAparelho', 'INT_ID_TREINO_APARELHO', 'INT_ID');
    }

}
