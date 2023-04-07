<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aparelho extends Model
{
    use HasFactory;

    protected $table = 'aparelhos';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_DESCRICAO',
        'INT_ID_EMPRESA',
        'BOOL_ATIVO',
    ];

    //Relacionamento 1 para muitos
    public function treinoAparelho()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\TreinoAparelho', 'INT_ID_APARELHO', 'INT_ID');
    }
}
