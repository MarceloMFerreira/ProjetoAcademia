<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    use HasFactory;

    protected $table='avaliacao'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'DECIMAL_ALTURA',
        'DECIMAL_PESO',
        'DATE_AVALIACAO',
        'INT_ID_CADASTRO',
        'DATE_CADASTRO',
        'INT_ID_ALTERCAO',
        'INT_ID_EXCLUSAO',
        'DATE_EXCLUSAO',
        'TXT_OUTRAS_QUEIXAS',
        'BOOL_ATIVO',
        'INT_ID_PACIENTE',
        'INT_ID_EMPRESA',
    ];

     //Relacionamento
     public function paciente()
     {
             //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\ClienteFornecedor', 'INT_ID_PACIENTE', 'INT_ID');
     }
}
