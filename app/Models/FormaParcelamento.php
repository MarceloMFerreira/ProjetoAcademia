<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormaParcelamento extends Model
{
    use HasFactory;

    protected $table='forma_parcelamento'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_DESCRICAO',
        'INT_ID_EMPRESA',
        'INT_NUM_PARCELA',
        'BOOL_ATIVO',
    ];

     //Relacionamento 1 para muitos
     public function parcelas()
     {
         //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
         return $this->hasMany('App\Models\Parcelas', 'INT_ID_FORMA_PARC', 'INT_ID');
     }
}
