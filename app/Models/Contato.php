<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contato extends Model
{
    use HasFactory;

    protected $table='contato'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_CONTATO',
        'BOOL_EMAIL_TELEFONE',
        'INT_ID_CLIENTE_FORNECEDOR',
        'BOOL_WPP',
        'BOOL_ATIVO',
    ];

     
     //Relacionamento
     public function clienteFornecedor()
     {
             //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\ClienteFornecedor', 'INT_ID_CLIENTE_FORNECEDOR', 'INT_ID');
     }
}
