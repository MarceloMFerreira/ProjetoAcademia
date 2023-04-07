<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    use HasFactory;

    protected $table='colaborador'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_NOME',
        'TXT_EMAIL',
        'TXT_SENHA',
        'BOOL_ATIVO',
        'INT_ID_EMPRESA',
    ];

     //Relacionamento
     public function empresa()
     {
             //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\Empresa', 'INT_ID_EMPRESA', 'INT_ID');
     }

     //Relacionamento 1 para muitos
    public function treino()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Treino', 'INT_ID_CADASTRO', 'INT_ID');
    }

   
}
