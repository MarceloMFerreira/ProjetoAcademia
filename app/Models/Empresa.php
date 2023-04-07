<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresa';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_RAZAO_SOCIAL',
        'TXT_NOME_FANTASIA',
        'BOOL_TESTE',
        'DATE_FIM_TESTE',
        'BOOL_ATIVO',
        'TXT_TELEFONE',
        'TXT_EMAIL',
        'TXT_REPRESENTANTE',
        'BOOL_PILATES',
    ];

    //Relacionamento 1 para muitos
    public function colaborador()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Colaborador', 'INT_ID_EMPRESA', 'INT_ID');
    }
}
