<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcelas extends Model
{
    use HasFactory;

    protected $table='parcelas'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID_FORMA_PARC',
        'INT_DIAS',
        'BOOL_ATIVO',
    ];

     //Relacionamento
     public function formaParcelamento()
     {
             //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\FormaParcelamento', 'INT_ID_FORMA_PARC', 'INT_ID');
     }
}
