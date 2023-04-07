<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreinoAparelhoAcessorio extends Model
{
    use HasFactory;

    protected $table = 'treino_aparelho_acessorio';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID',
        'INT_ID_TREINO_APARELHO',
        'INT_ID_ACESSORIO',
        'TXT_OBS',
        'INT_ID_CADASTRO',
        'DATE_CADASTRO',
        'INT_ID_ALTERACAO',
        'DATE_ALTERACAO',
        'INT_ID_EXCLUSAO',
        'DATE__EXCLUSAO',
        'BOOL_ATIVO',
    ];

    //Relacionamento
    public function treinoAparelho()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\TreinoAparelho', 'INT_ID_TREINO_APARELHO', 'INT_ID');
    }

    //Relacionamento
    public function acessorio()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Acessorio', 'INT_ID_ACESSORIO', 'INT_ID');
    }
}
