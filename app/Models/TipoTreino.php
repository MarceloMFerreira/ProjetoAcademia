<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTreino extends Model
{
    use HasFactory;

    protected $table = 'tipo_de_treino';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_DESCRICAO',
        'INT_ID_EMPRESA',
        'BOOL_ATIVO',
    ];

      //Relacionamento 1 para muitos
      public function treinoAparelhoTipoTreino()
      {
          //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
          return $this->hasMany('App\Models\TreinoAparelhoTipoTreino', 'INT_ID_TIPO_TREINO', 'INT_ID');
      }
}
